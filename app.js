const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");
const BlockchainNode = require("./blockchainNode");
const fetch = require("node-fetch");

const express = require("express");
const app = express();

const arguments = process.argv;
let PORT = 8080;

if (arguments.length > 2) {
  PORT = arguments[2];
}
//body parser for JSON
app.use(express.json());

let transactions = [];
// adds nodes to an array
let nodes = [];
let allTransactions = [];

// creates variables for the blockchain
let genesisBlock = new Block();
let blockchain = new Blockchain(genesisBlock);

app.get("/resolve", (req, res) => {
  nodes.forEach((node) => {
    fetch(`${node.url}/blockchain`)
      .then((response) => response.json())
      .then((otherBlockchain) => {
        if (blockchain.blocks.length < otherBlockchain.blocks.length) {
          allTransactions.forEach((transaction) => {
            fetch(`${node.url}/transcations`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transaction),
            })
              .then((response) => response.json())
              .then((_) => {
                fetch(`${node.url}/mine`)
                  .then((response) => response.json())
                  .then((_) => {
                    fetch(`${node.url}/blockchain`)
                      .then((response) => response.json())
                      .then((updatedBlockchain) => {
                        console.log(updatedBlockchain);
                        blockchain = updatedBlockchain;
                        res.json(blockchain);
                      });
                  });
              });
          });
        } else {
          res.json(blockchain);
        }
      });
  });
});

app.post("/nodes/register", (req, res) => {
  // requesting the urls of the nodes
  const urls = req.body;
  // go through the urls to get the url strings
  urls.forEach((url) => {
    //  create instance of blockchain node
    const node = new BlockchainNode(url);
    nodes.push(node);
  });
  // returns back all nodes that have been registered
  res.json(nodes);
});

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
  transactions.forEach((transaction) => {
    allTransactions.push(transaction);
  });
  transactions = [];
  res.json(block);
});

app.get("/blockchain", (req, res) => {
  res.json(blockchain);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
