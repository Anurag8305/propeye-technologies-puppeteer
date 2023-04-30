const puppeteer=require("puppeteer");


(async()=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    await page.goto("https://in.indeed.com/");
    await page.type("#text-input-what","Software Developer",{delay:100});
    await page.click("#jobsearch > button")
    const grab=await page.evaluate(()=>{
        const allData=Array.from(document.querySelectorAll("#mosaic-provider-jobcards > ul > li > div a"));
        const company_name=document.querySelectorAll("#mosaic-provider-jobcards > ul > li > div > div > div > div.slider_item.css-kyg8or.eu4oa1w0 > div > table.jobCard_mainContent.big6_visualChanges > tbody > tr > td > div.heading6.company_location.tapItem-gutter.companyInfo > span");
        const location=document.querySelectorAll("#mosaic-provider-jobcards > ul > li > div > div > div > div.slider_item.css-kyg8or.eu4oa1w0 > div > table.jobCard_mainContent.big6_visualChanges > tbody > tr > td > div.heading6.company_location.tapItem-gutter.companyInfo > div > div");
        const date=document.querySelectorAll("#mosaic-provider-jobcards > ul > li > div > div > div > div.slider_item.css-kyg8or.eu4oa1w0 > div > table.jobCardShelfContainer.big6_visualChanges > tbody > tr.underShelfFooter > td > div > span > span");;
        const desc=document.querySelectorAll("#mosaic-provider-jobcards > ul > li > div a");;
        let arr=[]
        const data=company_name.map((el)=>{
            arr.push(el.innerText)
        })
        
        return arr;
    })

    
    console.log(grab);
    //await browser.close();
})()

