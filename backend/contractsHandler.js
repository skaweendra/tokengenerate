fs  = require("fs")

function BEP20(name,symbol,gas_fee){

    var modifiedName = "\""+name+"\"";
    var modifiedSymbol = "\""+symbol+"\"";
    contract_code = "// SPDX-License-Identifier: MIT\n//BEP20\npragma solidity ^0.8.7;\r\n contract token{\r\n\t mapping(address => uint) public balance;\r\n\t mapping(address => mapping(address => uint)) public allowance;\r\n\t uint public totalSupply = 10000 * 10 ** 18;\r\n\t string public name = "+modifiedName+";\r\n\t string public symbol = "+modifiedSymbol+";\r\n\t uint public decimals = 18;\r\n\t event Transfer(address indexed from, address indexed to, uint value);\r\n\t event Approval(address indexed owner, address indexed spender, uint value);\r\n\t constructor(){\r\n\t\t balance[msg.sender] = totalSupply;\r\n\t }\r\n\t function balanceOf(address owner)public view returns(uint){\r\n\t\t return balance[owner];\r\n\t }\r\n\t function transfer(address to, uint value) public returns(bool){\r\n\t\t require(balanceOf(msg.sender) >= value, 'balance too low');\r\n\t\t balance[to] += value;\r\n\t\t balance[msg.sender] -= value;\r\n\t\t emit Transfer(msg.sender, to, value);\r\n\t\t return true;\r\n\t }\r\n\t function transferFrom(address from, address to, uint value) public returns(bool){\r\n\t\t require(balanceOf(from) >= value, 'balance too low');\r\n\t\t require(allowance[from][msg.sender]>= value, 'allowance too low');\r\n\t\t balance[to] += value;\r\n\t\t balance[from] -= value;\r\n\t\t emit Transfer(from, to, value);\r\n\t\t return true;\r\n\t }\r\n\t function approve(address spender, uint value) public returns(bool){\r\n\t\t allowance[msg.sender][spender] = value;\r\n\t\t emit Approval(msg.sender, spender, value);\r\n\t\t return true;\r\n\t }\r\n }"
    fs.writeFileSync("./user_contracts/"+name+".sol", contract_code);

}


function ERC20(name,symbol,gas_fee){

    var modifiedName = "\""+name+"\"";
    var modifiedSymbol = "\""+symbol+"\"";
    contract_code = "// SPDX-License-Identifier: MIT\n//ERC20\r\npragma solidity ^0.8.7;\r\n contract token {\r\n\t // Track how many tokens are owned by each address.\r\n\t mapping (address => uint256) public balanceOf;\r\n\t string public name = "+modifiedName+";\r\n\t string public symbol = "+modifiedSymbol+";\r\n\t uint8 public decimals = 18;\r\n\t uint256 public totalSupply = 1000000 * (uint256(10) ** decimals);\r\n\t event Transfer(address indexed from, address indexed to, uint256 value);\r\n\t function SimpleERC20Token() public {\r\n\t\t // Initially assign all tokens to the contract's creator.\r\n\t\t balanceOf[msg.sender] = totalSupply;\r\n\t\t emit Transfer(address(0), msg.sender, totalSupply);\r\n\t }\r\n\t function transfer(address to, uint256 value) public returns (bool success) {\r\n\t\t require(balanceOf[msg.sender] >= value);\r\n\t\t balanceOf[msg.sender] -= value; // deduct from sender's balance\r\n\t\t balanceOf[to] += value; // add to recipient's balance\r\n\t\t emit Transfer(msg.sender, to, value);\r\n\t\t return true;\r\n\t }\r\n\t event Approval(address indexed owner, address indexed spender, uint256 value);\r\n\t mapping(address => mapping(address => uint256)) public allowance;\r\n\t function approve(address spender, uint256 value)\r\n\t\t public\r\n\t\t returns (bool success)\r\n\t {\r\n\t\t allowance[msg.sender][spender] = value;\r\n\t\t emit Approval(msg.sender, spender, value);\r\n\t\t return true;\r\n\t }\r\n\t function transferFrom(address from, address to, uint256 value)\r\n\t\t public\r\n\t\t returns (bool success)\r\n\t {\r\n\t\t require(value <= balanceOf[from]);\r\n\t\t require(value <= allowance[from][msg.sender]);\r\n\t\t balanceOf[from] -= value;\r\n\t\t balanceOf[to] += value;\r\n\t\t allowance[from][msg.sender] -= value;\r\n\t\t emit Transfer(from, to, value);\r\n\t\t return true;\r\n\t }\r\n }"

    fs.writeFileSync("./user_contracts/"+name+".sol", contract_code);

}


module.exports = { BEP20,ERC20 } ;
// ERC20("newct","new",33);

