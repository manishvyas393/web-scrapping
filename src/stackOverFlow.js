import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient(process.env.api_key)
export async function stackOverFlowBlockchain() {
      const data = await scrape.get("https://stackoverflow.com/jobs?q=blockchain", { render: true })
      const $ = cheerio.load(data)
      const element = "#content > div.js-search-container.search-container.mbn24 > div > div.flex--item.fl1.br.bc-black-2 > div > div.listResults>div.-job>div:nth-child(2)"
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.flex--item.fl1 > h2 > a").text()
            const company = $(parentEl).find("div.flex--item.fl1 > h3 > span:nth-child(1)").text().trim()
            const updatedOn = $(parentEl).find("div.flex--item.fl1 > ul > li:nth-child(1)>span").text()
            const location = $(parentEl).find("div:nth-child(2) > div.flex--item.fl1 > h3 > span.fc-black-500").text().trim()
            const salary = $(parentEl).find("div:nth-child(2) > div.flex--item.fl1 > ul > li[title]").text()
            const link = $(parentEl).find("div.flex--item.fl1 > h2 > a").attr("href")
            const source = `https://stackoverflow.com${link}`
            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const el = "#content > div.d-flex.fd-row.gsx.gs24>div"
            $$(el).each(async (childIdx, childEl) => {
                  const details = $$(childEl).find("#content > div.d-flex.fd-row.gsx.gs24 > div.flex--item.fl1.fs-body2.ws1.ow-break-word").html()
                  await Jobs.findOneAndDelete({ role, company, location, source }).then(job => {
                        if (job) {
                              job.remove().then(() => {
                                    new Jobs({
                                          role,
                                          company,
                                          location,
                                          source,
                                          details,
                                          updatedOn,

                                    }).save().then(() => console.log("job updated"))
                              })
                        }
                        else {
                              new Jobs({
                                    role,
                                    company,
                                    location,
                                    source,
                                    details,
                                    updatedOn,
                                    salary
                              }).save().then(() => console.log("job added"))
                        }


                  })
            })
      })
}
export async function stackOverFlowWeb3() {
      const data = await scrape.get("https://stackoverflow.com/jobs?q=web3", { render: true })
      const $ = cheerio.load(data)
      const element = "#content > div.js-search-container.search-container.mbn24 > div > div.flex--item.fl1.br.bc-black-2 > div > div.listResults>div.-job>div:nth-child(2)"
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.flex--item.fl1 > h2 > a").text()
            const company = $(parentEl).find("div.flex--item.fl1 > h3 > span:nth-child(1)").text().trim()
            const updatedOn = $(parentEl).find("div.flex--item.fl1 > ul > li:nth-child(1)>span").text()
            const location = $(parentEl).find("div:nth-child(2) > div.flex--item.fl1 > h3 > span.fc-black-500").text().trim()
            const salary = $(parentEl).find("div:nth-child(2) > div.flex--item.fl1 > ul > li[title]").text()
            const link = $(parentEl).find("div.flex--item.fl1 > h2 > a").attr("href")
            const source = `https://stackoverflow.com${link}`
            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const el = "#content > div.d-flex.fd-row.gsx.gs24>div"
            $$(el).each(async (childIdx, childEl) => {
                  const details = $$(childEl).find("#content > div.d-flex.fd-row.gsx.gs24 > div.flex--item.fl1.fs-body2.ws1.ow-break-word").html()
                  await Jobs.findOneAndDelete({ role, company, location, source }).then(job => {
                        if (job) {
                              job.remove().then(() => {
                                    new Jobs({
                                          role,
                                          company,
                                          location,
                                          source,
                                          details,
                                          updatedOn,

                                    }).save().then(() => console.log("job updated"))
                              })
                        }
                        else {
                              new Jobs({
                                    role,
                                    company,
                                    location,
                                    source,
                                    details,
                                    updatedOn,
                                    salary
                              }).save().then(() => console.log("job added"))
                        }


                  })
            })
      })
}

