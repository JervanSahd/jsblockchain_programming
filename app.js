const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

const express = require("express");
const app = express();

app.get("/blockchain", (req, res) => {
  let transaction = new Transaction("Mary", "John", 100);

  // create the genesis block
  let genesisBlock = new Block();
  // create a blockchain with genesisBlock
  let blockchain = new Blockchain(genesisBlock);

  let block = blockchain.getNextBlock([transaction]);
  blockchain.addBlock(block);

  let anotherTransaction = new Transaction("Steve", "Brian", 500);
  let block1 = blockchain.getNextBlock([anotherTransaction]);
  blockchain.addBlock(block1);

  res.json(blockchain)
});

app.listen(8080, () => {
  console.log("Server is running...");
});
