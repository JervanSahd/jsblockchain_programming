// allows to create the hash
const sha256 = require("js-sha256");

const Block = require("./block");

class Blockchain {
  constructor(genesisBlock) {
    this.blocks = [];
    // function to add the block to the blockchain
    this.addBlock(genesisBlock);
  }

  addBlock(block) {
    // check if this is the genesis block
    if (this.blocks.length == 0) {
      // the first block is added/ with palceholder value
      block.previousHash = "0000000000000000";
      block.hash = this.generateHash(block);
    }
    // pushes block to blockchain
    this.blocks.push(block);
  }
  //   sends array of transaction
  getNextBlock(transactions) {
    let block = new Block();
    transactions.forEach((transaction) => {
      // adds transaction to the block
      block.addTransaction(transaction);
    });
    // get access to previous hash
    let previousBlock = this.getPreviousBlock();
    block.index = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);
    return block;
  }
  //   returns previous block
  getPreviousBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  generateHash(block) {
    // generates new hash with help of npm package js-sha256
    let hash = sha256(block.key);
    // will create a hash with 3 or 4 zeros
    // if not the nonce
    while (!hash.startsWith("0000")) {
      block.nonce += 1;
      hash = sha256(block.key);
      console.log(hash);
    }
    return hash;
  }
}

module.exports = Blockchain;
