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
    const arr = await Result.findOne()
    let colorArr = arr.colorArr
    let numberArr = arr.numberArr
    const numlen = 8
    const colorlen = 4
    for (let i = 0; i < colorlen; i++) {
        colorArr.push('gray')
    }
    for (let i = 0; i < numlen; i++) {
        numberArr.push('XX')
    }
    arr.colorArr = colorArr
    arr.numberArr = numberArr
    await arr.save()
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
    const arr = await Result.findOne()
    const len = arr.numberArr.length - 14;
    arr.colorArr = arr.colorArr.slice(0, len)
    arr.numberArr = arr.numberArr.slice(0, len)
    res.send(arr)
})

app.get('/arr', async (req, res) => {
    const arr = await Result.findOne()
    res.send(arr)
})

app.post('/edit', async (req, res) => {
    const { id, thing, value } = req.body;
    try {
        const arr = await Result.findOne()
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
app.post('/changepassword', async (req, res) => {
    const { userid, password, email } = req.body
    const user = await User.findById(userid)
    if (user && user.email == email && user.isAdmin) {
        user.password = password
        user.save()
        res.send("Password changed successfully")
        return
    } else {
        res.status(401).send("Unauthorized")
    }
})
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

connectDB();