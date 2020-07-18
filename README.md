# node-brute-force
multi thread brute-force password cracker for nodejs

* master is responsible for creating and updating the decipher pad
* workers are responsible for decryption
* will crack any nodejs encrypted data assuming it is configured correct
* accepts and returns data as byte arrays

crack data with iv and tag
```js
const { Crack } = require('./node-brute-force');

Crack({
  workers: 1, // clusters
  dev: true, // unshift if true | pop if false
  verbose: 100, // status log to console interval ms || false to disable
  file: {
    enabled: true, // enable write to file
    dest: './ptext.json' // result dest
  },
  data: [ // encrypted data
    240,122,126,200,131,140,8,84,50,104,165,187,
    38,232,119,79,207,240,87,98
  ],
  defaults: { // if any of these are wrong, it wont work. get it right.
    key_len: 32, // encryption key length
    cipher: "aes", // encryption cipher | includes aes|aria|camellia
    bit_len: "256", // encryption bits | includes 128|192|256
    mode: "gcm", // encryption mode | includes gcm|cbc|ccm|ctr|cfb|cfb1|cfb8|ocb|ofb
    iv: [ // encryption iv
      48,59,101,235,103,19,234,9,51,154,126,14,
      61,145,241,18,157,76,13,148,158,98,13,115,
      74,96,61,230,86,117,191,55
    ],
    tag: [ // encryption tag
      172,159,255,174,112,56,224,121,203,48,207,
      6,122,18,28,96
    ],
    tag_len: 16 // encryption tag length || 0 if none
  }
})


```

crack data without iv and tag
```js
const { Crack } = require('./node-brute-force');

Crack({
  workers: 1, // clusters
  dev: true, // unshift if true | pop if false
  verbose: 10000, // status log to console interval ms || false to disable
  file: {
    enabled: true, // enable write to file
    dest: './ptext.json' // result dest
  },
  data: [ // encrypted data
    240,122,126,200,131,140,8,84,50,104,165,187,
    38,232,119,79,207,240,87,98
  ],
  defaults: {
    key_len: 32, // encryption key length
    cipher: "aes", // encryption cipher | includes aes|aria|camellia
    bit_len: "256", // encryption bits | includes 128|192|256
    mode: "gcm", // encryption mode | includes gcm|cbc|ccm|ctr|cfb|cfb1|cfb8|ocb|ofb
    iv_len: 32, // encryption iv length
    tag_len: 16 // encryption tag length || 0 if none
  }
})


```


converting data to byte array to be used for crack
```js

// binary
let data = 'test data'
data = Array.from(Buffer.from(data, 'binary'));

//hex
data = '746573742064617461';
data = Array.from(Buffer.from(data, 'hex'));

//base64
data = 'dGVzdCBkYXRh'
data = Array.from(Buffer.from(data, 'base64'));

//nodejs buffer
data = Buffer.from('test data')
data = Array.from(data);

...
```
