const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require("./merkle");

class Header {
  constructor(
    version = 0,
    difficulty = 0,
    timestamp,
    merkleRoot = 0,
    previousHash = ""
  ) {
    this.version = version;
    this.difficulty = difficulty;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.merkleRoot = merkleRoot;
    this.nonce = 0;
  }
}

class Block {
  constructor(header, transactions, transaction_count) {
    this.header = header;
    this.transactions = transactions; // Array of Transaction
    this.transaction_count = transaction_count;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      JSON.stringify(this.header) +
        JSON.stringify(this.transactions) +
        this.transaction_count
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.header.nonce++;
      this.hash = this.calculateHash();
    }

    this.header.difficulty = difficulty;

    this.createMerkle();
  }

  createMerkle() {
    this.merkle = new MerkleTree(this.transactions.map((x) => x.hash));
    this.header.merkleRoot = this.merkle.getRoot().toString();
  }

  hasValidTransactions() {
    for (const transaction of this.transactions) {
      if (!transaction.isTransactionValid()) {
        return false;
      }
    }
    return true;
  }

  toString() {
    return `*Block*:
      Hight:  ${this.hight}
      Header:     ${JSON.stringify(this.header)}
      Transactions:  ${this.transactions}
      Transaction_Count:  ${this.transaction_count}
      `;
  }
}

module.exports.Block = Block;
module.exports.Header = Header;
