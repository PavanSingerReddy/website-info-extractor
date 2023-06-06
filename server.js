import express from "express"
import axios from "axios"

import { parse } from "node-html-parser"

//below two lines of code is for using both import and require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cors = require('cors')



if (process.env.NODE_ENV !== "production") {

    const dotenv = require('dotenv')

    dotenv.config()

}


const app = express()
const port = process.env.PORT


app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {

    res.send("do post request using api key")

    console.log("got GET request")

})


app.post('/:apikey', async (req, res) => {


    console.log("got POST request")

    const apikey = req.params.apikey

    if (apikey === process.env.APIKEY) {


        try {


            let url = req.body.url

            let data = {}

            if (doCORSRequest(url)) {

                const response = await doCORSRequest(url)
                const root = parse(response)
                let meta = root.querySelectorAll('meta[property^="og"]');

                if (meta.length) {

                    // console.log("inside meta")
                    for (let i = 0; i < meta.length; i++) {


                        data[`${meta[i].getAttribute("property").replace("og:", "")}`] = `${meta[i].getAttribute("content")}`

                    }
                }
                else {
                    meta = root.querySelectorAll('meta[name]')
                    const pattern = /^https?:\/\/(www\.)?amazon\.[a-z\.]{2,6}\/.+/;

                    // if (pattern.test(url)) {

                    //     const puppeteer = require('puppeteer');

                    //     const browser = await puppeteer.launch({
                    //         headless: 'new'
                    //     });
                    //     const page = await browser.newPage();
                    //     await page.goto(url);

                    //     const result = await page.evaluate(() => {
                    //         // access the variable defined in the frontend JavaScript
                    //         return iUrl;
                    //     });

                    //     // console.log(result);

                    //     data["image"] = result



                    //     await browser.close();
                    // }


                    if(pattern.test(url) && root.querySelector("#imgTagWrapperId")){
                        const imageDiv = root.querySelector("#imgTagWrapperId");
                        const img = imageDiv.querySelector('img')
                        const src = img.getAttribute('src')
                        // console.log(src)

                        data["image"] = src
                    }




                    for (let i = 0; i < meta.length; i++) {
                        data[`${meta[i].getAttribute("name")}`] = `${meta[i].getAttribute("content")}`
                    }
                    // console.log("outside meta")
                }


                if(!data["title"]){
                    const titletag = root.querySelector('title')    
                    const title = titletag.innerText
                    data["title"] = title
                }
            }


            // console.log(data)

            res.json(data)


        } catch (error) {

            console.log(error)

            res.status(400).send(error)

        }



    } else {

        res.status(404).send('Invalid API Key');
    }

})



async function doCORSRequest(url) {

    const pattern = /^https?:\/\/(www\.)?amazon\.[a-z\.]{2,6}\/.+/;
    if(pattern.test(url)){

        // console.log("GOT IN")

        axios.create({
            proxy: {
              host: process.env.PROXYURL,
              port: process.env.PROXYPORT,
            }
          });

    }

      

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    };

    try {
        const resp = await axios.get(url, { headers })

        return resp.data

    } catch (error) {
        return false;

    }


}





app.listen(port, () => {
    console.log(`listening on port : ${port}`)
})










