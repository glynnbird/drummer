# Drummer

An demo that allows drum sequences to be composed and saved in a web interface.

![cr78](img/cr78.png)

![r8](img/r8.png)

![r8](img/screencap.png)

[LIVE DEMO](https://glynnbird.github.io/drummer/)

The drum sounds are based on the Roland CR78 & R8 drum machines but are programmed using HTML check box
controls on a time line.

The drum patterns can be saved and retrieved in an in-browser database [PouchDB](https://pouchdb.com)
and synced with remote CouchDB or Cloudant databases.

It is built with the [Howler JavaScript audio library](https://howlerjs.com/) and brought to life with
[Vue.js](https://vuejs.org/) and [Bootstap](http://getbootstrap.com/). It uses [PouchDB](https://pouchdb.com/) to store your loops in a local, in-browser database, but you can also sync this collection to a remote [CouchDB](http://couchdb.apache.org/) or [Cloudant](https://www.ibm.com/uk-en/cloud/cloudant) database for safe-keeping.

## Credits

Thanks to http://www.boxedear.com/free.html for the original samples.
