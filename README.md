# Muzon

<img width="1000" alt="559" src="https://user-images.githubusercontent.com/87542822/236741088-25b89b39-9c84-4a22-9547-8607680f13db.png">


CPSC 559 - Advance Blockchain Technology  Final Project By Team DOGE

Team members: • Divyansh Mohan Rao : divyanshrao@csu.fullerton.edu (885191403)

• Janhvi Guha: jguha@csu.fullerton.edu (885186973)

• Harshavardhan Jemedar : harsha_jemedar@csu.fullerton.edu (885191015)

• Shrinivas Patil : pshrinivas264@csu.fullerton.edu (885212043)

Professor Prof. Wenlin Han, CSU Fullerton: whan@fullerton.edu

### Work Done:


• Created Decentralized Retail app by following Online article https://www.dappuniversity.com/videos/X1ahXNYkpL8 Which inluded function to buy a item.

• Created Music NFT Marketplace app by following Online article: https://www.dappuniversity.com/videos/Q_cxytZZdnc which included function to buy and resell NFT.

• Combined both the application for one place stop for all Music needz.

• Used IPFS Decentralized file storage to deploy images and songs.

• Used hardhat instead of truffle to create contract developemnt environment.

• Added Feature to UI and Contract to Rent a Music NFT.

• Added Feature to UI and Contract to Extend a Music NFT.

• Added Feature to UI and Contract to Subscribe to Music Classes.

• Added Feature to UI and Contract to Unsubscribe to Music Classes.

• Added Feature to UI and Contract to For Dynamic pricing based on stock availability.

• Added Feature to UI and Contract to get all purchased items and show it in the Myitems page.

• Deployed the Contracts to Sepolia Test Network.

• Added code to dynamically store deployed contact address for front end use.





Project Repo URL https://github.com/divyanshrao38/muzon.git


Instructions: Requirements: 
• Metamask account

• Node.js

• npx-create-react-app

• hardhat


## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

## for deploying in sepolia testnet
`$ npx hardhat run ./scripts/deploy.js --network sepolia`

### 6. Start frontend
`$ npm run start`
