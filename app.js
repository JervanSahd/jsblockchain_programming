const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

const express = require("express");
const app = express();

let transactions = [];

// creates variables for the blockchain
let genesisBlock = new Block();
let blockchain = new Blockchain(genesisBlock);

//body parser for JSON
app.use(express.json());

app.post("/transactions", (req, res) => {
  const to = req.body.to;
  const from = req.body.from;
  const amount = req.body.amount;

  let transaction = new Transaction(from, to, amount);
  // add to tranactions array
  transactions.push(transaction);

  // return all transactions to the user
  res.json(transactions);
});

// request from a block and gets everything back
app.get("/mine", (req, res) => {
  let block = blockchain.getNextBlock(transactions);

  // adds block to the blockchain
  blockchain.addBlock(block);
  // returns the block
  res.json(block);
});

app.get("/blockchain", (req, res) => {
  //   let transaction = new Transaction("Mary", "John", 100);

  //   // create the genesis block
  //   let genesisBlock = new Block();
  //   // create a blockchain with genesisBlock
  //   let blockchain = new Blockchain(genesisBlock);

  //   let block = blockchain.getNextBlock([transaction]);
  //   blockchain.addBlock(block);

  //   let anotherTransaction = new Transaction("Steve", "Brian", 500);
  //   let block1 = blockchain.getNextBlock([anotherTransaction]);
  //   blockchain.addBlock(block1);

  res.json(blockchain);
});

app.listen(8080, () => {
  console.log("Server is running...");
});
