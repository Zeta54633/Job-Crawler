import puppeteer from 'puppeteer';

async function scrapeJobs(website, url) {
    const browser = await puppeteer.launch({ headless: false }); // Running in non-headless for debugging
    const page = await browser.newPage();

    console.log(`Scraping jobs from ${website} at ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    let selector;
    if (website === "Naukri.com") {
        selector = '.srp-jobtuple-wrapper'; // Naukri.com job container selector
    } else {
        console.error(`No selectors defined for website: ${website}`);
        await browser.close();
        return [];
    }

    // Wait for job listings container
    await page.waitForSelector(selector);

    // Scrape job listings
    const jobs = await page.evaluate((website) => {
        const jobList = [];
        document.querySelectorAll('.srp-jobtuple-wrapper').forEach(jobElement => {
            const jobTitle = jobElement.querySelector('.title')?.innerText.trim();
            const companyName = jobElement.querySelector('.comp-name')?.innerText.trim();
            const experience = jobElement.querySelector('.expwdth')?.innerText.trim();
            const salary = jobElement.querySelector('.sal-wrap span')?.innerText.trim();
            const location = jobElement.querySelector('.locWdth')?.innerText.trim();
            const jobDescription = jobElement.querySelector('.job-desc')?.innerText.trim();

            // Debugging missing elements
            if (!jobTitle) console.log(`Missing job title on ${website}!`);
            if (!companyName) console.log(`Missing company name on ${website}!`);
            if (!experience) console.log(`Missing experience on ${website}!`);
            if (!salary) console.log(`Missing salary on ${website}!`);
            if (!location) console.log(`Missing location on ${website}!`);
            if (!jobDescription) console.log(`Missing job description on ${website}!`);

            if (jobTitle) {
                jobList.push({
                    website,
                    jobTitle,
                    companyName,
                    experience,
                    salary,
                    location,
                    jobDescription
                });
            }
        });
        return jobList;
    }, website);

    await browser.close(); // Close the browser
    return jobs; // Return the scraped jobs
}

export default async function getJobfromNet(jobTitle) {
    const url = `https://www.naukri.com/${jobTitle.toLowerCase().replace(/\s+/g, '-')}-jobs`;
    console.log("URL: " + url);
    const website = "Naukri.com";

    try {
        const jobs = await scrapeJobs(website, url); // Await the async function
        //console.log(jobs);
        return jobs; // Return the jobs
    } catch (error) {
        console.error('Error while scraping:', error);
        return []; // Return an empty array on error
    }
}

// Example usage
// getJobfromNet("Data Analyst");
