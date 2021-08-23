const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const { response, json } = require("express");
const app=express();

app.use(express.static("public"));//so that css file can also be delivered to the browser;
app.use(bodyparser.urlencoded({extended:true    }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
   // console.log(firstname);
   var data={
       members:[
           {
           email_address:email,
           status:"subscribed",
           merge_fields: {
               FNAME:firstname,
               LNAME: lastname,
           }
            
       }
    ]

   };
   var jsondata=JSON.stringify(data);

   const url="https://us5.api.mailchimp.com/3.0/lists/08ff1f2fa7"
   //https.request(url,options,response);
   const options={
       method:"POST",
       auth: "nirbhay:1db75314f32e89a96432d8c83dd65423-us5"

   }
   const request=https.request(url,options,function(response){
       if(response.statusCode===200){
           res.sendFile(__dirname+"/success.html");


       }
       else{
        res.sendFile(__dirname+"/failure.html");
       }
       response.on("data",function(data){
           console.log(JSON.parse(data));
       })
   });

   request.write(jsondata);
   request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");

})




app.listen(process.env.PORT || 3000,function(req,res){
    console.log("the server is running at port 3000");
})

//1db75314f32e89a96432d8c83dd65423-us5
//08ff1f2fa7