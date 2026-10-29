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
//set view engine
app.set('view engine','ejs');

//define a default route
app.get('/',(req,res)=>{

    // res.send('welcome to poppa\'s pizza');

    res.render('home');
}); 

app.get('/contact',(req,res)=>{
    res.render('contact')
});

// app.get('/confirm-order',(req,res)=>{
//     res.render('confirm')
// });

app.get('/menu',(req,res)=>{
    res.render('menu');
});


app.post('/submit-order',(req,res)=>{
    // create a json object to store order data
    const order=req.body;
    order['timestamp']=new Date();
    console.log(order);

    // add order object to orders array
    orders.push(order);
    console.log(orders);
    res.render('confirm',{order});
});

app.get('/admin',(req,res)=>{

    // res.send('welcome to poppa\'s pizza');

    res.render('admin',{orders});
}); 




// start the server on the designated port
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})