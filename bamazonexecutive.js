var mysql = require('mysql');
var inquirer = require('inquirer');


var con = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});

function start(){
  inquirer.prompt([{
    type: "list",
    name: "doThing",
    message: "What would you like to do?",
    choices: ["View Product Sales by Department", "Create New Department", "End Session"]
  }]).then(function(ans){
    switch(ans.doThing){
      case "View Product Sales by Department": viewProductByDept();
      break;
      case "Create New Department": createNewDept();
      break;
      case "End Session": console.log('Thanks for coming out!');
    }
  });
}

//view product sales by department
function viewProductByDept(){
  //prints the items for sale and their details
  connection.query('SELECT * FROM departments', function(err, res){
    if(err) throw err;
    console.log('>>>>>>Product Sales by Department<<<<<<');
    console.log('----------------------------------------------------------------------------------------------------')

    for(var i = 0; i<res.length;i++){
      console.log("Department ID: " + res[i].DepartmentID + " | " + "Department Name: " + res[i].DepartmentName + " | " + "Over Head Cost: " + (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
      console.log('--------------------------------------------------------------------------------------------------')
    }
    start();
  })
}

  //create a new department
  function createNewDept(){
    console.log('>>>>>>Creating New Department<<<<<<');
    //prompts to add deptName and numbers. if no value is then by default = 0
    inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Department Name: "
    }, {
      type: "input",
      name: "overHeadCost",
      message: "Over Head Cost: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "prodSales",
      message: "Product Sales: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }
    ]).then(function(ans){
      connection.query('INSERT INTO departments SET ?',{
        DepartmentName: ans.DepartmentName,
        OverHeadCosts: ans.OverHeadCost,
        TotalSales: ans.prodSales
      }, function(err, res){
        if(err) throw err;
        console.log('Another department was added.');
      })
      start();
    });
  }

start();