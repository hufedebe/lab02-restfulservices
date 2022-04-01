const express = require('express');
const app = express();

app.use(express.json())

const customers = [
    { id: 1, name: "Hugo"},
    { id: 2, name: "Kim" }
]

app.get('/', (req,res)=>{

    res.send('Hello World');
})

app.get('/api/customers',(req,res)=>{
    
    res.send(customers);
})

app.get ('/api/customers/:id',(req,res)=>{
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer){
        res.status(404).send('The ccustomer with the given ID not found');
        return;
    }
    res.send(customer)
})

app.get ('/api/sales/:year/:month',(req,res)=>{
    res.send(req.params);
    console.log(req.query);
})

app.post('/api/customers',(req,res)=>{
    
    if(!req.body.name || req.body.name.length<3){
        //400 Bad Request
        //Investigar sobre JOI package
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    
    const customer = {
        id: customers.length + 1 ,
        name: req.body.name,
    }

    customers.push(customer);
    res.send(customer);
})

app.put('/api/customers/:id',(req,res)=>{
    //Look up the customer
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //If not existing, return 404
    if(!customer){
        res.status(404).send('The ccustomer with the given ID not found');
        return;
    }
    //Validate
    //If invalid, return 404 - Bad request
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    //Update customer
    customer.name = req.body.name;
    //Return the updated customer
    res.send(customer);
})

app.delete('/api/customers/:id', (req,res)=>{
    //Look up the customer
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //If not existing, return 404
    if(!customer){
        res.status(404).send('The ccustomer with the given ID not found');
        return;
    }

    //Delete
    const index = customers.indexOf(customer);
    customers.splice(index,1);

    //Return the same customer
    res.send(customer);
})

app.listen(3000, ()=> console.log('Listening on port 3000 ...'));