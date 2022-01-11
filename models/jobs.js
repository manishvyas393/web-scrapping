import mongoose from "mongoose"

const jobsDetailSchema = new mongoose.Schema({
      JobRole: {
            type: String,
      },
      company: {
            type: String,
      },
      workfrom: {
            type:String
      },
      salary: {
            type: String,
      }
})
const jobDetails = mongoose.model("job_detail",jobsDetailSchema)
export default jobDetails