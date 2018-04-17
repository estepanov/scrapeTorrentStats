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
  // console.log('-->', from)
  const newFormsObj = Object.assign({}, fromObj)
  const fromID = generateFromID(from)
  newFormsObj[fromID] = from
  return newFormsObj
}

const dhtDiscovery = (parsedURI, waitTime = 30000) => {
  return new Promise((resolve, reject) => {
    const dht = new DHT()
    try {
      dht.listen(20000, function() {
        console.log('now listening')
      })

      let dataObj = {}
      dht.on('peer', (peer, infoHash, from) => {
        dataObj.peersObj = logPeers(peer, infoHash, from, dataObj.peersObj)
        dataObj.fromsObj = logFroms(peer, infoHash, from, dataObj.fromsObj)
      })

      // find peers for the given torrent info hash
      const lookupVar = dht.lookup(parsedURI.infoHash)

      setTimeout(
        dataObj => {
          dht.destroy(() => {
            resolve(dataObj)
          })
        },
        waitTime,
        dataObj
      )
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = dhtDiscovery
