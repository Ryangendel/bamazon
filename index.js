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


// ------------------------------------
fs.mkdir('1/2/3/4/5', function(err) {});
fs.mkdirSync('1/2/3/4/5');
fs.writeFile('path/test.txt', 'aaa', function(err) {})
// ------------------------------------
inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
    // Use user feedback for... whatever!! 
});
// ------------------------------------
 
connection.connect(function(err) {
  if (err) throw err;

  start()
});
 
var start = function (){
  inquirer  
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function(answer){
      if(answer.postOrBid.toUpperCase()==="POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}

function postAuction(){
  inquirer
    .prompt([
      {
      name: "item",
      type: "input",
      message: "what is the item you would like to submit?"  
      },
    {
      name: "category",
      type:"input",
      message: "What department would you like to place your auction in?"
    },
    {
      name: "startingBid",
      type : "input",
      message: "What would you like your starting bid to be?",
      validate: function (value){
        if (isNaN(value)===false){
          return true;
        }
        return false;
      }
    },
    {
      name: "stockQuantity",
      type : "input",
      message: "How many do you have in stock?",
      validate: function (value){
        if (isNaN(value)===false){
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answers){
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answers.item,
        department_name: answers.category,
        price: answers.startingBid,
        stock_quantity: answers.stockQuantity
      },
      function (err){
        if (err) throw err;
        console.log("Your auction was created successfully!");
        start();
      }
    );
  });
}

// function bidAuction(){
//   connection.query("SELECT * FROM products", function (err,results){
//     if(err) throw err;
//     inquirer
//     .prompt([
//       {
//       name: "bidChoice",
//       type: "rawlist",
//       choices: function(){
//         var choiceArray [];
//         for (var i = 0; i<results.length; i++) {
//           choiceArray.push(results[i].product_name);
//         }
//         return choiceArray;
//       },
//       message: "What auction would you like to place a bid in?"
//       },
//       {
//         name:"bid",
//         type:"input",
//         message:"HOw much would you like to bid?"
//       }
      
//     ])
//     .then(function(answer) {
//       var chosenItem;
//       for (var i = 0; i<results.length; i++){
//         if (results[i].item_name === answer.choice){
//           chosenItem = results[i];
//         }
//       }
//     if (chosenItem.highest_bid < parseInt(answer.bid))
    
//     })


  
  // inquirer
  //   .prompt([
  //     {
  //     name: "item",
  //     type: "input",
  //     message: "what is the item you would like to submit?"  
  //     },
  //   {
  //     name: "category",
  //     type:"input",
  //     message: "What department would you like to place your auction in?"
  //   },
  //   {
  //     name: "startingBid",
  //     type : "input",
  //     message: "What would you like your starting bid to be?",
  //     validate: function (value){
  //       if (isNaN(value)===false){
  //         return true;
  //       }
  //       return false;
  //     }
  //   },
  //   {
  //     name: "stockQuantity",
  //     type : "input",
  //     message: "How many do you have in stock?",
  //     validate: function (value){
  //       if (isNaN(value)===false){
  //         return true;
  //       }
  //       return false;
  //     }
  //   }
  // ])
//       [
//       {
//         console.log("working")
//       }
//     ])
// }

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();