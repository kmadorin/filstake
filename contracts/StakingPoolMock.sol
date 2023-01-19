pragma solidity 0.8.17;

import "./TokenMock.sol";

contract StakingPoolMock {
	TokenMock stToken;

	constructor(string memory name, string memory symbol) {
		stToken = new TokenMock(name, symbol);
	}

	fallback() external payable {
    // protection against accidental submissions by calling non-existent function
    require(msg.data.length == 0, "NON_EMPTY_DATA");
    _deposit();
  }

  function deposit() external payable returns (uint256) {
  	return _deposit();
  }

  function getBalance(address account) external view returns (uint256) {
  	return stToken.balanceOf(account);
  }

  function _deposit() internal returns (uint256) {
  	require(msg.value != 0, "ZERO_DEPOSIT");
  	stToken.mint(msg.sender, msg.value);
  	return msg.value;
  }
}