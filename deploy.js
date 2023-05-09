//firebase init start
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let userRef = db.collection("Users");
//firebase init end


//ethereum init starts
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    'evoke abuse cigar skate stay mercy avocado dilemma mass token spider napkin',
    'https://sepolia.infura.io/v3/2af035557b3b4dcd9f3278edb7eb7453'
);

const web3 = new Web3(provider);
//ethereum init ends.
const express = require('express');
const { Server } = require('ws');
const PORT = process.env.PORT || 3000;

const server = express()
    .use((req, res) => res.send("Hi there"))
    .listen(PORT, () => console.log('Listening on port ${PORT}'));
const wss = new Server({ server });

wss.on('connection', async function (ws, req) {
    await ws.on('message', async message => {
        var dataString = message.toString();
        console.log(dataString)
        const input = dataString.split(" ");
        if (dataString != null) {
            await deploy(input[0], input[1], input[2], input[3]);
            // console.log("Input is recieved");

        } else {
            console.log("data string is null");
        }
    })
})

// let name = 'def name';
// let surnmae = 'def surname';
// let SSN = 'def SSN';
// let address = 'def address';

const deploy = async (pName, pSurname, pSSN, pAddress) => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [pName, pSurname, pSSN, pAddress]})
        .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
    const hashCode = result.options.address;
    const data = {
        id: 2,
        name: pName,
        surname: pSurname,
        SSN: pSSN,
        address: pAddress,
        hash: hashCode
    }

    db.collection("Users").add(data);
    provider.engine.stop();
};

//This function is for testing
function write() {
    const contract = new web3.eth.Contract(JSON.parse(interface),
        "0xb606000473A11a0e835ea8768226670f08239d7C");

    contract.methods.setSafe().send({from: "0x1cEDc507F8478ECAc0fc6b710c8C039050AD0aa8"})
        .then(function (receipt) {
            console.log(receipt);
        });
}

