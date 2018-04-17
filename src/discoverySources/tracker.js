var Tracker = require('bittorrent-tracker')
var magnet = require('magnet-uri')

var magnetURI = 'magnet:?xt=urn:btih:DD4D419973F730EFC3BBD117ACE3F28D6CCF1866'

var parsedTorrent = magnet(magnetURI)

var opts = {
  infoHash: parsedTorrent.infoHash,
  announce: parsedTorrent.announce,
  peerId: new Buffer('68236478291210283'), // hex string or Buffer
  port: 6881 // torrent client port
}

var client = new Tracker(opts)

client.scrape()

client.on('scrape', function(data) {
  console.log(data)
})
