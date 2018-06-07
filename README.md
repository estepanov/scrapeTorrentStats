# scrapeTorrentStats

Scrape information from the bittorrent trackers and the distributed hash table.

Given a bittorrent magnet URI, scrapeTorrentStats can check both tracker and the DHT for downloads and peers.

This project uses two great projects from the wizards that brought us [WebTorrent](https://webtorrent.io). We use their DHT client [bittorrent-dht](bittorrent-dht), and their tracker client [bittorrent-tracker](https://github.com/webtorrent/bittorrent-tracker).

This project uses native promises.

## _**WARNING**_

You run this code at your own risk. I provide no assurances or guarantees about this software, if you do not feel comfortable auditing the code, then you should not use this code.

#### _**YOU MUST READ THE FOLLOWING:**_

`By running this code you are connecting to users and systems that are sharing whatever file(s) you are requesting. For content that is free and legally permitted to be distributed anyone this is not an issue. For copyrighted content, this code base does NOT download any portion of the requested files, but it will still show up as having connected to the host of files. This means this software only attempts to discover peers and does not in any way initiate or support the downloading or uploading of any file(s). You will show up as having connected to, or requested, information from a system holding the requested content.`

_**Run this at your own risk.**_

# Install

First install scrape-torrent-stats

```shell
yarn add scrape-torrent-stats
```

or

```shell
npm install --save scrape-torrent-stats
```

# Use

We have 3 ways to interact with this library. The Discovery function allows access to both DHT and Tracker scrapes. The other two ways are functions used to specifically to get data from DHT or trackers: getDHTData and getTrackerData. For more information and examples see our [examples folder](https://github.com/estepanov/scrapeTorrentStats/tree/master/examples).

This example is for scraping DHT sources for a torrent. The `discover` function takes two arguments, both are required!. The first is a magnet URI as a string. The second argument is a configuration object. The configuration object MUST include a `source` key. The source key can have one of three values: `'both'`, `'dht'` or `'tracker'`. The configuration object has an optional `waitTime` key that can be set how long to check for peers. You can also enable verbose console logging of the service by setting `verbose` key to `true` inside of the configuration object. By default `verbose` is set to false.

```Javascript
const { discover } = require('scrape-torrent-stats')

// ubuntu desktop magnet uri
const uri =
  'magnet:?xt=urn:btih:f07e0b0584745b7bcb35e98097488d34e68623d0&dn=ubuntu-17.10.1-desktop-amd64.iso'

const config = {
  source: 'dht', // can also be 'both' or 'tracker'
  waitTime: 10000, // 10 second wait before closing peer search
}

discover(uri, config) // input must be uri in string
  .then(result => {
    console.log(result);
    // Structure of result object can be seen further down
     })
  .catch(err => {
    console.error(err);
  });
```

The `result` object returned above is structured as:

```Javascript
  {
    peersObj: {},
    fromsObj: {}
  }
```

The `peersObj` is an object full of peers. The keys for `peersObj` are a series of strings consisting of a peer's host:port. The value for the key is:

```Javascript
  {
    host: '12.345.678.90',
    port: 39639
  }
```

The `fromsObj` is an object full of peer sources. The keys for `fromsObj` are a series of strings consisting of a peer source's address:port. The value for the key is:

```Javascript
  {
    address: '123.456.78.901',
    family: 'IPv4',
    port: 6881,
    size: 339
  }
```

When using the Discover you can also enable verbose logging. For example:

```Javascript
const { discover } = require('scrape-torrent-stats');

// ubuntu desktop magnet uri
const uri =
  'magnet:?xt=urn:btih:f07e0b0584745b7bcb35e98097488d34e68623d0&dn=ubuntu-17.10.1-desktop-amd64.iso';

const config = {
  source: 'dht',
  waitTime: 10000, // 10 second wait before closing peer search
  verbose: true,
};

discover(uri, config);
```

# Examples

Besides the examples provided above, please see the examples folder in the root of this project for more resources.

The `package.json` also provides a script with an example for your convenience. After installing `scrape-torrent-stats` run the following command:

```shell
yarn run example-discover
```

or if npm is your cup of tea

```shell
npm run example-discover
```
