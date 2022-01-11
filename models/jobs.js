import mongoose from "mongoose"

const jobsDetailSchema = new mongoose.Schema({
      jobRole: {
            type: String,
      },
      company: {
            type: String,
      },
      jobType: {
            type:String
      },
      salary: {
            type: String,
      }
})
const jobDetails = mongoose.model("job_detail",jobsDetailSchema)
export default jobDetails