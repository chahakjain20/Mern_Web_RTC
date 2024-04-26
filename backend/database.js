const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
const DbConnect = () => {
    mongoose.connect(DB_URL).then(()=>{
        console.log("mongodb connected successfully");
    }).catch((error)=>{
        console.log(error);
    })
};
module.exports = DbConnect;