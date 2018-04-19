const DHT = require('bittorrent-dht')

const generatePeerID = peer => `${peer.host}:${peer.port}`
const generateFromID = from => `${from.address}:${from.port}`

const logPeers = (peer, infoHash, from, peersObj) => {
  const newPeersObj = Object.assign({}, peersObj)
  const peerID = generatePeerID(peer)
  newPeersObj[peerID] = peer
  return newPeersObj
}

const logFroms = (peer, infoHash, from, fromObj) => {
  const newFormsObj = Object.assign({}, fromObj)
  const fromID = generateFromID(from)
  newFormsObj[fromID] = from
  return newFormsObj
}

const dhtScrape = (parsedURI, waitTime = 30000) => {
  return new Promise((resolveScrape, rejectScrape) => {
    const dht = new DHT()
    try {
      dht.listen(20000, function() {
        console.log('now listening for DHT peers.')
      })

      const dataObj = {
        peersObj: {},
        fromsObj: {}
      }

      dht.on('peer', (peer, infoHash, from) => {
        dataObj.peersObj = logPeers(peer, infoHash, from, dataObj.peersObj)
        dataObj.fromsObj = logFroms(peer, infoHash, from, dataObj.fromsObj)
      })

      // find peers for the given torrent info hash
      const lookupVar = dht.lookup(parsedURI.infoHash)

      setTimeout(
        dataObj => {
          dht.destroy(() => {
            console.log('complete. closed DHT peer connection.')
            resolveScrape(dataObj)
          })
        },
        waitTime,
        dataObj
      )
    } catch (err) {
      rejectScrape(err)
    }
  })
}

module.exports = dhtScrape
