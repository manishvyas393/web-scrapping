import axios from "axios";
import * as cheerio from "cheerio"

async function getCryptoJobs() {

      const url = "https://cryptocurrencyjobs.co/web3/"
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const element = ".ais-Hits-item > div:nth-child(2)>h2";
      console.log($(element).text())
      $(element).each((parentIdx, parentChild) => {
            let text = $(parentChild).text()
            console.log(text)
      })
}
getCryptoJobs();