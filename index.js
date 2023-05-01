const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
puppeteer.use(StealthPlugin());

// URL of the website which we want to scrape.
const url = "https://in.indeed.com/";
const main = async (query) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url);
	await page.screenshot({ path: "bot.png", fullPage: true });
	// query which we ant to pass. Here it is "Software Developer".It can be changed to Data Analytics or any other.
	await page.type("#text-input-whaa", query);
	//Clicks on the submit button on indeed.com
	await page.click("[type=submit]");
	await page.waitForTimeout(5000);
	const grab = await page.evaluate(() => {
		//Catches all the job listing as per the query
		const heading = document.querySelectorAll(
			"#mosaic-provider-jobcards > ul > li"
		);
		let arr = [];
		heading.forEach((el) => {
			let a = el.innerText;
			a = a.trim().split("\n");
			let temp1 = "",
				temp2 = "";
			for (let i = 4; i < a.length; i++) {
				temp1 = temp1 + a[i] + ".";
			}
			for (let i = 3; i < a.length; i++) {
				temp2 = temp2 + a[i] + ".";
			}
			let obj = {
				heading: a[0],
				comapny_name: a[1] == "new" ? a[2] : a[1],
				location: a[1] == "new" ? a[3] : a[2],
				description: a[1] == "new" ? temp1 : temp2,
			};
			arr.push(obj);
		});
		return arr;
	});

	console.log(grab);
	await browser.close();
	//saves the file as per the name given.
	fs.writeFile("data.json", JSON.stringify(grab), (err) => {
		if (err) console.log(err);
		else console.log("Successfully saved JSON");
	});
};

// Pass the query here such as the job-title which you want to scrape the data for.
main("Software Developer");
