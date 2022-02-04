import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"
export async function powerToflyBlockChain() {
      const { data } = await axios.get("https://powertofly.com/jobs/?keywords=%22Blockchain%22&location=")
      const $ = cheerio.load(data);
      const element = "#jobs-list> div.infinite-scroll-jobs-list > div>a > div.body";
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.title").text().trim()
            const company = $(parentEl).find("div.info > span.company").text().trim()
            const location = $(parentEl).find("div.info > span.location").text().trim().split("and")[0].replaceAll(/\s/g,"")
            const link = $(parentEl).find("div.info").parents("a").attr("href")
            const source = `https://powertofly.com${link}`
            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const el = "#job-description"
            const details = $$(el).html()
            await Jobs.findOneAndDelete({ role, company, location, source ,details}).then(job => {
                  if (job) {
                        job.remove().then(() => {
                              new Jobs({
                                    role,
                                    company,
                                    location,
                                    source,
                                    details,
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
                        }).save().then(() => console.log("job added"))
                  }


            })
      })
}

export async function powerToflyWeb3() {
      const { data } = await axios.get("https://powertofly.com/jobs/?keywords=web3&location=")
      const $ = cheerio.load(data);
      const element = "#jobs-list> div.infinite-scroll-jobs-list > div>a > div.body";
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.title").text().trim()
            const company = $(parentEl).find("div.info > span.company").text().trim()
            const location = $(parentEl).find("div.info > span.location").text().trim().split("and")[0].replaceAll(/\s/g, "")
            const link = $(parentEl).find("div.info").parents("a").attr("href")
            const source = `https://powertofly.com${link}`
            console.log(source)
            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const el = "#job-description"
            const details = $$(el).html()
            await Jobs.findOneAndDelete({ role, company, location, source, details }).then(job => {
                  if (job) {
                        job.remove().then(() => {
                              new Jobs({
                                    role,
                                    company,
                                    location,
                                    source,
                                    details,
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
                        }).save().then(() => console.log("job added"))
                  }


            })
      })
}

