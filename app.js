//import the express module
import express from 'express';

//create an instance of an express app
const app=express();
// define port number
const PORT=3000;

// enable static file serving
app.use(express.static('public'));

//define a default route
app.get('/',(req,res)=>{

    // res.send('welcome to poppa\'s pizza');

    res.sendFile(`${import.meta.dirname}/views/home.html`)
}); 


// start the server on the designated port
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})