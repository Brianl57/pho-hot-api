const express = require('express');
const { google } = require("googleapis");
const mongoose = require("mongoose");
const MenuItem = require("../models/menu_itemModel")

const router = express.Router();

const ids = [];

// fecthing data from GoogleSheets and updating database 
router.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        // keyFile: process.env.KEY_FILE,
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // create client instance for auth 
    const client = await auth.getClient().catch(err => console.log(err))

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

    const menu_items = getRows.data.values;

    res.send(menu_items);
})


module.exports = router