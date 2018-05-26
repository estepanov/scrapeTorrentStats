const scrapeDHT = require('./discoverySources/dht')
const scrapeTracker = require('./discoverySources/tracker')
const magnet = require('magnet-uri')

const validSourceInputValues = ['dht', 'tracker', 'both']

const discover = (magnetURI, configObj) => {
  if (!magnetURI || typeof magnetURI !== 'string') {
    throw Error('magnetURI (string) is required.')
  }
  if (!configObj || typeof configObj !== 'object') {
    throw Error('config (object) is required.')
  }
  if (!configObj.source || typeof configObj.source !== 'string') {
    throw Error('source key (string) is required { source: "dht" }.')
  }
  if (validSourceInputValues.indexOf(configObj.source) === -1) {
    throw Error(
      `The provided source key (string): ${
        configObj.source
      } is not a valid source type. Valid source types are: ${validSourceInputValues}'`
    )
  }
  const verboseEnabled = !!configObj.verbose
  const parsedURI = magnet(magnetURI)
  switch (configObj.source) {
    case 'both': {
      let dhtResult
      return scrapeDHT(parsedURI, configObj.waitTime, verboseEnabled)
        .then(result => {
          dhtResult = result
          return scrapeTracker(parsedURI, configObj.waitTime, verboseEnabled)
        })
        .then(tracker => {
          return {
            DHT: dhtResult,
            Tracker: tracker.scrape
          }
        })
      break
    }
    case 'dht': {
      return scrapeDHT(parsedURI, configObj.waitTime, verboseEnabled)
      break
    }
    case 'tracker': {
      return scrapeTracker(parsedURI, configObj.waitTime, verboseEnabled)
      break
    }
    default: {
      throw Error('Unknown source specified')
    }
  }
}

module.exports = discover
