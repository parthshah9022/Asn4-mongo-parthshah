/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Parth Shah Student ID: n01550466 Date: 26/11/23 *
* ****************************************************************************** 
**/

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function findAll() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log("s2");
        console.log(err);
        reject(err);
        return;
      }

      console.log('1');
      const db = client.db("mydb");
      console.log('2');
      const collection = db.collection('customers');
      console.log('3');
      const cursor = collection.find({}).limit(10);
      console.log('4');

      cursor.toArray((err, documents) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        documents.forEach(doc => console.log(doc));
        console.log('5');

        // Close the connection after the query is completed
        client.close();

        resolve();
      });
    });
  });
}

setTimeout(() => {
  findAll()
    .then(() => {
      console.log('iter');
    })
    .catch(error => console.error(error));
}, 5000);
 