const crypto = require("crypto");
const fs = require("fs");
const colors = require('colors/safe')
const prompt = require('prompt')
const algorithm = "aes-256-cbc"; 
const Securitykey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16)
/*
        //encrypted email
         let cipher_for_mail = crypto.createCipheriv(algorithm,Securitykey,initVector)
         let hash_of_email = cipher_for_mail.update(email, "utf-8", "hex")
         hash_of_email += cipher_for_mail.final("hex")
         console.log(hash_of_email);
         //encrypted pass
         let cipher_for_pass = crypto.createCipheriv(algorithm,Securitykey,initVector)
         let hash_of_pass = cipher_for_pass.update(pass, "utf-8", "hex")
         hash_of_pass += cipher_for_pass.final("hex")
         console.log(hash_of_pass);
         let data = {email: hash_of_email, pass: hash_of_pass, key: Securitykey, iv: initVector}
        fs.writeFile(`EncryptedPasses`, `${JSON.stringify(data)}`, (err)=>{if (err) throw err; console.log("File created send it to host!"); process.exit();})
*/
const properties = [
  {
    name: 'email',
    require: true,
    replace: "*"
  },
  {
    name: 'password',
    require: true,
    hidden: true,
    replace: "*"
  }
];

prompt.start();
prompt.message = "Facebook Pokes app"
prompt.delimiter = colors.cyan(":  ")

prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }
  //encrypted email
  let cipher_for_mail = crypto.createCipheriv(algorithm,Securitykey,initVector)
  let hash_of_email = cipher_for_mail.update(result.email, "utf-8", "hex")
  hash_of_email += cipher_for_mail.final("hex")
  //encrypted pass
  let cipher_for_pass = crypto.createCipheriv(algorithm,Securitykey,initVector)
  let hash_of_pass = cipher_for_pass.update(result.password, "utf-8", "hex")
  hash_of_pass += cipher_for_pass.final("hex")
  let data = {email: hash_of_email, pass: hash_of_pass, key: Securitykey, iv: initVector}
 fs.writeFile(`EncryptedPasses`, `${JSON.stringify(data)}`, (err)=>{if (err) throw err; process.exit();})
 console.clear();
 console.log(colors.green("\n\n\nYour login data has been submited sucesfully!\n\n\n"))
});

function onErr(err) {
  console.log(err);
  return 1;
}
