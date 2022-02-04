import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient("739ab9e75d7146f48a59b70e893d6351")
async function test (){
      const data = await scrape.get("https://weworkremotely.com/remote-jobs/search?utf8=%E2%9C%93&term=blockchain", {
                  "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Linux\"",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "same-origin",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1"
                  },
                  "referrer": "https://weworkremotely.com/categories/remote-full-stack-programming-jobs",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
            },{render:true}
      )
      console.log(data)
}test()