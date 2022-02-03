import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
export async function skipTheDriveBlockchain() {

      try {
            let totalPages;
            const { data } = await axios.get(`https://www.skipthedrive.com/page/1/?s=blockchain`)
            const $ = cheerio.load(data)
            const nextPageEl = "#content > div.pagenav.tf_clear.tf_box.tf_textr.tf_clearfix > a.number.lastp"
            totalPages = parseInt($(nextPageEl).attr("href").replace("https://www.skipthedrive.com/page/", "").replace("/?s=blockchain", ""))

            for (let i = 1; i <= totalPages; i++) {
                  const { data } = await axios.get(`https://www.skipthedrive.com/page/${i}/?s=blockchain`)
                  const $ = cheerio.load(data)
                  const el = "#loops-wrapper>article.post"
                  $(el).each(async (parentIdx, parentEl) => {
                        const role = $(parentEl).find("div.post-content > h2 > a").text()
                        const company = $(parentEl).find("div.post-content > div > div > span.custom_fields_company_name_display_search_results").text().trim()
                        const updatedOn = $(parentEl).find("div.post-content > div > div > span.custom_fields_job_date_display_search_results").text().trim()
                        const source = $(parentEl).find("div.post-content > h2 > a").attr("href")
                        const { data } = await axios.get(source)
                        const $$ = cheerio.load(data)
                        const el = "#content"
                        $$(el).each(async (childIdx, childEl) => {
                              const details = $$(childEl).find("article").html()
                              await Jobs.findOneAndDelete({ role, company, updatedOn, source, details }).then(job => {
                                    if (job) {
                                          job.remove().then(() => {
                                                new Jobs({
                                                      role, company, updatedOn, source, details
                                                }).save().then(() => console.log("job updated"))
                                          })
                                    }
                                    else {
                                          new Jobs({
                                                role, company, updatedOn, source, details
                                          }).save().then(() => console.log("job added"))
                                    }


                              })
                        })
                  })
            }
      } catch (error) {
            console.log("error", error)
      }


}


export async function skipTheDriveWeb3() {
      let pages
      try {
            const { data } = await axios.get(`https://www.skipthedrive.com/page/1/?s=web3`)
            const $ = cheerio.load(data)
            const nextPageEl = "#content > div.pagenav.tf_clear.tf_box.tf_textr.tf_clearfix"
            pages = $(nextPageEl).text().replaceAll(" ", "")
            for (let i = 1; i <= pages.length; i++) {
                  const { data } = await axios.get(`https://www.skipthedrive.com/page/${i}/?s=web3`)
                  const $ = cheerio.load(data)
                  const el = "#loops-wrapper>article.post"
                  $(el).each(async (parentIdx, parentEl) => {
                        const role = $(parentEl).find("div.post-content > h2 > a").text()
                        const company = $(parentEl).find("div.post-content > div > div > span.custom_fields_company_name_display_search_results").text().trim()
                        const updatedOn = $(parentEl).find("div.post-content > div > div > span.custom_fields_job_date_display_search_results").text().trim()
                        const source = $(parentEl).find("div.post-content > h2 > a").attr("href")
                        const { data } = await axios.get(source)
                        const $$ = cheerio.load(data)
                        const el = "#content"
                        $$(el).each(async (childIdx, childEl) => {
                              const details = $$(childEl).find("article").html()
                              await Jobs.findOneAndDelete({ role, company, updatedOn, source, details }).then(job => {
                                    if (job) {
                                          job.remove().then(() => {
                                                new Jobs({
                                                      role, company, updatedOn, source, details
                                                }).save().then(() => console.log("job updated"))
                                          })
                                    }
                                    else {
                                          new Jobs({
                                                role, company, updatedOn, source, details
                                          }).save().then(() => console.log("job added"))
                                    }


                              })
                        })
                  })
            }


      } catch (error) {
            console.log("error", error)
      }


}
skipTheDriveWeb3()