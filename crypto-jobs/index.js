import axios from "axios";
import * as cheerio from "cheerio"

async function getCryptoJobs() {

      try {
            let currentPage = 1;

            for (let i = currentPage; i <= currentPage; i++) {
                  const url = `https://crypto.jobs/?page=${currentPage}`
                  const { data } = await axios.get(url)
                  const $ = cheerio.load(data)
                  const element = "#app > div > div > div.col-md-8 > div > div.panel-body > table > tbody > tr";
                  const nextpage = "#app > div > div > div.col-md-8 > div > div.panel-footer > ul>li:last-child"

                  $(nextpage).each((linkIdx, Linkel) => {
                        console.log("data fetched from:", url);
                        let nextPageNo = parseInt($(Linkel).find("a.page-link").attr().href.replace("http://crypto.jobs?page=", ""))
                        console.log(nextPageNo)

                        $(element).each(async (parentIdx, parentChild) => {
                              if (parentIdx > 0) {
                                    let role = $(parentChild).find("td:nth-child(2) > a > p").text()
                                    let company = $(parentChild).find("td:nth-child(2) > a > span").text()
                                    let type = $(parentChild).find("td:nth-child(2) > a > div > small > span:nth-child(1)").text().trim()
                                    let field = $(parentChild).find("td:nth-child(2) > a > div > small > span:nth-child(2)").text().trim()
                                    let location = $(parentChild).find("td:nth-child(3) > .pull-right>a:nth-child(1)").text().trim()
                                    let posted = $(parentChild).find("td:nth-child(3) > div > small > span > span").text().trim()
                                    let link = $(parentChild).find("td:nth-child(2) > a").attr("href").trim().replace("\n", "")
                                    const { data } = await axios.get(link)
                                    const $$ = cheerio.load(data)
                                    const detailSelector = "#app > div > div > div.col-md-8 > div.panel.panel-default"
                                    $$(detailSelector).each((childIdx, childEl) => {
                                          const detail = $$(childEl).find("p").text()
                                          console.log(detail)
                                    })

                              }

                        })
                        currentPage = nextPageNo;
                  })
            }
      } catch (error) {

      }

}
getCryptoJobs();