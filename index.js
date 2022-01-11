import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://manish393:manish393@cluster0.t5wpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => console.log("connected"))
async function getJobDetails() {
      try {
            const url = "https://web3.career"
            const { data } = await axios.get(url)
            const $ = cheerio.load(data)
            const ElementSelector = "body > main > div > div > div > div:nth-child(4) > table > tbody > tr";
            const elemetSelect = "body > main > div > div > div.mx-auto"

            $(ElementSelector).each(async (idx, el) => {

                  let text = $(el).html()
                  console.log(text)
                  // var str = text.replace(/(\r\n|\n|\r|\t)/gm, "");


                  // let url = $(el).find("a").attr().href
                  // let newUrl = url.replace('..', '');
                  // const { data } = await axios.get(`https://web3.career${newUrl}`)
                  // const $$ = cheerio.load(data)
                  // $$(elemetSelect).each((id, ell) => {
                  // let value = $$(ell).text()
                  // console.log(value)
                  // })


            })

      } catch (error) {
            console.error(error)
      }
}
getJobDetails();