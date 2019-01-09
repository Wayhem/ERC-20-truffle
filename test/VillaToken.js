var VillaToken = artifacts.require("./VillaToken.sol");

contract('VillaToken', function(accounts){
    it('sets the totalsupply upon deployment', function(){
        return VillaToken.deployed()
        .then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        })
        .then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
        });
    });
});