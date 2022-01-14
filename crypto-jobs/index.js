import axios from "axios";
import * as cheerio from "cheerio"

async function getCryptoJobs() {

      const url = "https://cryptocurrencyjobs.co/web3/"
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const element = "#find-a-job > div> ul>li>div";
      $(element).each((parentIdx, parentChild) => {
            let role = $(parentChild).find("h2").text().trim()
            let company = $(parentChild).find("h3").first().text().trim()
            let proffesion = $(parentChild).find("div>div>h4>a").text().trim()
            let jobType = $(parentChild).find("div > ul:nth-child(1) > li > h4 > a").text().trim()
            let contract = $(parentChild).find("div > ul:nth-child(5) > li > h4").text().replace("Contract", "Contract-")
            let salary = $(parentChild).find(".leading-relaxed>span").text().trim()
            let date = $(parentChild).find(".inline-block>span").text().replace(",", "")
      })
}
getCryptoJobs();