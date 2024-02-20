const { Console } = require("console");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Load users from JSON file
function loadUsers() {
  let rawdata = fs.readFileSync("users.json");
  let users = JSON.parse(rawdata);
  return users;
}

// Add new uservvvvvvvvvvvv
function addUser() {
  let users = loadUsers();
  readline.question("Enter name for new user: ", (name) => {
    let accountID = "ACC" + (Object.keys(users).length + 1001);
    let pin = Math.floor(1000 + Math.random() * 9000).toString();
    users[accountID] = { accountID, name, pin, balance: 0.0, transactions: [] };
    console.log(
      `User ${name} added with accountID: ${accountID} and pin: ${pin}`
    );
    saveUsers(users); // Save the updated users list to the JSON file
    displayMenu();
  });
}

// Save users to JSON file
function saveUsers(users) {
  let data = JSON.stringify(Object.values(users), null, 2);
  fs.writeFileSync("users.json", data);
}

// Authenticate user
function authenticate() {
  let users = loadUsers();
  readline.question("Enter your accountID: ", (accountID) => {
    readline.question("Enter your pin: ", (pin) => {
      let user = users.find((x) => x.accountID === accountID && x.pin === pin);
      // console.log(user);
      if (user) {
        console.log("Authentication successful!");
        secondMenu(user);
        // let chek = checkBlence(user);
        // console.log(chek)
        // users[users.indexOf(user)] = user;
        // viewTransactions(user)
        // dipositeMoney(user, 155);
        // withdrawMoeney(user,155)
        // saveUsers(users);
      } else {
        console.log("Authentication failed.");
        displayMenu();
      }
    });
  });
}

/*"accountID": "ACC1001",
    "name": "John Doe",
    "pin": "1234",
    "balance": 1500,
    "transactions": [
      {
        "type": "deposit",
        "amount": 500,
        "date": "2024-02-01"
      },
      {
        "type": "withdraw",
        "amount": 200,
        "date": "2024-02-02"
      }*/

function checkBlence(user) {
  return user.balance;
}

function dipositeMoney(user, Amount) {
  try
  {
    let users = loadUsers();
  console.log("ur old balance was " + user.balance);

  user.balance += Amount;
  console.log("and now it is " + user.balance);

  user.transactions.push({
    type: "Deposit",
    amount: Amount,
    date: new Date().toISOString(),
  });
  users[users.indexOf(user)] = user;
  saveUsers(users);

    secondMenu(user);
  } catch (err) {
    console.log(err)
  }
}
function withdrawMoeney(user, Amount) {
  try
  {
    let users = loadUsers();
  console.log("ur old balance was " + user.balance);
  user.balance -= Amount;
  console.log("and now it is " + user.balance);
  user.transactions.push({
    type: "withdraw",
    amount: Amount,
    date: new Date().toISOString(),
  });
  users[users.indexOf(user)] = user;
  saveUsers(users);
    secondMenu(user);
  } catch (err) {
    console.log(err)
  }
}

function viewTransactions(user) {
  try{console.log(`User ${user.name}'s transactions:`);
  for (const transaction of user.transactions) {
    const { type, amount, date } = transaction;
    console.log(`Type: ${type}, Amount: ${amount}, Date: ${date}`);
  }
    secondMenu(user);
  } catch (err) {
    console.log(err)
  }
}

//addUser(users);
// deleteUser(users)vv
// authenticate(users);
function exitApp() {
  console.log("Exiting application. Goodbye!");
  readline.close();
}
function secondMenu(user) {
  console.log("1. check balance");
  console.log("2. Depositing Money");
  console.log("3. Withdrawing Money");
  console.log("4. View Transaction History");
  console.log("5. Exit");

  readline.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        const balance = checkBlence(user);
        console.log("your balance is: " + balance);
        secondMenu(user);
        break;
      case "2":
        dipositeMoney(user, 155);
        break;
      case "3":
        withdrawMoeney(user, 155);
        break;
      case "4":
        viewTransactions(user);
        break;
      case "5":
        exitApp();
        break;
      default:
        console.log("Invalid choice. Please try again.\n");
        displayMenu();
    }
  });
}

function displayMenu() {
  console.log("1. Add user");
  console.log("2. authentication ");
  console.log("3. Exit");

  readline.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        addUser();
        break;
      case "2":
        authenticate();
        break;
      case "3":
        exitApp();
        break;
      default:
        console.log("Invalid choice. Please try again.\n");
        displayMenu();
    }
  });
}

console.log("Welcome to the Contact Management System!\n");
displayMenu();
