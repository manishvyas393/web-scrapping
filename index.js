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
                  let jobRole = $(el).find("h2").text().trim()
                  let company = $(el).find("h3").text().trim()
                  let salary = $(el).find("td:nth-child(2) > p").text().trim()
                  let jobType = $(el).find("td:nth-child(3) > p").text().trim()
                  await Jobs.findOne({ jobRole, company,jobType,salary }).then(job => {
                        if (job) {
                              console.log(job)
                        }
                        else {
                              new Jobs({
                                    jobRole, company, jobType, salary
                              }).save().then(() => {
                                    console.log("saved")
                              })
                        }
                              
                  })

                  // let url = $(el).find("a").attr().href
                  // let newUrl = url.replace('..', '');
                  // const { data } = await axios.get(`https://web3.career${newUrl}`)
                  // const $$ = cheerio.load(data)
                  // $$(elemetSelect).each((id, ell) => {
                  //       let value = $$(ell).text()
                  //       console.log(value)
                  // })


            })

      } catch (error) {
            console.error(error)
      }
}
getJobDetails();