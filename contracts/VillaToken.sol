pragma solidity >=0.4.21 <0.6.0;

contract  VillaToken {
    //read the total amount of tokens
    uint256 public totalSupply;
    //name
    string public name = "Villa Token";
    //symbol
    string public symbol = "VLLT";
    //standard
    string public standard = "Villa Token v1.0";
    //event transfer
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value    
    );
    //balances
    mapping (address=>uint256) public balanceOf;
    //constructor
    constructor (uint256 _initialSupply) public {
        //allocate balance to manager
        balanceOf[msg.sender] = _initialSupply;
        //set total tokens
        totalSupply = _initialSupply;
    }
    //transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        //exception if account does not have enough
        require(
            balanceOf[msg.sender] >= _value,
            "Not enough tokens to transfer"
            );
        //transfer action
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //transfer event
        emit Transfer(msg.sender, _to, _value);
        //return success status
        return true;
    }
}