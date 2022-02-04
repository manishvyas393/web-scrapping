import mongoose from "mongoose"
import dotenv from "dotenv"
import {powerToflyBlockChain, powerToflyWeb3 } from "./src/powerToFly.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      powerToflyBlockChain().then(()=>powerToflyWeb3())
})