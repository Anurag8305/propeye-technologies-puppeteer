
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
// const { executablePath }:any = require("puppeteer")
const url = "https://in.indeed.com/";
const main = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url);
	await page.screenshot({ path: "bot.png", fullPage: true });
	await page.type("#text-input-what", "Software Developer");
	await page.click("[type=submit]");
	await page.waitForTimeout(5000);

	const grab = await page.evaluate(() => {
		const allData = document.querySelectorAll(
			"#mosaic-provider-jobcards > ul > li > div > a"
		);
		const heading = document.querySelectorAll(
			"#mosaic-provider-jobcards > ul > li"
		);
		let arr = [];
		heading.forEach((el) => {
			let a = el.innerText;
			a = a.trim().split("\n");
            let temp1="",temp2="";
            for(let i=4;i<a.length;i++){
                temp1=temp1+a[i]+"."
            }
            for(let i=3;i<a.length;i++){
                temp2=temp2+a[i]+"."
            }
			let obj = {
				heading: a[0],
				comapny_name: a[1] == "new" ? a[2] : a[1],
				location: a[1] == "new" ? a[3] : a[2],
				description: a[1] == "new" ? temp1:temp2
			};
			arr.push(obj);
		});

		return arr;
	});

	console.log(grab);
	await browser.close();
};

main();
