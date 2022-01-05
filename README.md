This is a simple Solana program that creates comments and a React web app uses the program. I did this project to learn about writing and using Solana programs. Should not be used in production. At the moment this project only supports using the Phantom browser wallet. 

# Resources
This project is created with the help of:
- https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291
- https://github.com/dabit3/complete-guide-to-full-stack-solana-development
- https://github.com/solana-labs/example-helloworld

# Prerequisites
- Node.js
- Solana Tool Suite
- Anchor
- Phantom, Solana browser wallet

# Getting started (devnet, default)
1. Go to /client, run "yarn" or "npm install", then run "npm start"

# Getting started (localhost)
1. Follow this guide https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291 for the backend part
2. Make sure that you are running this on localhost
3. backend/Anchor.toml > replace "devnet" with "localhet"
4. client/src/App.tsx > replace 'clusterApiUrl("devnet")' with '"http://127.0.0.1:8899"'
5. Go to /client, run "yarn" or "npm install", then run "npm start"
