# transactionCalculator

A simple transaction  price Calculator with a small set of rules made using Express V 4.17.1.
Current test and further tests should be written using Jest framework.

To start an aplication, clone repository to your local machine and run "npm install" to install dependencies.
Then you can either use nodemon app.js or node app.js to start the application.
*note* you can change the port of localy running application in config.js file. Also you can add specific rules for clients or edit default/minimum rates in helpers/constants/js file.


Aplication has one route which is defined in routes folder. It accepts post request to "/". In request body there should be following information:
{
  "date": "2021-06-25", // date of the currency rates to get calculations from
  "amount": "499", // amount of money 
  "currency": "GBP", // currency name
  "client_id": 1 // client ID
}

Application calculates how much comission should the client pay.

It has three simple rules which are applied in commission controller.

To run the test simply run "npm run test" in a project folder.

I have invested three and a half hours to make this simple application work.

For further improvement it would be nice to add design pattern if more rules would be added in future, also add much more validation and better error handling.

