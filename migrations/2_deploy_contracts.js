var VillaToken = artifacts.require("./VillaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(VillaToken, 1000000);
};
