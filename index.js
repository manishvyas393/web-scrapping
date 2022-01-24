import mongoose from "mongoose"
import dotenv from "dotenv"
import getCryptoJobs from "./src/cryoto-jobs.js"
import getJobDetails from "./src/getJobDetails.js"
import dailyRemote from "./src/dailyRemote.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
dailyRemote()
})