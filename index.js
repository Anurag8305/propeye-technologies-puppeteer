const puppeteer = require("puppeteer");

const url =
	"https://in.indeed.com/jobs?q=software+developer&l=&from=searchOnHP&vjk=10399eacdabd0c6a";
async function grab() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url);
	const mainDiv = await page.evaluate(() => {
		const element = Array.from(
			document.querySelectorAll(
				'#mosaic-provider-jobcards > ul > li:nth-child(1) > div'
			)
		);
        let arr=[];
        mainDiv.forEach((el)=>{
            arr.push(el.innerHTML)
        })
		return arr;
	});
	console.log(mainDiv);
	await browser.close();
}
grab();
