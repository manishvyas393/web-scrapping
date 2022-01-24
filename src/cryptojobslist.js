import axios from "axios";
import * as cheerio from "cheerio";

async function getCryptoJobsList1() {
      const { data } = await axios.get("https://cryptojobslist.com/remote/blockchain-jobs")
      const $ = cheerio.load(data)
      const list = "#__next > article > ul:nth-child(8)>li"
      $(list).each(async(parentIdx, parentChild) => {
            const role = $(parentChild).find("span.JobPreviewInline_meta__QY7ya > a:first-child").text()
            const company = $(parentChild).find("span.JobPreviewInline_meta__QY7ya > a:nth-child(2)").text()
            const location = $(parentChild).find("span.JobPreviewInline_meta__QY7ya > span:nth-child(4)").text()
            const paymentMethod = $(parentChild).find("span.JobPreviewInline_meta__QY7ya > span:nth-child(5)").text()
            const upDatedOn = $(parentChild).find("span.JobPreviewInline_createdAt__3GInC").text()
            const link = $(parentChild).find("span.JobPreviewInline_meta__QY7ya > a:first-child").attr("href")
            const { data } = await axios.get(`https://cryptojobslist.com/${link}`)
            const $$ = cheerio.load(data)
            const details = "#__next > main"
            $$(details).each((childIdx, childEl) => {
                  // let desc = $(childEl).find("div:nth-child(3) > div> div.JobView_companyAbout__Vh2eb > p").text()
                  // if ($(childEl).find("#st-jobDescription > div > p:nth-child(1)")) {
                  //       desc= $(childEl).find("#st-jobDescription > div > p:nth-child(1)").text()
                  // }
                  let description = $(childEl).find("div:nth-child(3) > div> div.JobView_description__3IbkT > div").text()
                  console.log(description)
            })
      })
}
// async function getCryptoJobsList2() {
//       const { data } = await axios.get("https://cryptojobslist.com/remote/blockchain-jobs")
//       const $ = cheerio.load(data)
//       const list = "#__next > article > ul:nth-child(8)"
//       $(list).each((parentIdx, parentChild) => {
//             const role = $(parentChild).find("div > li> span.JobPreviewInline_meta__QY7ya > a.JobPreviewInline_jobTitle__lUeG_").text()
//             const company = $(parentChild).find("li> span.JobPreviewInline_meta__QY7ya > a:nth-child(2)").text()
//             const location = $(parentChild).find("li> span.JobPreviewInline_meta__QY7ya > span:nth-child(4)").text()
//             const paymentMethod = $(parentChild).find("li> span.JobPreviewInline_meta__QY7ya > span:nth-child(5)").text()
//             const upDatedOn = $(parentChild).find("li> span.JobPreviewInline_createdAt__3GInC").text()
//             console.log(role)
//       })
// }
getCryptoJobsList1()