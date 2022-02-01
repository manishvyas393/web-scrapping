import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
export default async function dailyRemote() {
      try {
            let currentPage = 1
            let breakFlag = 0
            for (let i = currentPage; i <= currentPage && breakFlag === 0; i++) {
                  const { data } = await axios.get(`https://dailyremote.com/remote-jobs?search=crypto&page=${currentPage}#main`)
                  const $ = cheerio.load(data)
                  const nextPage = "#main > div > div > div.content > div > div:nth-child(4) > div > div"
                  $(nextPage).each((nxtIdx, nextEl) => {
                        const nextPageNo = $(nextEl).find("a:last-child").attr("href").replace("/remote-jobs?search=crypto&page=", "").replace("#main", "")
                        currentPage = nextPageNo;
                        if (!nextPageNo) {
                              breakFlag = 1;
                        }
                  })
                  const JobList = "#main > div > div > div.content > div.card-container> div:nth-child(3)>article> div.info-container > div > div.profile-information"
                  $(JobList).each(async (parentIdx, parentEl) => {
                        const role = $(parentEl).find("div> h2 > a").text().trim()
                        const company = $(parentEl).find("div:nth-child(1) > div.company-name > a").text().trim()
                        const location = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span:nth-child(2)>span").text()
                        const field = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span.job-category").text().replace("\n", "").trim()
                        const upDatedOn = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span:nth-child(1)>span:nth-child(2)").text().trim()
                        const detailsLink = $(parentEl).find("div> h2 > a").attr("href")
                        const { data } = await axios.get(`https://dailyremote.com${detailsLink}`);
                        const $$ = cheerio.load(data)
                        const jobDetail = "body > div.detailed-job-main-container > div.detailed-job-wrapper > div.detailed-job > div.detailed-job-body"
                        $$(jobDetail).each(async(childIdx, childEl) => {
                              const details = $$(childEl).find("div > div.job-full-description").html()
                              await Jobs.findOneAndDelete({ role, company, location, field, upDatedOn }).then(job => {
                                    if (job) {
                                          job.remove().then(() => {
                                                new Jobs({
                                                      role,
                                                      company,
                                                      location,
                                                      field,
                                                      upDatedOn,
                                                      source: detailsLink,
                                                      details
                                                      
                                                }).save().then(() => {
                                                      console.log("saved")
                                                })
                                          })
                                    }
                                    else {
                                          new Jobs({
                                                role,
                                                company,
                                                location,
                                                field,
                                                upDatedOn,
                                                source: detailsLink,
                                                details

                                          }).save().then(() => {
                                                console.log("saved")
                                          })
                                          
                                    }
                              })

                        })
                  })
            }

      } catch (error) {
            console.log(error)

      }
}
