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
            type: String,
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
      },
      source: {
            type: String
      },
      updatedOn: {
            type:String
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
const jobDetails = mongoose.model("job_detail_news", jobsDetailSchema)
export default jobDetails