const Tracker = require('bittorrent-tracker')

const rand = () => Math.floor(Math.random() * 12333) + 123

const trackerScrape = (parsedURI, waitTime = 20000, verbose = false) => {
  const dataObj = {
    scrape: []
  }
  if (parsedURI.announce.length === 0) return Promise.resolve(dataObj)
  if (verbose) console.log('... we have some trackers to scrape.')
  return new Promise((resolveScrape, rejectScrape) => {
    try {
      const opts = {
        infoHash: parsedURI.infoHash,
        announce: parsedURI.announce,
        peerId: new Buffer(rand().toString()), // hex string or Buffer
        port: 6881 // torrent client port
      }

      const client = new Tracker(opts)
      if (verbose) console.log('... requesting information from trackers')
      client.scrape()

      client.on('scrape', data => {
        if (verbose) console.log('... recieved data from tracker', data)
        dataObj.scrape.push(data)
      })

      setTimeout(
        dataObj => {
          // stop getting peers from the tracker, gracefully leave the swarm
          client.stop()
          if (verbose) {
            console.log(
              '... requesting information from trackers complete. Stoped torrent tracker client.'
            )
          }
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
