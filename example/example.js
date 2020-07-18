const { Crack, Bitstream, Crypt } = require('./'),
crypto = require('crypto');



Crack({
  workers: 1,
  threads: 5,
  dev: true,
  verbose: 100,
  file: {
    enabled: true,
    dest: './ptext.json'
  },
  data: [
    240,122,126,200,131,140,8,84,50,104,165,187,
    38,232,119,79,207,240,87,98
  ],
  defaults: {
    key_len: 32,
    cipher: "aes",
    bit_len: "256",
    mode: "gcm",
    iv: [
      48,59,101,235,103,19,234,9,51,154,126,14,
      61,145,241,18,157,76,13,148,158,98,13,115,
      74,96,61,230,86,117,191,55
    ],
    iv_len: 32,
    tag: [
      172,159,255,174,112,56,224,121,203,48,207,
      6,122,18,28,96
    ],
    tag_len: 16
  }
})


/*
let cnf = {
  cipher: "aes",
  bit_len: "256",
  mode: "gcm",
  iv: false,
  iv_len: 32,
  tag: false,
  tag_len: 16
},
key = [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


Crypt.encrypt('some data to encrypt', key, cnf, function(err,res){
  if(err){
    return console.log(err)
  }
  cnf.iv = res.iv
  cnf.tag = res.tag
  console.log(JSON.stringify(res))



})
*/
