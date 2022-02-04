import axios from "axios";
import Jobs from "../models/jobs.js"
import * as cheerio from "cheerio"

async function powerTofly() {
      const { data } = await axios.get("https://powertofly.com/jobs/?keywords=%22Blockchain%22&location=")
      const $ = cheerio.load(data);
      const element = "#jobs-list> div.infinite-scroll-jobs-list > div";
      $(element).each((parentIdx, parentEl) => {
            const role = $(parentEl).find("a > div.body > div.title").text().trim()
            console.log(role)
      })
}
powerTofly()