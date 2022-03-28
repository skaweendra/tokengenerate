import "./App.css";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import fs from "fs";
import axios from "axios";
import { Transaction } from "ethereumjs-tx";

function App() {
  const [web3, setWeb3] = useState("");
  const [user, setUser] = useState("");

  let compiledContract;

  const MetaMask = async (e) => {
    try {
      if (window.ethereum) {
        const web3Instence = new Web3(window.ethereum);
        setWeb3(web3Instence);
        try {
          window.ethereum.enable().then(async () => {
            // User has allowed account access to DApp...
            const accounts = await web3Instence.eth.getAccounts();
            console.log("Account : ", accounts[0]);
            const data = accounts[0];

            setUser(data);
          });
        } catch (e) {
          // User has denied account access to DApp...
        }
      }
      // Legacy DApp Browsers
      else if (window.web3) {
        const web3Instence = new Web3(window.web3.currentProvider);
        setWeb3(web3Instence);
      }
      // Non-DApp Browsers
      else {
        //alert('No Dapp Supported Wallet Found');
        console.log("No Dapp Supported Wallet Found");
      }
    } catch (e) {}
  };

  const [inputs, setInputs] = useState({
    name: '',
    symbol: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  // function compileContract(fileName, contractName) {
  //   const contractCode = fs.readFileSync(fileName).toString();

  //   let standardCompilerInput = {
  //     language: "Solidity",
  //     sources: {
  //       contract: {
  //         content: contractCode,
  //       },
  //     },
  //     settings: {
  //       outputSelection: {
  //         "*": {
  //           "*": ["abi", "evm.bytecode"],
  //         },
  //       },
  //     },
  //   };

  //   standardCompilerInput = JSON.stringify(standardCompilerInput);
  //   const output = solc.compile(standardCompilerInput);
  //   compiledContract = JSON.parse(output).contracts.contract[contractName];
  //   return compiledContract;
  // }

  // const deopycontract = async () => {
  //   await compileContract("./solcs/sample.sol", "tokengen");
  //   console.log(user);

  //   let abi = compiledContract.abi;

  //   let bytecode = "0x" + compiledContract.evm.bytecode.object;

  //   let deploy_contract = new web3.eth.Contract(JSON.parse(abi));

  //   let payload = {
  //     data: bytecode,
  //   };

  //   let parameter = {
  //     from: user,
  //     gas: web3.utils.toHex(800000),
  //     gasPrice: web3.utils.toHex(web3.utils.toWei("30", "gwei")),
  //   };

  //   // Function Call
  //   deploy_contract
  //     .deploy(payload)
  //     .send(parameter, (err, transactionHash) => {
  //       console.log("Transaction Hash :", transactionHash);
  //     })
  //     .on("confirmation", () => {})
  //     .then((newContractInstance) => {
  //       console.log(
  //         "Deployed Contract Address : ",
  //         newContractInstance.options.address
  //       );
  //     });
  // };
  console.log(web3);

  const deopycontract = () => {
    axios
      .post("http://localhost:8070/", {
         name: String(inputs.name),
         symbol: String(inputs.symbol),
        gas_fee: "0.1",
      })
      .then((res) => {
        console.log(res.data);

        let abi = res.data.ABI;
        let bytecode = res.data.BYTECODE;

         

         console.log(abi);
         console.log(bytecode);

        let deploy_contract = new web3.eth.Contract(JSON.parse(abi));

        let payload = {
          data: bytecode,
        };

        let parameter = {
          from: user,
          gas: web3.utils.toHex(1800000),
          gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
        };

        // Function Call
        deploy_contract
          .deploy(payload)
          .send(parameter, (err, transactionHash) => {
            console.log("Transaction Hash :", transactionHash);
          })
          .on("confirmation", () => {})
          .then((newContractInstance) => {
            console.log(
              "Deployed Contract Address : ",
              newContractInstance.options.address
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <button onClick={MetaMask}>connect</button><br/>
      <form onSubmit={handleSubmit}>
      <input type="text" value={inputs.name} onChange={handleChange} placeholder="Token Name" name="name" /><br/>
      <input type="text" value={inputs.symbol} onChange={handleChange} placeholder="Token Symbol" name="symbol"/><br/>
      <button onClick={deopycontract}>deploy token</button><br/>
      </form>
    </div>
  );
}

export default App;
