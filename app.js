const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require('./transaction')

let transaction = new Transaction ('Mary', 'John', 100)

// create the genesis block
let genesisBlock = new Block();
// create a blockchain with genesisBlock
let blockchain = new Blockchain(genesisBlock);

console.log(blockchain);
