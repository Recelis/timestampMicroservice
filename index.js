const express = require('express');

const app = express();

const port = 3000;

app.listen(port, ()=>{
    console.log(`running server on port ${port}`);
});

app.get('/', (req,res)=>{
    res.send("run [project_url]/api/timestamp/:date_string? to return the date in JSON");
});


app.get('/api/timestamp/:dateString?', (req,res)=>{
    // check if ISO compliant
    date = new Date(req.params.dateString);
    if (isNaN(date)){ // check if UNIX time
        date = new Date(Number(req.params.dateString));
    } 
    
    if (isNaN(date)) { // works for empty strings as well
        return res.json({
            error:"Invalid Date"
        })
    } else {
        return res.json({
            unix:date.getTime(),
            utc:date.toUTCString() 
        })
    }
})