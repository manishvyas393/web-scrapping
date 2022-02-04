import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient("739ab9e75d7146f48a59b70e893d6351")
export async function nodesk() {
      const data = await scrape.get("https://nodesk.co/remote-jobs/?query=blockchain", { render: true })
      const $ = cheerio.load(data)
      const element = "#hits > div > div > ol > li>div> div"
      $(element).each((idx, el) => {
            const role = $(element).find("h2 > a").text()
            console.log(role)
      })
}
nodesk()