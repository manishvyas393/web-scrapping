import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
async function flexJobs() {
      try {
            const { data } =await axios.get("https://www.flexjobs.com/search?search=blockchain")
            const $ = cheerio.load(data)
            const element = "#content-main > div.row > div > div>#job-list>li>div"
            $(element).each((parentIdx, parentEl) => {
                  const role = $(parentEl).find("div > div:nth-child(1) > div.col.text-nowrap.pr-0 > a").text().trim()
                  const location = $(parentEl).find("div.row.align-items-center.mb-2 > div.col-sm-auto.pr-sm-0.job-tags > span:nth-child(1)").text()
                  const contract = $(parentEl).find("div.row.align-items-center.mb-2 > div.col-sm-auto.pr-sm-0.job-tags > span:nth-child(2)").text()
                  const location2 = $(parentEl).find("div.row.align-items-center.mb-2 > div.col.pr-0.job-locations.text-truncate").text().trim()
                  console.log(location2);
            })

            
      } catch (error) {
            
      }
}
flexJobs()