import express from 'express';
import getJobfromNet from '../WebScrapper.js';
import JobPosting from '../Model.js'; // Import your JobPosting model

const router = express.Router();

// API endpoint to get job postings by job title
router.get('/getJobs', async (req, res) => {
    const jobTitle = req.query.title; // Get job title from query parameter
    console.log("Job Title is: " + jobTitle);

    try {
        // Search for jobs with a matching job title (case-insensitive)
        const jobs = await getJobfromNet(jobTitle);

        // Save each job posting to the database
        for (const job of jobs) {
            const jobPosting = new JobPosting({
                WebsiteName: job.website,
                JobTitle: job.jobTitle,
                CompanyName: job.companyName,
                Experience: job.experience,
                Salary: job.salary,
                Location: job.location,
            });

            await jobPosting.save(); // Save the job posting
        }

        // Respond with the found jobs
        res.status(200).json(jobs);
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: 'Unable to fetch jobs', details: err.message });
    }
});

export default router;
