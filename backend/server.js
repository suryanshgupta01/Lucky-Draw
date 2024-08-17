const express = require('express');
const app = express();
require("dotenv").config()
const { connectDB } = require('./connectDBnew');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const User = require('./model/userModel');
const Result = require('./model/resultModel')
var cron = require('node-cron');

app.use(cors());
app.use(express.json())
cron.schedule('0 0 * * *', async () => {
    console.log('New day');
    const arr = await Result.findById("66bdfe743ac296c384d40854")
    const colorArr = arr.colorArr
    const numberArr = arr.numberArr
    const numlen = 8
    const colorlen = 4
    for (let i = 0; i < colorlen; i++) {
        const a = colorArr.shift()
    }
    for (let i = 0; i < colorlen; i++) {
        colorArr.push('gray')
    }
    for (let i = 0; i < numlen; i++) {
        const a = numberArr.shift()
    }
    for (let i = 0; i < numlen; i++) {
        numberArr.push('XX')
    }
    arr.colorArr = colorArr
    arr.numberArr = numberArr
    arr.save()
    console.log("new array saved successfully")
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

app.get('/health', async (req, res) => {
    res.send('Server is running');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userfound = await User.findOne({ email: email, password: password });
    if (userfound?.isAdmin) {
        res.send(userfound)
    } else {
        res.send("Unauthorized")
    }
})

app.post('/arr', async (req, res) => {
    const arr = new Result(req.body)
    arr.save();
    res.send("array saved")
})

app.get('/arruser', async (req, res) => {
    const arr = await Result.findById("66bdfe743ac296c384d40854")
    arr.colorArr = arr.colorArr.slice(0, 46)
    arr.numberArr = arr.numberArr.slice(0, 46)
    res.send(arr)
})

app.get('/arr', async (req, res) => {
    const arr = await Result.findById("66bdfe743ac296c384d40854")
    res.send(arr)
})

app.post('/edit', async (req, res) => {
    const { id, thing, value } = req.body;
    try {
        const arr = await Result.findById("66bdfe743ac296c384d40854")
        if (thing == 'color') {
            arr.colorArr[id] = value
        } else if (thing == 'number') {
            arr.numberArr[id] = value
        }
        arr.save()
        res.send("edited successfully")
    } catch (e) {
        console.log("Error", e)
        res.status(500).send("Error editing")
    }

})
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

connectDB();