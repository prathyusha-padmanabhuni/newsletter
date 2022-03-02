const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
    // response.send("working!!!");
    
});
app.post("/",function(request,response){
    var city=request.body.city1;
    const query=city;
    const unit="metric";
    const id="e167d26b232940628d68b860863ad28e";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+id; 
    https.get(url,function(res){
        // console.log(res); //it will result all content it responded
        // console.log(res.statusCode);
        res.on("data",function(data){
            // console.log(data); // we get data i hexa code.
            const weatherData=JSON.parse(data); //json parsing
            const temp= "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            response.write("<p>the weather is currently "+weatherData.weather[0].description+"</p>");
            response.write("<h1>the temperature in "+city + " is "+weatherData.main.temp+" degree celcius</h1>");
            response.write("<img src="+temp+">");
            response.send();
        })

    });
});
app.listen(3000,function(){
    console.log("server started at 3000");
})