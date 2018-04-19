const Tracker = require('bittorrent-tracker')

// const rand = () => 68236478291210283
const rand = () => Math.floor(Math.random() * 12333) + 123

const trackerScrape = (parsedURI, waitTime = 20000) => {
  const dataObj = {
    scrape: []
  }
  if (parsedURI.announce.length === 0) return Promise.resolve(dataObj)
  return new Promise((resolveScrape, rejectScrape) => {
    try {
      const opts = {
        infoHash: parsedURI.infoHash,
        announce: parsedURI.announce,
        peerId: new Buffer(rand().toString()), // hex string or Buffer
        port: 6881 // torrent client port
      }

      const client = new Tracker(opts)
      client.scrape()

      client.on('scrape', data => {
        console.log('==tracker==', data)
        dataObj.scrape.push(data)
      })

      setTimeout(
        dataObj => {
          // stop getting peers from the tracker, gracefully leave the swarm
          client.stop()
          // ungracefully leave the swarm (without sending final 'stop' message)
          // client.destroy()
          resolveScrape(dataObj)
        },
        waitTime,
        dataObj
      )
    } catch (err) {
      console.log('error scraping tracker')
      console.log(parsedURI)
      console.log(err)
      rejectScrape(err)
    }
  })
}

module.exports = trackerScrape
