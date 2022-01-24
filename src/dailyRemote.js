import axios from "axios";
import * as cheerio from "cheerio";

async function dailyRemote() {
      try {
            const { data } = await axios.get("https://dailyremote.com/remote-jobs?search=crypto&page=1#main")
            const $ = cheerio.load(data)
            const JobList = "#main > div > div > div.content > div.card-container> div:nth-child(3)>article> div.info-container > div > div.profile-information"
            $(JobList).each(async(parentIdx, parentEl) => {
                  const role = $(parentEl).find("div> h2 > a").text()
                  const company = $(parentEl).find("div:nth-child(1) > div.company-name > a").text()
                  const location = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span:nth-child(2)>span").text()
                  const field = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span.job-category").text().replace("\n", "").trim()
                  const postedOn = $(parentEl).find("div.job-meta.display-flex.items-center.flex-wrap > span:nth-child(1)").text()
                  const detailsLink = $(parentEl).find("div> h2 > a").attr("href")

                  const { data } = await axios.get(`https://dailyremote.com${detailsLink}`);
                  const $$ = cheerio.load(data)
                  const jobDetail = "body > div.detailed-job-main-container > div.detailed-job-wrapper > div.detailed-job > div.detailed-job-body"
                  $$(jobDetail).each((childIdx, childEl) => {
                        const desc = $$(childEl).find("div > div.job-full-description").contents()
                              .filter(function () {
                                    return this.type === "text";
                              }).text()
                        console.log(desc)
                  })
            })
      } catch (error) {

      }
}
dailyRemote()