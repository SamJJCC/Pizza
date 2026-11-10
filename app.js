//import the express module
import express from 'express';
//import mysql
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
//create a connection "pool"
const pool=mysql2.createPool({
    host:process.env.DB_HOST, 
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT
}).promise();



//create an instance of an express app
const app=express();
// define port number
const PORT=3000;
// create an array to store orders
const orders=[];



// enable static file serving
app.use(express.static('public'));



// add middleware to allow the app to parse form data
app.use(express.urlencoded({extended:true}));
//set view engine
app.set('view engine','ejs');


//create a route to test the data base
app.get('/db-test',async(req,res)=> {
    try{
        const orders=await pool.query('SELECT * FROM orders');
        res.send(orders[0]);
    }catch(err){
        console.error('Database error: ',err);
        res.status(500).send('Database error occured');
    }
})



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


app.post('/submit-order',async(req,res)=>{
    // create a json object to store order data
    const order=req.body;
    order['timestamp']=new Date();
    console.log(order);
    const sql= 'INSERT INTO orders (fname,lname,email,size,method,toppings,comment)VALUES(?,?,?,?,?,?,?)';
    //create an array of parameters from order data
    const params=[
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.comment
    ];

    //execute the query
    const [result]=await pool.execute(sql,params);

    res.render('confirm',{order});
});

app.get('/admin',async(req,res)=>{

     try{
        const orders=await pool.query('SELECT * FROM orders');
        console.log(orders[0]);
        res.render('admin',{orders:orders[0]});
    }catch(err){
        console.error('Database error: ',err);
        res.status(500).send('Database error occured');
    }

    
}); 




// start the server on the designated port
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})