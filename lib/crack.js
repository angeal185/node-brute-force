const Bitstream = require('./bitstream'),
cluster = require('cluster'),
fs = require('fs'),
Crypt = require('./crypt');

let items = [],
cnt = 0;

function Crack(obj){
  console.time('password cracked in')

  let keylen = obj.defaults.key_len;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    if(obj.dev){
      Bitstream(keylen).on('data', function(res) {
        items.unshift(res);
      });
    } else {
      if(!obj.defaults.iv && !obj.defaults.tag){
        keylen = (keylen + obj.defaults.iv_len + obj.defaults.tag_len)
      }
      Bitstream(keylen).on('data', function(res) {
        items.pop(res);
      });
    }

    for (let i = 0; i < obj.workers; i++) {
      cluster.fork().on('message', function(msg, res){
        if(msg === 'end'){
          console.timeEnd('password cracked in')
          process.exit()
        }
        let item = items.pop();
        this.send(item);
        cnt++
      })
    }

    if(obj.verbose){
      setInterval(function(){
        console.log('passwords checked: '+ cnt)
      },obj.verbose)
    }

  } else {

    process.on('message', function(item){
      if(item){
    
        Crypt.decrypt(obj.data, item, obj.defaults, function(err,res){
          if(err || !res){return process.send('get');}
          if(obj.file.enabled){
            fs.writeFileSync(obj.file.dest, JSON.stringify(res))
          }
          console.log(Buffer.from(res).toString())
          process.send('end');
        })
      }
    });
    process.send('test');
  }

}

module.exports = { Crack, Bitstream, Crypt }
