import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient("739ab9e75d7146f48a59b70e893d6351")
async function remoteWorksHub() {
      try {
            const data = await scrape.get("https://remote.works-hub.com/jobs/search/blockchain", { render: true })
            const $ = cheerio.load(data)
            const el = "#jobsboard-search-page > div.main-wrapper.main-wrapper--jobsboard-search > div > div.search-results > div.styles__page--2Mqll > div>section>div.jobs-board__jobs-list__content>div"
            $(el).each(async(parentIdx, parentEl) => {
                  const role = $(parentEl).find("a > div:nth-child(1)").text()
                  const company = $(parentEl).find("a > div.job_card__company__name--6uwXn").text().split(',')[0]
                  const country = $(parentEl).find("a > div.job_card__company__name--6uwXn").text().split(',')[1]
                  const type = $(parentEl).find("div.job_card__details--3xG3B > div:nth-child(2)").text()
                  const location=country+","+type
                  const link = $(parentEl).find("a").attr("href")
                  console.log(link)
                  const source = `https://remote.works-hub.com${link}`
                  const { data } = await axios.get(source)
                  console.log(data)
            })

      } catch (error) {

      }
}
remoteWorksHub()