import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient("739ab9e75d7146f48a59b70e893d6351")
async function test() {
      let links = []
      const response = await scrape.get("https://jobspresso.co/remote-work/?search_keywords=blockchain", { render: true })
      const $ = cheerio.load(response)
      const element = "#post-2312 > div > div > ul>li>div.job_listing-about"
      $(element).each(async (parentId, parentEl) => {
            const role = $(parentEl).find("div.job_listing-position.job_listing__column>h3").text()
            const company = $(parentEl).find("div.job_listing-position.job_listing__column > div > strong").text()
            const location = $(parentEl).find("div.job_listing-location.job_listing__column").text().trim().replaceAll(" ", "")
            const field = $(parentEl).find("ul > li.job_listing-type").text()
            const updatedOn = $(parentEl).find("ul > li.job_listing-date").text()
            const source = $(parentEl).prevAll("a").attr("href")
            links.push({ source })

            for (let i = 0; i < links.length; i++) {
                  const data = await scrape.get(links[i].source, { render: true })
                  console.log(data)
            }

      })

}
test()