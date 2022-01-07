module.exports.decryptor = function(text, email_or_pass){
const crypto = require("crypto")
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text[email_or_pass], 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}