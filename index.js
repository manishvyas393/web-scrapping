import mongoose from "mongoose"
import dotenv from "dotenv"
import getCryptoJobs from "./src/cryoto-jobs.js"
import getJobDetails from "./src/getJobDetails.js"
import dailyRemote from "./src/dailyRemote.js"
import workAna from "./src/workana.js"
import weLoveGolangWeb3 from "./src/welovegolangWeb3.js"
import weLoveGolangBlockchain from "./src/welovegolangBlockchain.js"
dotenv.config()
mongoose.connect(process.env.Db_Url,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
weLoveGolangBlockchain()
})