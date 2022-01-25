import mongoose from "mongoose"

const jobsDetailSchema = new mongoose.Schema({
      role: {
            type: String,
            default: ""
      },
      company: {
            type: String,
            default: ""
      },
      location: {
            type: String,
            default: ""
      },
      type: {
            type: String,
            default: ""
      },
      field: {
            type: String,
            default: ""
      },
      bids: {
            type: String,
            default:""
      },
      details: {
            type: String,
            default: ""
      },
      contract: {
            type: String,
            default: ""
      },
      salary: {
            type: String,
            default: ""
      },
      caption: {
            type: String,
            default: ""
      },
      requirements: {
            type: String,
            default: ""
      },
      roleResponsibilities: {
            type: String,
            default: ""
      },
      qualification: {
            type: String,
            default: ""
      },
      extraSkills: {
            type: String,
            default: ""
      },
      source: {
            type: String,
            default: ""
      },
      updatedOn: {
            type: String,
            default: ""
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