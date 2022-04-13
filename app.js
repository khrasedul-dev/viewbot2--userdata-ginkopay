const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramproject.b9su4.mongodb.net/telegramProject?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).catch((e)=>{
        console.log(e)
}).then((d)=>console.log('Database connected')).catch((e)=>console.log(e))


const newSchema = new mongoose.Schema({
    
    userId : {
        type: Number
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    crypto: {
        type: String
    },
    wallet: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }


},{versionKey: false})

const User = mongoose.model('withdrawl_request_list',newSchema)

const app = express();

app.get("/",async (req,res)=>{
    const data = await User.find();
    let htdata = ""
    if(data.length > 0){
        data.map((data)=>{
            htdata = htdata+`
            <tr>
                <td>${data.userId}<td/>
                <td>${data.userName || 'No Username'}<td/>
                <td>${data.name}<td/>
                <td>${data.email}<td/>
                <td>${data.crypto}<td/>
                <td>${data.wallet}<td/>
                <td>${data.created_at}<td/>
            </tr>`
        })
    }

    console.log(data)
    
    const tddata = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    #customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    
    #customers tr:hover {background-color: #ddd;}
    
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    h1{
        text-align:center;
        border-bottom: 1px solid black;
        color: #04AA6D;
    }
    </style>
    </head>
    <body>
    
    <h1 >Withdraw Information</h1>
    <br><br><br><br>
    
    <table id="customers">
    <tr>
    <th>User Id<th/>
    <th>User Name<th/>
    <th>Name<th/>
    <th>Email<th/>
    <th>Crypto<th/>
    <th>Wallet<th/>
    <th>Join Date<th/>
    </tr>
${htdata}
    </table>
    
    </body>
    </html>`
    res.send(tddata)
    // res.send(data)
});

app.listen(process.env.PORT || 8080,()=>{
    console.log('app is running...')
})