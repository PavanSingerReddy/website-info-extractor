import express from "express"
import axios from "axios"

import { parse } from "node-html-parser"

//below two lines of code is for using both import and require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


if (process.env.NODE_ENV !== "production") {

    const dotenv = require('dotenv')

    dotenv.config()

}


const app = express()
const port = process.env.PORT



app.use(express.urlencoded({ extended: true }))



app.get('/',(req,res)=>{

    res.send("do post request using api key")

})


app.post('/:apikey', async (req, res) => {

    const apikey = req.params.apikey

    if (apikey === process.env.APIKEY) {


        try {


            let url = req.body.url
    
            let data = {}
    
            const response = await doCORSRequest(url)
            const root = parse(response)
            const meta = root.querySelectorAll('meta[property^="og"]');
    
            for (let i = 0; i < meta.length; i++) {
    
    
                data[`${meta[i].getAttribute("property").replace("og:", "")}`] = `${meta[i].getAttribute("content")}`
    
            }
    
    
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

    const resp = await axios.get(url)

    return resp.data

}





app.listen(port, () => {
    console.log(`listening on port : ${port}`)
})










