// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20.sol";
import "./ERC20Burnable.sol";
import "./Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    constructor(string memory name,string memory symbol) ERC20("name", "symbol") {}

    
}
