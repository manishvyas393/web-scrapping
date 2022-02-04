import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"

export async function remoteGameJobs() {
      const { data } = await axios.get("https://remotegamejobs.com/search?query=blockchain")
      const $ = cheerio.load(data);
      const element = "#search-listings > div>div> a > article ";
      $(element).each(async (parentIdx, parentEl) => {
            const role = $(parentEl).find("div.media-content > div > div > div.column.is-6 > strong").first().contents().filter(function () {
                  return this.type === 'text';
            }).text().trim().replaceAll(" ", "")
            const company = $(parentEl).find("div.media-content > div > div > div.column.is-6 > small").text()
            const location = $(parentEl).find("div.media-content > div > div > div.column.f-20.is-hidden-mobile > strong > span").text().trim()
            const source = $(parentEl).find("div.media-content").parents("a").attr("href")

            const { data } = await axios.get(source)
            const $$ = cheerio.load(data)
            const el = "body > section.section > div > div > div.column.is-three-quarters > div:nth-child(1)"
            const details = $$(el).find("div").html()
            await Jobs.findOneAndDelete({ role, company, location, source }).then(job => {
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
