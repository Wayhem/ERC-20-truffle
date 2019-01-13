var VillaToken = artifacts.require("./VillaToken.sol");

contract('VillaToken', function(accounts){
    var tokenInstance;

    it('initializes the contract with the correct name and symbol', function(){
        return VillaToken.deployed()
        .then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        })
        .then(function(name) {
            assert.equal(name, 'Villa Token', 'has the correct name');
            return tokenInstance.symbol();
        })
        .then(function(symbol){
            assert.equal(symbol, 'VLLT', 'has the correct symbol');
            return tokenInstance.standard();
        })
        .then(function(standard){
            assert.equal(standard, 'Villa Token v1.0', 'has the correct standard');
        });
    });
    
    it('sets the totalsupply upon deployment', function(){
        return VillaToken.deployed()
        .then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        })
        .then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0])
        })
        .then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 1000000, 'allocates initial supply to the admin account');
        });
    });

    it('transfers token ownership', function() {
        return VillaToken.deployed().then(function(instance){
            tokenInstance = instance;
            // test if available tokens are enough
            return tokenInstance.transfer.call(accounts[1],99999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'error must contain revert');
            return tokenInstance.transfer.call(accounts[1],250000, {from:accounts[0]});
        }).then(function(success){
            assert.deepEqual(success, true, 'returns true boolean');
            return tokenInstance.transfer(accounts[1], 250000, {from:accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account sending tokens');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account receiving the tokens');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the amount of tokens to be transferred');
            return tokenInstance.balanceOf(accounts[1]);
        }) .then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiver');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, 'removes amount from the sender');
        });
    });

    it('approves token for delegated transfer', function(){
        return VillaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success){
            assert.equal(success, true, 'it returns boolean');
            return tokenInstance.approve(accounts[1], 100);
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the owning account');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account receiving the permit');
            assert.equal(receipt.logs[0].args._value, 100, 'logs the amount of tokens to be allowed to transfer');
            return tokenInstance.allowance(accounts[0], accounts[1])
        })
        .then(function(allowance){
            assert.equal(allowance.toNumber(), 100, 'maps the account and amount allowed to spend');
        });
    });
});

