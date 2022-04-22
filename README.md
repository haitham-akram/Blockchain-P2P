# Blockchain-P2P

### Haitham Akram

## Includes 2 files for the p2p network in '/app':

#### Index

Manages the network's p2p connections, API

#### P2P-server

Creates new P2P network, responsible for broadcasting the new chain/transaction between all parties

## Includes 6 files for the blockchain app in '/src':

#### Wallet::

Creates new wallet, adds new transactions by wallet owner and signs them

#### MemPool::

The blockchain network's pending transactions, waiting to be mined by miners

#### Transaction::

Creates new transaction

#### Block::

Creates new block

#### Blockchain::

Creates the new blockchain

#### Merkle::

Creates a new Merkle tree for a block

# Installation Instructions

After cloning, enter npm install to install all dependencies

Run in CMD "npm run start" to open 1st node
In order to open 2nd socket, enter "set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && np
m run start" in CMD
To open 3rd node, enter set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && npm run start
And so on ...

# How to Use

After that open postman ...
To see the blocks in blockchain use -> localhost:3001/blocks this for first peer and you can do it for the second peer by changing the HTTP_PORT to 3002.
To see the transactions in mempool use-> localhost:3001/memPool.
To create teansaction -> first use localhost:3001/transact.
then you need to add {"to"=>"to the address you want","amount"=>30} in the body of request.
To start mining block use -> localhost:3001/mine.
