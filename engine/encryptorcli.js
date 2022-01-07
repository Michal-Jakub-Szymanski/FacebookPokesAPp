module.exports.encrypt = function(email,pass){
const crypto = require("crypto");
const fs = require("fs");
const algorithm = "aes-256-cbc"; 
const Securitykey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16)
  document.querySelector("#status").textContent = `Encrypted data to "EncryptedPasses" file`
  document.querySelector("#status").className = `d-flex flex-column justify-content-center align-items-center text-center text-success`
  let cipher_for_mail = crypto.createCipheriv(algorithm,Securitykey,initVector)
  let hash_of_email = cipher_for_mail.update(email, "utf-8", "hex")
  hash_of_email += cipher_for_mail.final("hex")
  //encrypted pass
  let cipher_for_pass = crypto.createCipheriv(algorithm,Securitykey,initVector)
  let hash_of_pass = cipher_for_pass.update(pass, "utf-8", "hex")
  hash_of_pass += cipher_for_pass.final("hex")
  let data = {email: hash_of_email, pass: hash_of_pass, key: Securitykey, iv: initVector}
  fs.writeFile(`EncryptedPasses`, `${JSON.stringify(data)}`, (err)=>{if (err) throw err;})
}
