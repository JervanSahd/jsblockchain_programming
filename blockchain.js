// allows to create the hash
const sha256 = require("js-sha256");

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
  generateHash(block) {
    // generates new hash with help of npm package js-sha256
    const hash = sha256(block.key);
    return hash;
  }
}

module.exports = Blockchain;
