const { discover } = require('../index')

// free book from the the pirate party of canda?
// important to note that atleast one tracker must be included in a magnet link to scrape.
const uri =
  'magnet:?xt=urn:btih:PGW76KLFYZZMYZXSVVKNM6CXXU5253DB&dn=NoSafeHarbor_eBooks-USPirateParty&tr=http%3A%2F%2Fwww.pirateparty.ca%2Ftracker%2Fannounce.php'

discover(uri, {
  source: 'dht',
  waitTime: 10000 // 10 second wait before closing peer search
})
  .then(result => {
    console.log('------------------------------------------')
    console.log(`Finished Scraping: DHT`)
    console.log('result:')
    const peerKeys = Object.keys(result.peersObj)
    const fromKeys = Object.keys(result.fromsObj)
    const peersLength = peerKeys.length
    const fromsLength = fromKeys.length
    console.log('peersLength', peersLength)
    console.log('peer sample', result.peersObj[peerKeys[0]])
    console.log('fromsLength', fromsLength)
    console.log('from sample', result.fromsObj[fromKeys[0]])
    console.log('------------------------------------------')
  })
  .catch(err => {
    console.error('error!')
    console.error(err)
  })
