import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.connect("mongodb+srv://manish393:manish393@cluster0.t5wpu.mongodb.net/web-scrapper?retryWrites=true&w=majority")
export default async function remoteOk() {
      try {
            var config = {
                  headers: {
                        'Connection': 'keep-alive',
                        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        'Upgrade-Insecure-Requests': '1',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Sec-Fetch-Site': 'none',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-User': '?1',
                        'Sec-Fetch-Dest': 'document',
                        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                        'Cookie': 'ref=https%3A%2F%2Fwww.google.com%2F; adShuffler=1; new_user=false; visits=5; adShuffler=0; ref=https%3A%2F%2Fwww.google.com%2F'
                  }
            };

            const { data } = await axios.get("https://remoteok.com/remote-blockchain-jobs", config)
            const $ = cheerio.load(data)
            const element = "#jobsboard > tbody>tr>td.company.position.company_and_position"
            $(element).each(async (parentIdx, parentEl) => {
                  const role = $(parentEl).find("a > h2").text().trim().replace(" ", "")
                  const company = $(parentEl).find("span.companyLink > h3").text().replace(" ", "").trim()
                  const location = $(parentEl).find("div.location").text().replace(" ", "").trim()
                  const link = $(parentEl).find("a").attr().href
                  const source = `https://remoteok.com${link}`
                  const { data } = await axios.get(source, config)
                  const $$ = cheerio.load(data)
                  const el = "#jobsboard > tbody > tr.expand"
                  $$(el).each(async (chilIdx, childEl) => {
                        const details = $$(childEl).find("td > div > div.description").html()
                        console.log(details)
                        await Jobs.findOneAndDelete({ role, company, location, source }).then(job => {
                              if (job) {
                                    job.remove().then(() => {
                                          new Jobs({
                                                role,
                                                company,
                                                location,
                                                source,
                                                details,

                                          }).save().then(() => console.log("updated"))
                                    })
                              }
                              else {
                                    new Jobs({
                                          role,
                                          company,
                                          location,
                                          source,
                                          details,
                                    }).save().then(() => console.log("saved"))
                              }


                        })
                  })

            })
      } catch (error) {
            console.log(error)
      }



}
