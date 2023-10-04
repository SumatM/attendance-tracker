
const express = require('express')
const { connection } = require('./database/db')
const { authRoute } = require('./routes/auth.route')
require('dotenv').config()
const passport = require('passport')
const { userRoute } = require('./routes/user.route')
const { attendanceRoute } = require('./routes/attendance.route')
const gSheetRouter = require('./routes/spreadSheet.route')
require('./gauth.js');

const app = express()

    app.use(express.json())

app.use(passport.initialize());


app.use('/auth',authRoute)

app.use('/student', userRoute)

app.use('/attendance',attendanceRoute)

app.use('/updateSheet',gSheetRouter)



app.get("/",(req,res)=>{
    try{
        res.status(200).json({message:"Welcome to attendance tracker API"})
    }catch(err){
        res.status(400).json({error:err})
    }
})






app.listen(process.env.PORT || 8080, async()=>{
    try{
        console.log('Server is Running')
        await connection.then((result) => {
            console.log('DB is connected')    
        }).catch((err) => {
            console.log('DB failed to connected',err)    
        });
    }catch(err){
        console.log(err)
    }


})