import mongoose from "mongoose"
import dotenv from "dotenv"
import {skipTheDriveWeb3,skipTheDriveBlockchain} from "./src/skipTheDrive.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      skipTheDriveBlockchain().then(skipTheDriveWeb3())
})