require('dotenv').config();

const express = require('express');

const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');

const corsOptions = {
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json());
app.use(router);

app.get('/',(req,res)=>{
    res.send('Hello from expressjs');
});


app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));