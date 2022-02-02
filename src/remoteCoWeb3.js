import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
import scraperapiClient from 'scraperapi-sdk'
import dotenv from "dotenv"
dotenv.config()
const scrape = scraperapiClient(process.env.api_key)
export default async function remoteCoWeb3() {
      const response = await scrape.get('https://remote.co/remote-jobs/search/?search_keywords=web3', { render: true })
      const $ = cheerio.load(response)
      const element = "body > main > div.container.pt-4 > div > div.col > div.job_listings > div.card.bg-light.mb-3.rounded-0 > div > div.card.bg-light.m-0>div>div > div> div"
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.col.position-static > div > p:nth-child(1) > a").text()
            const location = $(parentEl).find("div.col.position-static > div > p.m-0.text-secondary > span.badge.badge-success> small").text().replace("Full-time", "")
            const contract = $(parentEl).find("div.col.position-static > div > p.m-0.text-secondary > span.badge.badge-success> small").text().replace("International", "")
            const company = $(parentEl).find("div.col.position-static > div > p.m-0.text-secondary").first().contents().filter(function () {
                  return this.type === 'text';
            }).text().trim().replaceAll(" ", "")
            const updatedOn = $(parentEl).find("div.col-auto.text-right.position-static > p > small > date").text()
            const Link = $(parentEl).find("div.col.position-static > div > p:nth-child(1) > a").attr("href")
            let source = ""
            if (Link === undefined) {
                  console.log(Link)
            }
            else {
                  source = `https://remote.co${Link}`
                  const { data } = await axios.get(source)

                  const $$ = cheerio.load(data)
                  const el = "body > main > div > div > div.col > div:nth-child(3)"
                  $$(el).each(async (childIdx, childEl) => {
                        const details = $(childEl).find("div > div.single_job_listing > div.job_description").html()
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
                                                contract
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
                                          contract
                                    }).save().then(() => console.log("job added"))
                              }


                        })
                  })
            }





      })
}
remoteCoWeb3()