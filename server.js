import express from "express"
import axios from "axios"

import {parse} from "node-html-parser"

if(process.env.NODE_ENV!=="production"){

    const dotenv = require('dotenv')
    
    dotenv.config()
    
    console.log(process.env.NODE_ENV)

}
else{
    console.log(process.env.NODE_ENV)
}


const app = express()
const port = process.env.PORT



app.use(express.urlencoded({ extended : true }))




app.post('/',async (req,res)=>{


    let url = req.body.url

    let data = {}

    const response = await doCORSRequest(url)
    const root = parse(response)
    const meta = root.querySelectorAll('meta[property^="og"]');

    for(let i=0;i<meta.length;i++){
        

        data[`${meta[i].getAttribute("property")}`] = `${meta[i].getAttribute("content")}`

    }


    res.json(data)



})



async function doCORSRequest(url) {

    const resp = await axios.get(url)

    return resp.data

}





app.listen(port,()=>{
    console.log(`listening on port : ${port}`)
})










