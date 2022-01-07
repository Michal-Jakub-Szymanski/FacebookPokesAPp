module.exports.start = async function(){
  const fs = require('fs')
let number_of_pokes = 0;
let run;
document.querySelector("#stop").addEventListener("click", kill_func)
let status = document.querySelector("#status")
status.className = `d-flex flex-column justify-content-center align-items-center text-center text-success`
status.textContent = `Started!`
if(document.querySelector("#mode").checked == false){
  if(document.querySelectorAll("input")[1].value == "" || document.querySelectorAll("input")[2].value == ""){
    document.querySelector("#status").textContent = "Please insert data to login!"
    document.querySelector("#status").className = "d-flex flex-column justify-content-center align-items-center text-center text-warning"
    return
  }
}else{
  try{
    let read = fs.readFileSync("EncryptedPasses")
  }catch(e){
    console.log(e)
    document.querySelector("#status").textContent = "EncryptedPasses file not found! create it with encrypt button"
    document.querySelector("#status").className = "d-flex flex-column justify-content-center align-items-center text-center text-warning"
    return
  }
}

const {Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { decryptor } = require("./decryptor.js");
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
  async function kill_func(){
    status.className = `d-flex flex-column justify-content-center align-items-center text-center text-warning`
    status.textContent = `Stopped!`
    clearInterval(run)
    try{
      await driver.quit()
    }catch(e){
      return
    }
  }
  async function findPoke(){
    try{
      await driver.getTitle();
    }catch (e){
      kill_func()
    }
    try{
    let full_last_poke = await driver.findElement(By.xpath("//div[contains(@aria-label, \"Odpowiedz na zaczepkę\")]/../../../..")).getText()
    let last_poke = full_last_poke.split(" ")
    await driver.findElement(By.css("div[aria-label='Odpowiedz na zaczepkę']")).click()
    number_of_pokes++
    console.log(`${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()} I poked`)
    await driver.navigate().to("https://www.facebook.com/pokes")
    document.querySelector("#last_poke").textContent = `${last_poke[0]} ${last_poke[1]}`
    document.querySelector("#total_pokes").textContent = `Total pokes: ${last_poke[4]}`
    document.querySelector("#last_poke_time").textContent = ` last poke at: ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    document.querySelector("#no_of_pokes").textContent = number_of_pokes
    } catch(e){
      console.log(`${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()} didnt find poke`);
    }
  }
  try {
    await driver.get('https://www.facebook.com/pokes');
    await driver.findElement(By.css("button[data-testid='cookie-policy-dialog-accept-button']")).click();
    if(document.querySelector("#mode").checked == true){
        let read = fs.readFileSync("EncryptedPasses")
        read = JSON.parse(read)
        read = {mail: decryptor(read, "email"), pass: decryptor(read, "pass")}
        await driver.findElement(By.name("email")).sendKeys(read.mail);
        await driver.findElement(By.name("pass")).sendKeys(read.pass);
        await driver.findElement(By.id("loginbutton")).click();
        run = setInterval(() => {findPoke()}, 5000);
    }else{
        await driver.findElement(By.name("email")).sendKeys(document.querySelectorAll("input")[1].value);
        await driver.findElement(By.name("pass")).sendKeys(document.querySelectorAll("input")[2].value);
        await driver.findElement(By.id("loginbutton")).click();
        run = setInterval(() => {findPoke()}, 5000);
    }
    
  } catch(e){
    kill_func()
    console.log(e)
    await driver.quit();
  }
}
