// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.7;
 contract token{
	 mapping(address => uint) public balance;
	 mapping(address => mapping(address => uint)) public allowance;
	 uint public totalSupply = 10000 * 10 ** 18;
	 string public name = "RandomToken";
	 string public symbol = "RTOKN";
	 uint public decimals = 18;
	 event Transfer(address indexed from, address indexed to, uint value);
	 event Approval(address indexed owner, address indexed spender, uint value);
	 constructor(){
		 balance[msg.sender] = totalSupply;
	 }
	 function balanceOf(address owner)public view returns(uint){
		 return balance[owner];
	 }
	 function transfer(address to, uint value) public returns(bool){
		 require(balanceOf(msg.sender) >= value, 'balance too low');
		 balance[to] += value;
		 balance[msg.sender] -= value;
		 emit Transfer(msg.sender, to, value);
		 return true;
	 }
	 function transferFrom(address from, address to, uint value) public returns(bool){
		 require(balanceOf(from) >= value, 'balance too low');
		 require(allowance[from][msg.sender]>= value, 'allowance too low');
		 balance[to] += value;
		 balance[from] -= value;
		 emit Transfer(from, to, value);
		 return true;
	 }
	 function approve(address spender, uint value) public returns(bool){
		 allowance[msg.sender][spender] = value;
		 emit Approval(msg.sender, spender, value);
		 return true;
	 }
 }