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
const{interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    'evoke abuse cigar skate stay mercy avocado dilemma mass token spider napkin',
    'https://sepolia.infura.io/v3/2af035557b3b4dcd9f3278edb7eb7453'
);

const web3 = new Web3(provider);
//ethereum init ends.



let name = 'def name';
let surnmae = 'def surname';
let SSN = 'def SSN';
let address = 'def address';

const deploy = async ()=> {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [name,surnmae,SSN,address]})
    .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to',result.options.address);
    const hashCode = result.options.address;
    const data = {
    id: 2,
    name : name,
    surname : surnmae,
    SSN : SSN,
    address : address,
    hash : hashCode
}

    db.collection("Users").doc(data.id.toString()).set(data);
    provider.engine.stop();
};

deploy();