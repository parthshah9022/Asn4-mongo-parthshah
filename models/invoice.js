/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Parth Shah Student ID: n01550466 Date: 26/11/23 *
* ****************************************************************************** 
**/
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    'Invoice ID': String,
    Branch: String,
    City: String,
    'Customer type': String,
    'Product line': String,
    name: String,
    image: String,
    'Unit price': Number,
    Quantity: Number,
    'Tax 5%': Number,
    Total: Number,
    Date: String,
    Time: String,
    Payment: String,
    cogs: Number,
    'gross income': Number,
    Rating: Number,
  });
  
  module.exports = mongoose.model('invoice', invoiceSchema);