const scrapeDHT = require('./discoverySources/dht')
const scrapeTracker = require('./discoverySources/tracker')
const magnet = require('magnet-uri')

const discover = (magnetURI, configObj) => {
  if (!magnetURI || typeof magnetURI !== 'string')
    throw Error('magnetURI (string) is required.')
  if (!configObj || typeof configObj !== 'object')
    throw Error('config (object) is required.')
  if (!configObj.source || typeof configObj.source !== 'string')
    throw Error('source key (string) is required { source: "dht" }.')
  const parsedURI = magnet(magnetURI)
  switch (configObj.source) {
    case 'dht': {
      return scrapeDHT(parsedURI, configObj.waitTime)
      break
    }
    case 'tracker': {
      return scrapeTracker(parsedURI, configObj.waitTime)
      break
    }
    default: {
      throw Error('Unknown source specified')
    }
  }
}

module.exports = discover
