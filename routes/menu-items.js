const express = require('express');
const { google } = require("googleapis");
const cors = require('cors')
const mongoose = require("mongoose");
const MenuItem = require("../models/menu_itemModel")

const router = express.Router();

const ids = [];

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

// fecthing data from GoogleSheets and updating database 
router.get('/', cors(corsOptions), async (req, response) => {
    const auth = new google.auth.GoogleAuth({
        // keyFile: process.env.KEY_FILE,
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
     
    // create client instance for auth 
    const client = await auth.getClient()
                    .then(res => {
                        console.log("CLIENT RESPONSE: ", res)
                    })
                    .catch(err => {
                        console.log("CLIENT ERR: ", err)
                    })


    // create instance of Google sheets api
    const googlesheets =  google.sheets({ version: "v4", auth: client });
    
    const spreadsheetId = process.env.sheetID;

    // Get metadeta about spreadsheet
    // const metaData = await googlesheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // })

    // read rows from spreadsheet
    const getRows = await googlesheets.spreadsheets.values.get({
        auth, 
        spreadsheetId,
        range: "Sheet1"
    })
        .then(res => {
            console.log("GETROWS RES: " ,res)
            const menu_items = res.data.values;
            response.send(menu_items);
        })
        .catch(err => {
        console.log("GETROWS ERR: ", err)
    })

})


module.exports = router