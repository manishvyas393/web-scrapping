import axios from "axios";
import * as cheerio from "cheerio";

async function fourDayWeekJob() {
      try {
            const { data } = await axios.get("https://4dayweek.io/")
            const $ = cheerio.load(data)
            const listContainer = "#remote-software-jobs"
            $(listContainer).map((parentIdx, parentEl) => {
                  const company = $(parentEl).find("div> div.row.job-tile > div.job-tile-left.col-sm-8 > div.row.job-tile-company").text()
                  const role = $(parentEl).find("div> div.row.job-tile > div.job-tile-left.col-sm-8 > div.row.job-tile-title > h3 > a").text()
                  const location = $(parentEl).find("div> div.row.job-tile > div.job-tile-left.col-sm-8 > ul > li:nth-child(2)").text()
                  const workTime = $(parentEl).find("div> div.row.job-tile > div.job-tile-left.col-sm-8 > ul > li:nth-child(1) > span").text()
                  const postedOn = $(parentEl).find("div> div.row.job-tile > div.job-tile-right.col-sm-4 > p").text()
                  const details = $(parentEl).find("div> div.row.job-tile > div.job-tile-left.col-sm-8 > div.row.job-tile-company > h5 > a").attr().href
                  console.log(company)
            });
      } catch (error) {
            
      }
}
fourDayWeekJob()