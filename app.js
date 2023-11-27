/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Parth Shah Student ID: n01550466 Date: 26/11/23 *
* ****************************************************************************** 
**/

var express  = require('express');
var path = require('path');
const fs = require('fs');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var port     = process.env.PORT || 8000;
const customHelpers = require('./custom_helper');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(path.join(__dirname, 'public'))); // tellig the express that use the public folder to get the static files from the project. path join is used to join current directoty path to public.

const hbs = exphbs.create({
    handlebars: customHelpers,
    extname: '.hbs', 
    partialsDir: path.join(__dirname, 'views/partials'),
});

hbs.handlebars.registerPartial('header', fs.readFileSync(path.join(__dirname, 'views/partials/header.hbs'), 'utf8'));
hbs.handlebars.registerPartial('footer', fs.readFileSync(path.join(__dirname, 'views/partials/footer.hbs'), 'utf8'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs'); //  Set 'hbs' as the view engine for rendering templates.



mongoose.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });



//var Employee = require('./models/employee');
var Invoice = require('./models/invoice');
 
 
// //get all employee data from db
// app.get('/api/employees', function(req, res) {
// 	// use mongoose to get all todos in the database
// 	Employee.find(function(err, employees) {
// 		// if there is an error retrieving, send the error otherwise send data
// 		if (err)
// 			res.send(err)
// 		res.json(employees); // return all employees in JSON format
// 	});
// });

// // get a employee with ID of 1
// app.get('/api/employees/:employee_id', function(req, res) {
// 	let id = req.params.employee_id;
// 	Employee.findById(id, function(err, employee) {
// 		if (err)
// 			res.send(err)
 
// 		res.json(employee);
// 	});
 
// });


// // create employee and send back all employees after creation
// app.post('/api/employees', function(req, res) {

//     // create mongose method to create a new record into collection
//     console.log(req.body);

// 	Employee.create({
// 		name : req.body.name,
// 		salary : req.body.salary,
// 		age : req.body.age
// 	}, function(err, employee) {
// 		if (err)
// 			res.send(err);
 
// 		// get and return all the employees after newly created employe record
// 		Employee.find(function(err, employees) {
// 			if (err)
// 				res.send(err)
// 			res.json(employees);
// 		});
// 	});
 
// });


// // create employee and send back all employees after creation
// app.put('/api/employees/:employee_id', function(req, res) {
// 	// create mongose method to update an existing record into collection
//     console.log(req.body);

// 	let id = req.params.employee_id;
// 	var data = {
// 		name : req.body.name,
// 		salary : req.body.salary,
// 		age : req.body.age
// 	}

// 	// save the user
// 	Employee.findByIdAndUpdate(id, data, function(err, employee) {
// 	if (err) throw err;

// 	res.send('Successfully! Employee updated - '+employee.name);
// 	});
// });

// // delete a employee by id
// app.delete('/api/employees/:employee_id', function(req, res) {
// 	console.log(req.params.employee_id);
// 	let id = req.params.employee_id;
// 	Employee.remove({
// 		_id : id
// 	}, function(err) {
// 		if (err)
// 			res.send(err);
// 		else
// 			res.send('Successfully! Employee has been Deleted.');	
// 	});
// });

// Get all invoices
app.get('/api/invoices', function (req, res) {
    Invoice.find(function (err, invoices) {
        console.log('Error:', err);
      if (err) {
       
        res.send(err);
      } else {
        console.log("invoices",invoices);
       //  res.json(invoices);
         res.render('allInvoicesView', { invoice: invoices });
      }
    });
  });
  
  // Get a specific invoice by ID
  app.get('/api/invoices/:invoice_id', function (req, res) {
    let invoiceID = req.params.invoice_id.trim();
  console.log("Invoice id ", invoiceID);
    
    Invoice.findOne({ 'Invoice ID': invoiceID }, function (err, invoice) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
      res.json(invoice);
    });
  });


  app.get('/api/newInvoice', (req, res) => {
    res.render('newInvoice');
   
});
  
  // Create a new invoice
  app.post('/api/invoices', function (req, res) {
console.log("api response" , req.body)
    Invoice.create({
     "_id": "",
      "Invoice ID": req.body.invoiceID,
      Branch: req.body.branch,
      City: req.body.city,
      "Customer type": req.body.customerType,
      "Product line": req.body.productLine,
      name: req.body.name,
      image: req.body.image,
      "Unit price": req.body.unitPrice,
      Quantity: req.body.quantity,
      "Tax 5%": req.body.tax,
      Total: req.body.total,
      Date: req.body.date,
      Time: req.body.time,
      Payment: req.body.payment,
      cogs: req.body.cogs,
      "gross income": req.body.grossIncome,
      Rating: req.body.rating,
    }, function (err, invoice) {

      if (err) {
        console.log("invoice ",invoice)
        console.log("err ",err)
        res.send(err);
      } else {
          console.log("invoice ",invoice)
          res.json(invoice);
             		
       // res.redirect('/invoices');
      }
    });
  });
  
  // Update "Customer type" & "unit price" of an existing invoice
  app.put('/api/sales/:invoice_id', async (req, res) => {
    try {
        const id = req.params.invoice_id;
        const { CustomerType, UnitPrice } = req.body;
  
        if (!CustomerType || !UnitPrice) {
            return res.status(400).json({ error: 'Customer type and unit price are required fields.' });
        }
  
        const data = {
            CustomerType,
            UnitPrice,
            Total: UnitPrice * (req.body.Quantity || 1),
        };
  
        const sales = await Invoice.findByIdAndUpdate(id, data, { new: true });
  
        // if (!sales) {
        //     return res.status(404).json({ error: 'Invoice not found' });
        // }
  
        res.send('Successfully! Invoice updated - ' + sales.name);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/invoices/payment/:paymentMethod', function (req, res) {
    const paymentMethod = req.params.paymentMethod;
    // Find invoices with the specified payment method
    Invoice.find({ Payment: paymentMethod }, function (err, invoices) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(invoices);
      }
    });
  });

  
  // Delete an invoice by ID
  app.delete('/api/invoices/:invoice_id', function (req, res) {
    let id = req.params.invoice_id;
    Invoice.remove({
      _id: id
    }, function (err) {
      if (err)
        res.send(err);
      else
        res.send('Successfully! Invoice has been Deleted.');
    });
  });

app.listen(port);
console.log("App listening on port : " + port);