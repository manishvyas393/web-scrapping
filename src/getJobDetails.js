import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
export  default async function getJobDetails() {
      try {
            let currentPage = 1;

            for (let i = currentPage; i <= currentPage; i++) {
                  const url = `https://web3.career/?page=${i}`
                  const { data } = await axios.get(url, { ignoreWhitespace: true })
                  const $ = cheerio.load(data)

                  const ElementSelector = "body > main > div > div > div > div:nth-child(4) > table > tbody > tr";
                  const elemetSelect = "body > main > div > div > div.mx-auto"
                  const nextPage = "body > main > div > div > div > div.px-3 > div > nav.pagy-bootstrap-nav > ul";

                  $(nextPage).each((linkIndx, linkEl) => {
                        console.log("data fetched from:",url);
                        let nextPageNo = parseInt($(linkEl).find("li.page-item.next>a").attr().href.replace("/?page=", ""))
                        $(ElementSelector).each(async (parentIdx, parentEl) => {
                              let role = $(parentEl).find("h2").text().trim()
                              let company = $(parentEl).find("h3").text().trim()
                              let salary = $(parentEl).find("td:nth-child(2)>p").text().trim()
                              let location = $(parentEl).find("td:nth-child(3)>p").text().trim()
                              let updatedOn = $(parentEl).find("td:nth-child(5)>div>p").text().trim()
                              let url = $(parentEl).find("a").attr().href
                              let newUrl = url.replace('..', '');
                              let source = `https://web3.career${newUrl}`

                              const { data } = await axios.get(source)
                              const $$ = cheerio.load(data)

                              $$(elemetSelect).each(async (childIdx, childEl) => {
                                    let caption = $(childEl).find("header > div:nth-child(1) > h1").text().replace("\n", "")
                                    let requirements = $(childEl).find("div.text-dark-grey-text.p-2.p-md-0 > p").text().replace("\n", "")
                                    let roleResponsibilities = $(childEl).find("ul:nth-child(5)").text().replace("\n", "")
                                    let qualification = $(childEl).find("ul:nth-child(7)").text().replace("\n", "")
                                    let extraSkills = $(childEl).find("ul:nth-child(9)").text().replace("\n", "")
                                    await Jobs.findOneAndDelete({ role, company, location, salary }).then(job => {
                                          if (job) {
                                                job.remove().then(() => {
                                                      new Jobs({
                                                            role,
                                                            company,
                                                            location,
                                                            salary,
                                                            caption,
                                                            requirements,
                                                            roleResponsibilities,
                                                            qualification,
                                                            extraSkills
                                                      }).save()
                                                })
                                          }
                                          else {
                                                new Jobs({
                                                      role,
                                                      company,
                                                      location,
                                                      salary,
                                                      caption,
                                                      requirements,
                                                      roleResponsibilities,
                                                      qualification,
                                                      extraSkills,
                                                      source,
                                                      updatedOn
                                                }).save()
                                          }


                                    })
                              })

                        })
                        currentPage = nextPageNo;
                  })
            }
      } catch (error) {
            console.error(error)
      }
}