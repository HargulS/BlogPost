// **Dependencies**
const express = require("express");

const app = express();
const cors = require("cors");
"use strict";

const path = require("path");
const client = require('./sqlQueries.js')


// **End of Dependencies**

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Listening at port ${port}`));
app.use(express.json());

// To avoid Cors cross origin error
app.use(cors({origin:'http://localhost:3000',credentials:true}));


if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
  }

// Get All Data
app.get('/get', (req,res)=>{
    client.query(
        `SELECT * 
        FROM user_info_2`,
        (err,result)=>{
        if(err){
            console.log(err)
        }
        res.status(200).send(result.rows)
    })
})

// Get Data With ID
app.get('/:id',(req,res)=>{
    const id = req.params.id
    console.log("Req.params.id",id)
    client.query(
        `SELECT*FROM user_info_2 
        WHERE user_id=$1`,[id],
        (err,result)=>{
        if(err){
            console.log(err)
        } 
        console.log("Result By Id",result.rows)
        res.status(200).send(result.rows)
    })
   
})

// Post Data 
app.post('/post',cors(),(req,res)=>{
   const {first_name,title,journalEntry,date_col}=req.body
   console.log("Req.body.POST",req.body)
   client.query(
       `INSERT INTO user_info_2(first_name,title,journalentry,date_col) VALUES($1,$2,$3,$4)`,
       [first_name,title,journalEntry,date_col])
})