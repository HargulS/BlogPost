// **Dependencies**
const express = require("express");
const app = express();
const cors = require("cors");
"use strict";
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
// **End of Dependencies**

const port = process.env.PORT || 5000;
const readData = path.join(__dirname, "../server/data.json");

app.listen(5000, () => console.log(`Listening at port ${port}`));
app.use(express.json());
app.use(cors());




if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
  }


  
  function listUserData() {
    const data = fs.readFileSync(readData);
    // JSON to JS: getting the data from JSON and converting to JS so that we can use it
    return JSON.parse(data);
  }

  app.get("/",(req,res)=>{
      res.send("hello world")
  })

  // Post Data 
  app.post("/post", function(req, res){
    console.log("Req.Body", req.body)
    const schema = Joi.object({
      name:Joi.string().min(1),
      title: Joi.string().min(1).required().messages({
        "string.min": `"Title" should have a minimum length of {#1}`,
        "any.required": `"Title" is a required field`,
      }),
      journalEntry: Joi.string().min(5).required()
      .messages({
       "string.min": `"Journal Entry" should have a minimum length of {#5}`,
        "any.required": `"Journal Entry" is a required field`,
      }),
      date:Joi.string().min(1),
      file:Joi.string().base64({urlSafe: true}).min(1)
    });
    const result = schema.validate(req.body);
    console.log("JOI RESULT", result);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const information = {
      id:uuidv4(),
      name:req.body.name,
      title:req.body.title,
      journalEntry:req.body.journalEntry,
      date:req.body.date,
      file:req.body.file,
    }

    const dataArray = listUserData();
    dataArray.push(information);
    fs.writeFileSync(readData, JSON.stringify(dataArray));
    res.send(information);
    console.log("SentBody", information);
    return information;
  })

  // Get Data 
  app.get("/get", function(req,res){
    res.json(listUserData())
  })
  // End of Get Data 

  // Get Data by ID 
  app.get("/:id", function(req, res){
    const dataArray = listUserData();
    let findObject = dataArray.filter((item) => {
    return item.id === req.params.id;
    });
    console.log("Get Data With ID", findObject);
    res.send(findObject);
  })
  // End of Get Data by Id 