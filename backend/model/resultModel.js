const mongoose = require('mongoose')
const resultModel = mongoose.Schema(
    {
        colorArr: [{
            type: String
        }],
        numberArr: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
)

const Result = mongoose.model("RESULT", resultModel)
module.exports = Result