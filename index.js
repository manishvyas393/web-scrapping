import mongoose from "mongoose"
import dotenv from "dotenv"
import {stackOverFlowWeb3,stackOverFlowBlockchain} from "./src/stackOverFlow.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      stackOverFlowWeb3().then(()=>stackOverFlowBlockchain())
})