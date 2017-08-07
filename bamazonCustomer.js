var mysql = require('mysql');
var inquirer = require('inquirer');
var fs = require('file-system');

// mySQL connection
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :3306,
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});

// Show everything available for sale

// Ask for the product to buy

var buyStart = function (){
  inquirer  
    .prompt([{
      name: "buyProductID",
      type: "input",
      message: "What is the item ID of the product you want to buy?",
    },
    {
      name: "numberOfItems",
      type: "input",
      message: "How many would you like to buy today?"
    }]
  )

    .then(function(answer){
    // 1st query method takes 2-3 pramaters(query string), a callback function, and data 
    // function(error) will run but only manifest if there is an error 
    // results will bring run the query string look up 2 lines
  
    //   connection.query("SELECT * FROM products WHERE item_id = ?", [answer.buyProductID], function(error, results){ 
    //   if (error){
    //     throw error
    //   } 
    //   console.log('results[0].stock_quantity', results[0].stock_quantity)
    //   console.log('results', results)
    //   // when we get something back from inquirer its a string...therefore we need to destringify
    //   var one = parseInt(results[0].stock_quantity); 
    //   var two = parseInt(answer.numberOfItems);
    //   console.log('one', one);
    //   console.log('two' , two);
    //   var updatedQuantity = parseInt(results[0].stock_quantity) - parseInt(answer.numberOfItems) 
    //  console.log(updatedQuantity);
        
      
    //   } )

    //  if the results of the answer - stock is greater than 0 then run UPDATE 
   
     connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [answer.numberOfItems, answer.buyProductID], function(error, results){ 
      if (error){
        throw error
      } else {
        console.log("You've bought your items!")
      }
      
      
      
        
      
      } )
    })
}

buyStart();

//"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?"
