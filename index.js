const express = require("express")
const mailchimp = require("@mailchimp/mailchimp_marketing")
const app = express();
const port = process.env.PORT;
const https = require("https")

app.use("/public", express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}))

    


app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
})


app.post("/", function(req, res){

    console.log(res)

    const apiKey = "e30b94bfc523b38bc5ac26b3405ead3c-us6";
    const listId = "6edea1d935";
    const url = "https://us6.api.mailchimp.com/3.0/lists/"+listId;

    const firstName = req.body.firsname;
    const LastName = req.body.lastname;
    const email = req.body.email;
  

    const data = {
        members:    [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: LastName
            }
        }]
         }
    
    const jsonData = JSON.stringify(data);
    const option = {
        method: "POST",
        auth: "yarmuhammad:"+apiKey
    }

   const request = https.request(url, option, function(response){

        if(response.statusCode === 200) return res.sendFile(__dirname+"/pass.html");
        else return res.sendFile(__dirname+"/fail.html");

        response.on("data",function(data){
        })
    })

request.write(jsonData);
request.end();

})

app.post("/fail.html", function(req, res){

    res.redirect("/");
})



app.listen(port, function(req, res){
    console.log("Server is running on port: "+port);
})