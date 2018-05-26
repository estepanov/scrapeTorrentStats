const { discover } = require('../index')

// ubuntu desktop magnet uri
const uri =
  'magnet:?xt=urn:btih:PGW76KLFYZZMYZXSVVKNM6CXXU5253DB&dn=NoSafeHarbor_eBooks-USPirateParty&tr=http%3A%2F%2Fwww.pirateparty.ca%2Ftracker%2Fannounce.php'
discover(uri, { source: 'both', verbose: false })
  .then(result => {
    console.log('------------------------------------------')
    console.log(`Finished scraping`)
    console.log('result:')
    console.log(result)
    console.log('------------------------------------------')
  })
  .catch(err => {
    console.error('error!')
    console.error(err)
  })
