const discover = require('./src/discoverySources')

const uri =
  'magnet:?xt=urn:btih:DD4D419973F730EFC3BBD117ACE3F28D6CCF1866&dn=Peter+Rabbit+%282018%29+READNFO+720P+WEB-DL-H264-AC3-NeNi&tr=udp%3A%2F%2Finferno.demonoid.pw%3A3418%2Fannounce&tr=udp%3A%2F%2Fbt.xxx-tracker.com%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.xku.tv%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker.coltel.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fzephir.monocul.us%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fthetracker.org%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.acg.gg%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.christianbro.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce'

const config = {
  source: 'dht',
  waitTime: 10000
}

discover(uri, config)
  .then(result => {
    console.log('done...')
    console.log(`source: ${config.source} - waitTime: ${config.waitTime}`)
    console.log('result:')
    const peerKeys = Object.keys(result.peersObj)
    const fromKeys = Object.keys(result.fromsObj)
    const peersLength = peerKeys.length
    const fromsLength = fromKeys.length
    console.log('peersLength', peersLength)
    // console.log('peer sample', result.peersObj[peerKeys[0]])
    console.log('fromsLength', fromsLength)
    // console.log('from sample', result.fromsObj[fromKeys[0]])
  })
  .catch(err => {
    console.error('error!')
    console.error(err)
  })
