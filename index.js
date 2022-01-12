import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv"
import mongoose from "mongoose"
import Jobs from "./models/jobs.js"
dotenv.config()
mongoose.connect(process.env.Db_Url, () => console.log("connected"))
async function getJobDetails() {
      try {
            let currentPage = 1;

            for (let i = currentPage; i <= currentPage; i++) {
                  console.log(currentPage)
                  const url = `https://web3.career/?page=${i}`
                  const { data } = await axios.get(url, { ignoreWhitespace: true })
                  const $ = cheerio.load(data)
                  const ElementSelector = "body > main > div > div > div > div:nth-child(4) > table > tbody > tr";
                  const elemetSelect = "body > main > div > div > div.mx-auto"
                  const nextPage = "body > main > div > div > div > div.px-3 > div > nav.pagy-bootstrap-nav > ul";
                  $(nextPage).each((idx, el) => {
                        let nextPageNo = parseInt($(el).find("li.page-item.next>a").attr().href.replace("/?page=", ""))
                        $(ElementSelector).each(async (idx, el) => {
                              let role = $(el).find("h2").text().trim()
                              let company = $(el).find("h3").text().trim()
                              let salary = $(el).find("td:nth-child(2)>p").text().trim()
                              let location = $(el).find("td:nth-child(3)>p").text().trim()
                              let updatedOn = $(el).find("td:nth-child(5)>div>p").text().trim()
                              let url = $(el).find("a").attr().href
                              let newUrl = url.replace('..', '');
                              let source = `https://web3.career${newUrl}`
                              const { data } = await axios.get(source)
                              const $$ = cheerio.load(data)

                              $$(elemetSelect).each(async (id, ell) => {
                                    let caption = $(ell).find("header > div:nth-child(1) > h1").text().replace("\n", "")
                                    let requirements = $(ell).find("div.text-dark-grey-text.p-2.p-md-0 > p").text().replace("\n", "")
                                    let roleResponsibilities = $(ell).find("ul:nth-child(5)").text().replace("\n", "")
                                    let qualification = $(ell).find("ul:nth-child(7)").text().replace("\n", "")
                                    let extraSkills = $(ell).find("ul:nth-child(9)").text().replace("\n", "")
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
getJobDetails();