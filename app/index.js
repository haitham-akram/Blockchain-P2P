const express = require("express");
const bodyParser = require("body-parser");
const { P2pServer } = require("./p2p-server");

const { Blockchain } = require("../src/blockchain");
const { Transaction } = require("../src/transaction");
const { Wallet } = require("../src/wallet");
const { MemPool } = require("../src/mempool");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
var mp = new MemPool();
const p2pServer = new P2pServer(bc, mp);

app.use(bodyParser.json());
// get request for geting all blocks in blockchain
app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});
// get request for geting all transactions from mempool
app.get("/memPool", (req, res) => {
  res.json(mp.transactions);
});
// get request for get public key of the wallet
app.get("/public", (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});
// post request for send transaction from wallet to another wallet
app.post("/transact", (req, res) => {
  const { to, amount } = req.body;
  const tx = wallet.createTransaction(wallet.publicKey, to, amount);
  p2pServer.broadcastTransaction(tx);
  mp.transactions.push(tx);
  res.redirect("/memPool");
});
// post request for mine a block
app.post("/mine", (req, res) => {
  bc.mineMemPool(wallet.publicKey, mp);

  p2pServer.syncChains();

  res.redirect("/blocks");
});
//start listen on port 3001 on first run
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
