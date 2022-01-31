import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
async function Remote3() {
      try {
            const { data } = await axios.get('https://remote3.co/web3-jobs')
            const $ = cheerio.load(data)
            const element = "#odindex > div.bubble-element.Group.bubble-r-container.flex.row > div > div.bubble-element.Group.bubble-r-container.flex.column"
            console.log($(element).html())
            $(element).each((parentIdx, parentEl) => {
                  const role = $(parentEl).html()
            })
            
      }
      catch (err) {
            console.log(err)
      }
}
Remote3()