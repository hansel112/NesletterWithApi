const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("staticFiles"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
    
})

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
                },
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url ="https://us21.api.mailchimp.com/3.0/lists/c72dc4111e";
    const options = {
        method: "POST",
        auth: "Hansel1:9e48daa1c8f15b77ff90ef5c02d176c7-us21"
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data)); 
        });
    });
    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");    
})
app.post("/success", function (req, res) {
    res.redirect("/");    
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000!");
})


// API Key
// 9e48daa1c8f15b77ff90ef5c02d176c7-us21

// list id
// c72dc4111e.