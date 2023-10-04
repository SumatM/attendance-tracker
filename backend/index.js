
const express = require('express')



const app = express()



app.listen(process.env.PORT || 8080,()=>{
    try{
        console.log('Server is Running')

    }catch(err){
        console.log(err)
    }


})