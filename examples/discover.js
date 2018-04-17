const { discover } = require('../index')

// ubuntu desktop magnet uri
const uri =
  'magnet:?xt=urn:btih:f07e0b0584745b7bcb35e98097488d34e68623d0&dn=ubuntu-17.10.1-desktop-amd64.iso'

discover(uri, {
  source: 'dht',
  waitTime: 10000 // 50 second wait before closing peer search
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

discover(uri, { source: 'tracker' })
  .then(result => {
    console.log('------------------------------------------')
    console.log(`Finished scraping: TRACKERS`)
    console.log('result:')
    console.log(result)
    // const peerKeys = Object.keys(result.peersObj)
    // const fromKeys = Object.keys(result.fromsObj)
    // const peersLength = peerKeys.length
    // const fromsLength = fromKeys.length
    // console.log('peersLength', peersLength)
    // console.log('peer sample', result.peersObj[peerKeys[0]])
    // console.log('fromsLength', fromsLength)
    // console.log('from sample', result.fromsObj[fromKeys[0]])
    console.log('------------------------------------------')
  })
  .catch(err => {
    console.error('error!')
    console.error(err)
  })
