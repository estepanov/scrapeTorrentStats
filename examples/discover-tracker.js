const { discover } = require('../index')

// free book from the the pirate party of canda?
// important to note that atleast one tracker must be included in a magnet link to scrape.
const uri =
  'magnet:?xt=urn:btih:PGW76KLFYZZMYZXSVVKNM6CXXU5253DB&dn=NoSafeHarbor_eBooks-USPirateParty&tr=http%3A%2F%2Fwww.pirateparty.ca%2Ftracker%2Fannounce.php'

discover(uri, { source: 'tracker' })
  .then(result => {
    console.log('------------------------------------------')
    console.log(`Finished scraping: TRACKERS`)
    console.log('result:')
    console.log(result)
    console.log('------------------------------------------')
  })
  .catch(err => {
    console.error('error!')
    console.error(err)
  })
