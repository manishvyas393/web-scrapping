import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
export default async function workAna() {
      try {
            let tempPages;
            const { data } = await axios.get("https://www.workana.com/jobs?category=it-programming&language=en&skills=blockchain")
            const $ = cheerio.load(data)
            const nextPages = "#projects > div"
            $(nextPages).each((id, el) => {
                  const pages = $(el).find("div.js-pager-container > div:nth-child(2)>nav>ul.pagination>li>a").text().replaceAll(" ", "")
                  if (pages !== "") {
                        tempPages = pages;
                  }
            })

            for (let i = 1; i <= tempPages.length; i++) {
                  const { data } = await axios.get(`https://www.workana.com/jobs?category=it-programming&language=en&skills=blockchain&page=${i}`)
                  const $ = cheerio.load(data)
                  const element = "#projects>div"

                  $(element).each(async (parentIdx, parentEl) => {
                        const role = $(parentEl).find("div.project-header>h2 > a > span").text().replace("", "")
                        const detailsLink = $(parentEl).find("div.project-header>h2 > a").attr("href")
                        const updatedOn = $(parentEl).find("div.project-body > div.project-main-details.hidden-xs.small > span.date").text().trim().replace("", "").replace("Publicado: ", "")
                        const projectDuration = $(parentEl).find("div.project-body > div.project-main-details.hidden-xs.small > span.deadline > span.value").text().replace("", "").trim()
                        const bids = $(parentEl).find("div.project-body > div.project-main-details.hidden-xs.small > span.bids").text().replace("", "").trim()
                        const salary = $(parentEl).find('div.project-actions.floating > h4 > span').text()
                        console.log(salary)
                        if (role === "" && updatedOn === "" && projectDuration == "" && salary === "" && bids === "" && detailsLink === undefined) {
                              console.log("skipped")
                        }
                        else {
                              let source = `https://www.workana.com${detailsLink}`
                              const { data } = await axios.get(source)
                              const $$ = cheerio.load(data)
                              const element = "#app > div > div.container.main > section > section.box-common.block-project > div > section"
                              $$(element).each(async (childIdx, childEl) => {
                                    const details = $$(childEl).find("article:nth-child(1)").html().toString()
                                    await Jobs.findOneAndDelete({ role, salary, bids, source, contract: projectDuration, details }).then(job => {
                                          if (job) {
                                                job.remove().then(() => {
                                                      new Jobs({
                                                            role, salary, bids, source, contract: projectDuration, details, updatedOn
                                                      }).save().then(() => {
                                                            console.log("updated")
                                                      })
                                                })
                                          }
                                          else {
                                                new Jobs({
                                                      role, salary, bids, source, contract: projectDuration, details, updatedOn
                                                }).save().then(() => {
                                                      console.log("saved")
                                                })
                                          }
                                    })

                              })
                        }

                  })
            }

      } catch (error) {
            console.log(error)
      }
}
workAna()