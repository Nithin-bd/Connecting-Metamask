// IERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Airdrop {
    address public owner;
    IERC20 public token;

    event TokensAirdropped(address indexed beneficiary, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function airdropTokens(address[] memory beneficiaries, uint256[] memory amounts) external onlyOwner {
        require(beneficiaries.length == amounts.length, "Invalid input lengths");

        for (uint256 i = 0; i < beneficiaries.length; i++) {
            address beneficiary = beneficiaries[i];
            uint256 amount = amounts[i];

            require(beneficiary != address(0), "Invalid beneficiary address");
            require(amount > 0, "Invalid amount");

            // Transfer tokens to the beneficiary
            token.transfer(beneficiary, amount);

            // Emit an event for the airdrop
            emit TokensAirdropped(beneficiary, amount);
        }
    }

    function checkBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
