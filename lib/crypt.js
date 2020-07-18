const crypto = require('crypto');

const Crypt = {
  decrypt(encdata, key, defaults, cb){
    try {
      let final;

      if(!defaults.iv && !defaults.tag){
        obj.defaults.iv_len = key.slice(defaults.key_len + defaults.tag_len);
        obj.defaults.tag_len = key.slice(defaults.key_len, defaults.tag_len);
        key = key.slice(0,defaults.key_len)
      }

      encdata = Buffer.from(encdata);
      const decipher = crypto.createDecipheriv(
        [defaults.cipher, defaults.bit_len, defaults.mode].join('-'),
        Buffer.from(key),
        Buffer.from(defaults.iv),
        {authTagLength: defaults.tag_len}
      );

      if(['gcm', 'ocb', 'ccm'].indexOf(defaults.mode) !== -1){
        decipher.setAuthTag(Buffer.from(defaults.tag));
      }

      final = Array.from(
        Buffer.from(decipher.update(encdata) + decipher.final())
      );

      return cb(false, final);
    } catch (err) {
      cb(err)
    }
  },
  encrypt: function(text, key, defaults, cb) {
    try {

      const iv = crypto.randomBytes(defaults.iv_len),
      cipher = crypto.createCipheriv(
        [defaults.cipher, defaults.bit_len, defaults.mode].join('-'),
        Buffer.from(key),
        iv,
        {authTagLength: defaults.tag_len}
      ),
      encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

      let final;
      if(['gcm', 'ocb', 'ccm'].indexOf(defaults.mode) !== -1){
        final = {
          iv: Array.from(iv),
          tag: Array.from(cipher.getAuthTag()),
          data: Array.from(encrypted)
        }
      } else {
        final = {
          iv: Array.from(iv),
          data: Array.from(encrypted)
        }
      }

      return cb(false, final);

    } catch(err){
      return cb(err);
    }
  }
}


module.exports = Crypt;
