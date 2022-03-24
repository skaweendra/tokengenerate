const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
var solc = require("solc");
const fs = require("fs");

const app = express();
dotenv.config();
app.use(cors());

let compiledContract;

function compileContract(fileName, contractName) {
  const contractCode = fs.readFileSync(fileName).toString();

  let standardCompilerInput = {
    language: "Solidity",
    sources: {
      contract: {
        content: contractCode,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };

  standardCompilerInput = JSON.stringify(standardCompilerInput);
  const output = solc.compile(standardCompilerInput);
  compiledContract = JSON.parse(output).contracts.contract[contractName];
  console.log(compileContract.abi);
  return compiledContract;
}

app.use(bodyParser.json());
const PORT = process.env.PORT || 8070;
app.route("/").post(async (req, res) => {
  const { name } = req.body;

  console.log(compileContract("./sample.sol", "sample"));

  res.send({
    data: compiledContract,
  });
});
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
