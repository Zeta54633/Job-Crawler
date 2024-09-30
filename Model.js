'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobPostingSchema = new Schema(
    {
        WebsiteName: {
            required: true,
            type: String,
        },
        JobTitle: {
            required: true,
            type: String,
        },
        CompanyName: {
            required: true,
            type: String,
        },
        Experience: {
            required: true,
            type: String,
        },
        Salary: {
            required: true,
            type: String,
        },
        Location: {
            required: true,
            type: String,
        },
    }
);

const JobPosting = mongoose.model("JobPosting", JobPostingSchema);

export default JobPosting;