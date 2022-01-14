import puppeteer from "puppeteer"
import fs from "fs/promises"
async function run() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://cryptocurrencyjobs.co/web3/");
      const names = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#find-a-job>div> ul > li> div> h2>a")).map((x) => x.textContent)
      })
      const company = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#find-a-job > div> ul > li> div> h3")).map((x) => x.innerText)
      })
      const location = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#find-a-job > div> ul > li> div> div > ul:nth-child(1) > li > h4 > a")).map((x) => x.innerText)
      })
      for (let i = 0; i <names.length;i++){
            console.log(names[i])
            console.log(location[i])
            console.log(company[i],"\n")
      }
     
      await browser.close()
}
run()