import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
export async function noFluffJobs(){
      const {data }= await axios.get("https://nofluffjobs.com/jobs/blockchain?criteria=keyword%3Dweb3&page=1")
      const $ = cheerio.load(data)
      const element = "body > nfj-root > nfj-layout > nfj-main-content > div > div.main-content__outlet.mb-5.pb-5 > nfj-postings-search > div > common-main-loader > div > nfj-search-results > nfj-postings-list > div.list-container.ng-star-inserted>#nfjPostingListItem-DRUVYJPU"
      $(element).each(async (id, el) => {
            const role = $(el).find("nfj-posting-item-title > div > div > h3").text()
            const company = $(el).find("nfj-posting-item-title > div > span").text()
            const location = $(el).find("div.posting-info.position-relative.d-lg-flex.flex-grow-1.align-items-center.ng-star-inserted > span").text()
            const salary = $(el).find("div.posting-info.position-relative.d-lg-flex.flex-grow-1.align-items-center.ng-star-inserted > nfj-posting-item-tags > span").text()
            const link = $(el).find("div.posting-image.d-flex.justify-content-center.align-items-center.overflow-hidden.flex-shrink-0.px-10").parents("a").attr("href")
            const source = `https://nofluffjobs.com/${link}`
            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const details = $$("body > nfj-root > nfj-layout > nfj-main-content > div > div.main-content__outlet.mb-5.pb-5 > nfj-posting-details > common-main-loader > section > div.row.mb-3").html()
            await Jobs.findOneAndDelete({ role, company, location, source, details }).then(job => {
                  if (job) {
                        job.remove().then(() => {
                              new Jobs({
                                    role,
                                    company,
                                    location,
                                    source,
                                    details,
                                    salary
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
                              salary
                        }).save().then(() => console.log("job added"))
                  }


            })
      })
} 