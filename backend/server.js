const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
var solc = require("solc");
const fs = require("fs");

const app = express();
dotenv.config();
app.use(cors());

let compiledContract, ABI, BYTECODE;

function compileContract(fileName, contractName) {
  const contractCode = fs.readFileSync(fileName).toString();

  let standardCompilerInput = {
      language: "Solidity",
      sources: {
          contract: {
              content: contractCode
          }
      },
      settings: {
          outputSelection: {
              "*": {
                  "*": ["abi", "evm.bytecode"]
              }
          }
      }
  };

  standardCompilerInput = JSON.stringify(standardCompilerInput);
  const output = solc.compile(standardCompilerInput);
  compiledContract = JSON.parse(output).contracts.contract[contractName];
  return compiledContract;
}

app.use(bodyParser.json());
const PORT = process.env.PORT || 8070;
app.route("/").post(async (req, res) => {
  const { name } = req.body;
  
  try{
    await compileContract("./contracts/sample.sol", "sample")
    ABI = JSON.stringify(compiledContract.abi);
    BYTECODE = "0x" + compiledContract.evm.bytecode.object;

    res.send({
      ABI: ABI,
      BYTECODE: BYTECODE
    });

  }catch(err){
    console.log(err);
  }
  
});
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
