import mongoose from "mongoose"

const jobsDetailSchema = new mongoose.Schema({
      role: {
            type: String,
      },
      company: {
            type: String,
      },
      location: {
            type: String
      },
      salary: {
            type: String,
      },
      caption: {
            type:String,
      },
      requirements: {
            type: String
      },
      roleResponsibilities: {
            type: String,
      },
      qualification: {
            type: String,
      },
      extraSkills: {
            type: String,
      }


})
const jobDetails = mongoose.model("job_detail", jobsDetailSchema)
export default jobDetails