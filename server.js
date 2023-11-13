const express = require('express');
const mongoose = require('mongoose');
const menuItems = require('./routes/menu-items');
const cors = require('cors')

require('dotenv').config();

// express app
app = express();


// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// })

// app.use(cors())
app.use('/pho-hot', menuItems)


//connecting to mongoDB
// mongoose.connect(process.env.mongo_URI)
//     .then(() => {
//         console.log("Successully connected to MongoDB")
//         app.listen(4000, () => {
//             console.log(`listening on PORT ${process.env.PORT}`)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

app.listen(process.env.PORT, () => {
    console.log(`listening on PORT ${process.env.PORT}` )
})