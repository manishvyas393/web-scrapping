import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs"

async function GetJobDEtails() {
      try {
            const url = "https://web3.career"
            const { data } = await axios.get(url)
            const $ = cheerio.load(data)
            const ElementSelector = "body > main > div > div > div > div:nth-child(4) > table > tbody > tr";
            let keys = [
                  "JobRole",
                  "Company",
                  "WorkFrom",
                  "Tags",
                  "posted",
            ]
            $(ElementSelector).each((idx, el) => {
                  let keyindx = 0
                  const abc = {}
                  $(el).map((childIdx, childEl) => {
                        let text = $(childEl).find("h2,h3,p").text()
                        text = text.trim();
                        var str = text.replace(/(\r\n|\n|\r|\t)/gm, " ");
                        var newStr = str.replace(/[^\x20-\x7E]/gmi, "");;
                        console.log(newStr,"\n")

                  })
            })

      } catch (error) {
            console.error(error)
      }
}
GetJobDEtails()