import mongoose from "mongoose"
import dotenv from "dotenv"
import remoteCoBlockchain from "./src/remoteCoBlockchain.js"
import remoteCoWeb3 from "./src/remoteCoWeb3.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      remoteCoBlockchain().then(()=>remoteCoWeb3())
})