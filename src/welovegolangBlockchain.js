import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"

export default async function weLoveGolangBlockchain() {
      try {
            const { data } = await axios.get('https://www.welovegolang.com/jobs/search?q=blockchain')
            const $ = cheerio.load(data)
            const selector = "body > main > div > div > div > div.asided-layout-content > div > div>div"
            $(selector).each(async (parentId, parentEl) => {
                  const role = $(parentEl).find("div.media-body> h4 > a > span").text()
                  const company = $(parentEl).find("div.media-body > div > div.company > a > span").text()
                  const location1 = $(parentEl).find("div.media-body > div > div.meta > div.location > span").text()
                  const location2 = $(parentEl).find("div.media-body > div > div.meta > div.location > a > span > span").text()
                  const salary = $(parentEl).find("div.media-body > div > div.salary").first().contents().filter(function () {
                        return this.type === 'text';
                  }).text().trim()
                  const upDatedOn = $(parentEl).find("div.media-body > div > div.meta > div.date > time:nth-child(1)").text().trim()
                  const details = $(parentEl).find("div.media-body > h4 > a").attr("href")
                  let location = location2 + location1

                  let source = `https://www.welovegolang.com${details}`
                  const { data } = await axios.get(source)
                  const $$ = cheerio.load(data)
                  const detailLink = "body > main > div > div > div > div.asided-layout-content > div"
                  $$(detailLink).each(async(childIdx, childEl) => {
                        const description = $$(childEl).find("div.description").html()
                        await Jobs.findOneAndDelete({details:description}).then(job => {
                              if (job) {
                                    job.remove().then(() => {
                                          new Jobs({
                                                role,
                                                company,
                                                location,
                                                salary,
                                                details: description,
                                                upDatedOn,
                                          }).save().then(() => {
                                                      console.log("updated")
                                                })
                                    })
                              }
                              else {
                                    new Jobs({
                                          role,
                                          company,
                                          location,
                                          salary,
                                          details: description,
                                          upDatedOn,
                                    }).save().then(() => {
                                          console.log("Saved")
                                    })
                              }


                        })
                        console.log(description)
                  })

            })
      } catch (error) {
            console.log(error)

      }
}

