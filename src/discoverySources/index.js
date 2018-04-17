const trackerScrape = require('./tracker')
const dhtScrape = require('./dht')
const magnet = require('magnet-uri')

const magentParser = magnetURI => magnet(magnetURI)

const getDHTData = (magnetURI, waitTime) => {
  if (!magnetURI || typeof magnetURI !== 'string')
    throw Error('magnetURI(string) is required.')
  const parsedURI = magentParser(magnetURI)
  return dhtScrape(parsedURI, waitTime)
}

const getTrackerData = magnetURI => {
  if (!magnetURI || typeof magnetURI !== 'string')
    throw Error('magnetURI(string) is required.')
  const parsedURI = magentParser(magnetURI)
  if (parsedURI.announce.length === 0) throw error('No trackers')
  return trackerScrape(parsedURI)
}

module.exports = { getDHTData, getTrackerData }
