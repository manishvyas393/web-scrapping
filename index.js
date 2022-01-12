import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose"
import Jobs from "./models/jobs.js"
mongoose.connect("mongodb+srv://manish393:manish393@cluster0.t5wpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => console.log("connected"))
async function getJobDetails() {
      try {
            const url = "https://web3.career"
            const { data } = await axios.get(url, { ignoreWhitespace: true })
            const $ = cheerio.load(data)
            const ElementSelector = "body > main > div > div > div > div:nth-child(4) > table > tbody > tr";
            const elemetSelect = "body > main > div > div > div.mx-auto"

            $(ElementSelector).each(async (idx, el) => {
                  let role = $(el).find("h2").text().trim()
                  let company = $(el).find("h3").text().trim()
                  let salary = $(el).find("td:nth-child(2) > p").text().trim()
                  let location = $(el).find("td:nth-child(3) > p").text().trim()
                  let url = $(el).find("a").attr().href
                  let newUrl = url.replace('..', '');
                  const { data } = await axios.get(`https://web3.career${newUrl}`)
                  const $$ = cheerio.load(data)
                  $$(elemetSelect).each(async (id, ell) => {
                        let caption = $(ell).find("header > div:nth-child(1) > h1").text()
                        let requirements = $(ell).find("div.text-dark-grey-text.p-2.p-md-0 > p").text().trim()
                        let roleResponsibilities = $(ell).find("ul:nth-child(5)").text().trim()
                        let qualification = $(ell).find("ul:nth-child(7)").text().trim()
                        let extraSkills = $(ell).find("ul:nth-child(9)").text().trim()
                        await Jobs.findOne({ role, company, location, salary }).then(job => {
                              if (job) {
                                    console.log(job)
                              }
                              else {
                                    new Jobs({
                                          role, company, location, salary, caption, requirements, roleResponsibilities, qualification, extraSkills
                                    }).save().then(() => {
                                          console.log("saved")
                                    })
                              }

                        })
                  })
            })
      } catch (error) {
            console.error(error)
      }
}
getJobDetails();