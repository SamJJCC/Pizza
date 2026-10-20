//import the express module
import express from 'express';

//create an instance of an express app
const app=express();
// define port number
const PORT=3000;
// create an arrat to store orders
const orders=[];



// enable static file serving
app.use(express.static('public'));

// add middleware to allow the app to parse form data
app.use(express.urlencoded({extended:true}));

//define a default route
app.get('/',(req,res)=>{

    // res.send('welcome to poppa\'s pizza');

    res.sendFile(`${import.meta.dirname}/views/home.html`)
}); 

app.get('/contact',(req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/contact.html`)
});

app.get('/confirm-order',(req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/confirm.html`)
});

app.get('/menu',(req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/menu.html`)
});


app.post('/submit-order',(req,res)=>{
    // create a json object to store order data
    const order=req.body;
    order['timestamp']=new Date();
    console.log(order);

    // add order object to orders array
    orders.push(order);
    console.log(orders);
    res.sendFile(`${import.meta.dirname}/views/confirm.html`)
});




// start the server on the designated port
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})