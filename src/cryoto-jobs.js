import axios from "axios";
import * as cheerio from "cheerio"
import Jobs from "../models/jobs.js"
export default async function getCryptoJobs() {

      let currentPage = 1;
      let breakFlag = 0
      for (let i = currentPage; i <= currentPage && breakFlag === 0; i++) {
            try {
                  const url = `https://crypto.jobs/?page=${currentPage}`
                  const { data } = await axios.get(url)
                  const $ = cheerio.load(data)
                  const element = "#app > div > div > div.col-md-8 > div > div.panel-body > table > tbody > tr";
                  const nextpage = "#app > div > div > div.col-md-8 > div > div.panel-footer > ul>li:last-child"

                  $(nextpage).each((linkIdx, Linkel) => {
                        console.log("data fetched from:", url);
                        let nextPageNo = parseInt($(Linkel)?.find("a.page-link")?.attr()?.href?.replace("http://crypto.jobs?page=", ""))
                        if (!nextPageNo) {
                              breakFlag = 1
                        }
                        else {
                              $(element).each(async (parentIdx, parentChild) => {
                                    if (parentIdx > 0) {
                                          let role = $(parentChild).find("td:nth-child(2) > a > p").text()
                                          let company = $(parentChild).find("td:nth-child(2) > a > span").text()
                                          let type = $(parentChild).find("td:nth-child(2) > a > div > small > span:nth-child(1)").text().replace("\\s", "").trim()
                                          let field = $(parentChild).find("td:nth-child(2) > a > div > small > span:nth-child(2)").text().trim()
                                          let location = $(parentChild).find("td:nth-child(3) > .pull-right>a:nth-child(1)").text().replace(/(\r\n|\n|\r)/gm, "").replaceAll(" ", "").trim()
                                          let upDatedOn = $(parentChild).find("td:nth-child(3) > div > small > span > span").text().trim()
                                          let source = $(parentChild).find("td:nth-child(2) > a").attr("href").trim().replace("\n", "")
                                          const { data } = await axios.get(source)
                                          const $$ = cheerio.load(data)
                                          const detailSelector = "#app > div > div > div.col-md-8 > div.panel.panel-default"
                                          $$(detailSelector).each(async (childIdx, childEl) => {
                                                const details = $$(childEl).find("div.panel-body > p").text().replace(/(\r\n|\n|\r)/gm, "");
                                                const extraSkills = $$(childEl).find("div.panel-body > div.row > div:nth-child(1) > p:nth-child(2)").text().trim().replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/[^\x20-\x7E]/gmi, "");
                                                const salary = $$(childEl).find("div.panel-body > div.row > div:nth-child(2) > p:nth-child(2)").text().trim().replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/[^\x20-\x7E]/gmi, "");
                                                await Jobs.findOneAndDelete({ role, company, field, location }).then((data) => {
                                                      if (data) {
                                                            data.remove().then(() => {
                                                                  new Jobs({
                                                                        role, company, type, field, location, extraSkills, salary, details, source, upDatedOn
                                                                  }).save().then(() => console.log("updated"))
                                                            })
                                                      }
                                                      else {
                                                            new Jobs({
                                                                  role, company, type, field, location,extraSkills, salary, details, source, upDatedOn
                                                            }).save().then(() => console.log("saved"))
                                                      }
                                                })

                                          })

                                    }

                              })
                              currentPage = nextPageNo;
                        }
                  })

            } catch (error) {
                  console.log(error)
            }
      }
      console.log("Completed")
}
