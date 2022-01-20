
import mongoose from "mongoose"

const cryptoJobsDetailSchema = new mongoose.Schema({
      role: {
            type: String,
      },
      company: {
            type: String,
      },
      type: {
            type: String,
      },
      field: {
            type: String
      },

      location: {
            type: String
      },
      details: {
            type: String
      },
      source: {
            type: String
      },
      upDatedOn: {
            type: String
      },
      createdon: {
            type: Date,
            default: Date.now()
      },
      active: {
            type: Number,
            default: 1
      }


})
const cryptoJobsDetail = mongoose.model("crypto_job_detail_news", cryptoJobsDetailSchema)
export default cryptoJobsDetail