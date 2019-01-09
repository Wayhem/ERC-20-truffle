pragma solidity >=0.4.21 <0.6.0;

contract  VillaToken {
    //read the total amount of tokens
    uint256 public totalSupply;
    //constructor
    constructor () public {
        //set total tokens
        totalSupply = 1000000;
    }
}