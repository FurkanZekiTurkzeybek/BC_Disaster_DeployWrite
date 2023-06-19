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


const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/person", async (req, res) => {
    const {name, surname, address, ssn, password} = req.body;
    console.log(
        `Received person data: name=${name}, surname=${surname}, address=${address}, ssn=${ssn}, password=${password}`
    );

    await deploy(name, surname, address, ssn, password).then(returnedPerson => {
        res.send(returnedPerson);
    });

});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const deploy = async (pName, pSurname, pAddress, pSSN, pPassword) => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [pName, pSurname, pSSN, pAddress]})
        .send({gas: '5000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
    const hashCode = result.options.address;
    const data = {
        SSN: pSSN,
        hash: hashCode,
        password: pPassword
    }

    setState(result);
    db.collection("Users").add(data);
    return hashCode;
    // provider.engine.stop();
};

//This function is for testing
// function write() {
//     const contract = new web3.eth.Contract(JSON.parse(interface),
//         "0xb606000473A11a0e835ea8768226670f08239d7C");
//
//     contract.methods.setSafe().send({from: "0x1cEDc507F8478ECAc0fc6b710c8C039050AD0aa8"})
//         .then(function (receipt) {
//             console.log(receipt);
//         });
// }

function setState(pContract) {
    pContract.methods.setSafe().send({from: "0x1cEDc507F8478ECAc0fc6b710c8C039050AD0aa8"})
        .then(function (receipt) {
            console.log(receipt);
        });
}




// async function setContract() {
//     const contract = new web3.eth.Contract(JSON.parse(interface),
//         "0xF27aFDD4a6886076F434F0d8C6C2427BF6e3d666");
//     contract.methods.setSa().send({from: "0x1cEDc507F8478ECAc0fc6b710c8C039050AD0aa8"});
// }



