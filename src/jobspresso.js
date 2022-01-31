import axios from "axios";
import * as cheerio from "cheerio";
import Jobs from "../models/jobs.js"
async function jobPresso() {
      try {
            const data = await axios.post("https://jobspresso.co/jm-ajax/get_listings/", {
                  "headers": {
                        "accept": "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                        "cookie": "tk_or=%22https%3A%2F%2Fwww.google.com%2F%22; tk_r3d=%22https%3A%2F%2Fwww.google.com%2F%22; _ga=GA1.2.2102877292.1643631681; _gid=GA1.2.1538459642.1643631681; __hstc=24215717.5113e27790315e8a73439604a4095f4c.1643631683623.1643631683623.1643631683623.1; hubspotutk=5113e27790315e8a73439604a4095f4c; __hssrc=1; tk_lr=%22%22; __hssc=24215717.4.1643631683623",
                        "Referer": "https://jobspresso.co/remote-work/",
                        "Referrer-Policy": "no-referrer-when-downgrade"
                  },
                  "body": "lang=&search_keywords=blockchain&search_location=&filter_job_type%5B%5D=designer&filter_job_type%5B%5D=developer&filter_job_type%5B%5D=devops&filter_job_type%5B%5D=marketing&filter_job_type%5B%5D=product-mgmt&filter_job_type%5B%5D=sales&filter_job_type%5B%5D=support&filter_job_type%5B%5D=various&filter_job_type%5B%5D=writing&filter_job_type%5B%5D=&per_page=30&orderby=featured&order=DESC&page=1&show_pagination=false&form_data=search_keywords%3Dblockchain%26search_location%3D%26filter_job_type%255B%255D%3Ddesigner%26filter_job_type%255B%255D%3Ddeveloper%26filter_job_type%255B%255D%3Ddevops%26filter_job_type%255B%255D%3Dmarketing%26filter_job_type%255B%255D%3Dproduct-mgmt%26filter_job_type%255B%255D%3Dsales%26filter_job_type%255B%255D%3Dsupport%26filter_job_type%255B%255D%3Dvarious%26filter_job_type%255B%255D%3Dwriting%26filter_job_type%255B%255D%3D",
            })
            console.log(data.data.html)
            // const $ = cheerio.load(html)
            // const element = "#odindex>div.bubble-element.Group.bubble-r-container.flex.row>div>div.bubble-element.Group.bubble-r-container.flex.column"
            // console.log($(element).html())
            // $(element).each((parentIdx, parentEl) => {
            //       const role = $(parentEl).html()
            // })
            
      }
      catch (err) {
            console.log(err)
      }
}
jobPresso()