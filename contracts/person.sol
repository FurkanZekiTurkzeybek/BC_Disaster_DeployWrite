pragma solidity ^0.4.17;

contract Person {
    string private name;
    string private surname;
    string private SSN;
    string private homeAddress;

    event AddressChanged(string oldAddress, string newAddress);


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
}
