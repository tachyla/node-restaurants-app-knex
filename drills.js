//1. Get all Restaurants 
// knex.select()
//   .from('restaurants')
//   .then(results => console.log(results));

// 2. Get all italian restaurants
// knex('restaurants')
// .where({cuisine: 'Italian'})
// .then(results => console.log(results));

// 3. Get 10 Italian restaurants, subset of fields
// knex('restaurants', 'id', 'name')
// .where({cuisine: 'Italian'})
// .limit(10)
// .then(results => console.log(results));

// 4. Count of Thai Restaurants
// knex('restaurants', 'id', 'name')
// .count().where({cuisine: 'Thai'})
// .then(results => console.log(results));


// 5.
// knex('restaurants')
// .count()
// .then(results => console.log(results));

//6.
 //knex('restaurants')
// .where({address_zipcode: '11372', cuisine: 'Thai'})
// .count()
// .then(results => console.log(results));

// 7.
//knex.select('id', 'name', 'address_zipcode', 'cuisine')
// .from('restaurants')
// .where('cuisine', 'Italian')
// .whereIn('address_zipcode', ['10012', '10013', '10014'])
// .limit(5)
// .orderBy('name', 'ASC') 
// .then(results => console.log(results));

// 8. & 9.
//knex('restaurants')
// .insert({
//   name: 'Byte Cafe',
//   borough: 'Brooklyn',
//   cuisine: 'coffee',
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'
// }, ['id', 'name']).then(results => console.log(results));

// 10.
//knex('restaurants')
// .insert([
//   {name:'Cafe 1', cuisine: 'American', borough: 'Manhattan'},
//   {name:'Cafe 2', cuisine: 'Thai', borough: 'Brooklyn'},
//   {name:'Cafe 3', cuisine: 'Italian', borough: 'Bronx'}
// ], ['id', 'name'])
// .then(results => console.log(results));

//11.
// knex('restaurants')
// .select('name')
// .where({nyc_restaurant_id: '30191841'})
// //.update({name: `DeeJays New Restaurant`})
// .then(result => console.log(result));

// 12.
//knex('grades')
// .where({id: '9'})
// .del()
// .then(result => console.log(result));

//13.
//knex('restaurants')
// .where({id: '22'})
// .del()
// .then(results => console.log(results));
// ERROR: Unhandled rejection error: delete from "restaurants" 
//where "id" = $1 - update or delete on table "restaurants" 
//violates foreign key constraint "grades_restaurant_id_fkey" 
//on table "grades"

// using ElephantSQL url 
// const knex = require('knex')({
//   client: 'pg',
//   connection:'postgres://USERNAME:PASSWORD@stampy.db.elephantsql.com:5432/USERNAME'
// }


// clear the console before each run
process.stdout.write('\033c');
//REQUIRE EXPRESS & DEFINE PORT
let express = require('express');
let port = 8080;

// Require Knex and make connection to DATABASE
const knex = require('knex')({
  client: 'pg',
  connection: 
    'postgres://luqxcabl:RbVXeengO8CHNxj0RBkNGAqDBer4F-BU@stampy.db.elephantsql.com:5432/luqxcabl'
});
//Initialize express
let app = express();

//Make GET request for one Restaurant
app.get('/restaurants/:id', (req, res) => {
  knex.first('restaurants.id', 'name', 'cuisine', 'borough')
  //id needs to be specified because 'id' exists in both restaurant & grades tables 
    .select(knex.raw(`CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address`))
    .from('restaurants')
    //req.params.id allows the sql to reuturn data based on the request
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    // Limit not needed, req specifies data for 1 restaurant
    .then(results => res.json(results));
});

//Define where port is listening
app.listen(port, function(){
  console.log('Listening on port 8080');
}); 