# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

//project commands

npx create-next-app@latest --> install next 

npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers web3modal @openzeppelin/contracts ipfs-http-client axios --> all command at one.

npm install -D tailwindcss postcss autoprefixer ---> css
npx tailwindcss init -p 

npx hardhat --> install hardhat

infura key --> https://polygon-mumbai.infura.io/v3/a96d2bef1ec94bbf9c0896eb24198971

setup hardhat

test command
npx hardhat test

compile contract
npx hardhat compile

get accounts and run before deploy command for getting deployed address
npx hardhat node

deploy
npx hardhat run scripts/deploy.js --network mumbai