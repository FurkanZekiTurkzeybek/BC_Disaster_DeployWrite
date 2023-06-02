pragma solidity ^0.4.17;

contract Person {
    string private name;
    string private surname;
    string private SSN;
    string private homeAddress;

    bool private isSafe = true;
    bool private needHelp = false;
    bool private isWreck = false;


    event AddressChanged(string oldAddress, string newAddress);

    event Safe(bool pSafe,string state);
    event Help(bool pHelp,string state);
    event Wreck(bool pWreck,string state);


    function Person(string pName, string pSurname, string pSSN, string pHomeAddress) public {
        name = pName;
        surname = pSurname;
        SSN = pSSN;
        homeAddress = pHomeAddress;

    }

    function getName() public view returns(string) {
        return name;
    }
    function getSurname() public view returns(string) {
        return surname;
    }
    function getSSN() public view returns(string) {
        return SSN;
    }
    function getHomeAddress() public view returns(string) {
        return homeAddress;
    }

    function setHomeAddress(string pAddress) public {
        string memory oldAddress = homeAddress;
        homeAddress = pAddress;
        AddressChanged(oldAddress, pAddress);
    }

    function getSafe() public view returns (bool) {
        return isSafe;
    }

    function getHelp() public view returns (bool) {
        return needHelp;
    }

    function getWreck() public view returns (bool) {
        return isWreck;
    }

    function setSafe() public {
        isSafe = true;
        needHelp = false;
        isWreck = false;
        string memory state = "safe";
        Safe(isSafe, state);
    }
    function setHelp() public {
        isSafe = false;
        needHelp = true;
        isWreck = false;
        string memory state = "help";
        Help(needHelp, state);
    }
    function setWreck() public {
        isSafe = false;
        needHelp = false;
        isWreck = true;
        string memory state = "wreck";
        Wreck(isWreck, state);
    }
}
