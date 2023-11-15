const db = require("./dbConfig.js");
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

app.post('/login' , (req,res) => {
    const userMail = req.body.userMail;
    const userPass = req.body.userPass;
    db.query("select * from cuser where mail = '" + userMail + "'", (err,results) => {
        res.json({res:results.length != 0 && userPass == results[0].upassword, uid : results[0].uid})
    });
});

app.post('/sendGlobal' , (req,res) => {
    const uid = req.body.uid;
    const message = req.body.message;
    const today = new Date();
    
    const dataToSend = {
        message : message,
        user1 : uid,
        user2 : 1,
        message_date : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " +
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    }
    
    const insertQuery = "insert into chat SET ?";
    db.query(insertQuery,dataToSend, (err,results) => {
        if (err) 
            console.log("Error while trying to insert user message to global");
    });
});

app.get('/getGlobal' , (req,res) => {
    db.query("select message,mail,message_date " +
         "from chat join cuser on chat.user1 = cuser.uid where user2 = 1", (err,results) => {
        res.json({res : results});
    });
});

app.post('/register' , (req,res) => {
    const registerData = req.body;

    db.query("select * from cuser where mail = '" + registerData.mail + "'",(err,results) => {
        if (results.length > 0)
            console.log("User already exists");
        else
            console.log("OK");
    });
})

app.listen(port, () => {
    console.log("Server listening at port :" + port);
});