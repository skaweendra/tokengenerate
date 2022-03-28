fs  = require("fs")

function BEP20(name,symbol,gas_fee){

    var modifiedName = "\""+name+"\"";
    var modifiedSymbol = "\""+symbol+"\"";
    contract_code = "// SPDX-License-Identifier: MIT\n pragma solidity ^0.8.7;\r\n contract token{\r\n\t mapping(address => uint) public balance;\r\n\t mapping(address => mapping(address => uint)) public allowance;\r\n\t uint public totalSupply = 10000 * 10 ** 18;\r\n\t string public name = "+modifiedName+";\r\n\t string public symbol = "+modifiedSymbol+";\r\n\t uint public decimals = 18;\r\n\t event Transfer(address indexed from, address indexed to, uint value);\r\n\t event Approval(address indexed owner, address indexed spender, uint value);\r\n\t constructor(){\r\n\t\t balance[msg.sender] = totalSupply;\r\n\t }\r\n\t function balanceOf(address owner)public view returns(uint){\r\n\t\t return balance[owner];\r\n\t }\r\n\t function transfer(address to, uint value) public returns(bool){\r\n\t\t require(balanceOf(msg.sender) >= value, 'balance too low');\r\n\t\t balance[to] += value;\r\n\t\t balance[msg.sender] -= value;\r\n\t\t emit Transfer(msg.sender, to, value);\r\n\t\t return true;\r\n\t }\r\n\t function transferFrom(address from, address to, uint value) public returns(bool){\r\n\t\t require(balanceOf(from) >= value, 'balance too low');\r\n\t\t require(allowance[from][msg.sender]>= value, 'allowance too low');\r\n\t\t balance[to] += value;\r\n\t\t balance[from] -= value;\r\n\t\t emit Transfer(from, to, value);\r\n\t\t return true;\r\n\t }\r\n\t function approve(address spender, uint value) public returns(bool){\r\n\t\t allowance[msg.sender][spender] = value;\r\n\t\t emit Approval(msg.sender, spender, value);\r\n\t\t return true;\r\n\t }\r\n }"
    fs.writeFileSync("./user_contracts/"+name+".sol", contract_code);

}

module.exports = { BEP20 };