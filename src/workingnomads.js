import axios from "axios";
import Jobs from "../models/jobs.js"
export default async function workingNoMads() {
      const { data } = await axios.get("https://www.workingnomads.com/jobsapi/job/_search?sort=expired:asc,premium:desc,pub_date:desc&_source=company,category_name,description,location_base,salary_range,salary_range_short,instructions,id,external_id,slug,title,pub_date,tags,source,apply_url,premium,expired,use_ats,position_type&size=50&from=0&q=blockchain*", {
            "headers": {
                  "accept": "application/json, text/plain, */*",
                  "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Linux\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin"
            },
            "referrer": "https://www.workingnomads.com/jobs",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "mode": "cors",
            "credentials": "include"
      })
      data.hits.hits.map(async (el) => {
            await Jobs.findOneAndDelete({
                  role: el._source.title,
                  company: el._source.company,
                  location: el._source.location_base,
                  field: el._source.category_name,
                  upDatedOn: el._source.pub_date,
                  apply_url: el._source.apply_url,
                  details: el._source.description,
                  salary: el._source.salary_range_short,
                  contract: el._source.position_type
            }).then(job => {
                  if (job) {
                        job.remove().then(() => {
                              new Jobs({
                                    role: el._source.title,
                                    company: el._source.company,
                                    location: el._source.location_base,
                                    field: el._source.category_name,
                                    upDatedOn: el._source.pub_date,
                                    apply_url: el._source.apply_url,
                                    details: el._source.description,
                                    salary: el._source.salary_range_short,
                                    contract: el._source.position_type

                              }).save().then(() => {
                                    console.log("updated")
                              })
                        })
                  }
                  else {
                        new Jobs({
                              role: el._source.title,
                              company: el._source.company,
                              location: el._source.location_base,
                              field: el._source.category_name,
                              upDatedOn: el._source.pub_date,
                              apply_url: el._source.apply_url,
                              details: el._source.description,
                              salary: el._source.salary_range_short,
                              contract: el._source.position_type

                        }).save().then(() => {
                              console.log("saved")
                        })

                  }
            })
      })

}
