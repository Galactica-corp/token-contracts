# Galactica Network Tokens

This is a simple project for the tokens of Galactica Network

## Install
```shell
git clone git@github.com:Galactica-corp/token-contracts.git
cd token-contracts
yarn install
```

## Test
```shell
yarn hardhat test
```

## Deployment
To interact on-chain, you also need to provide hardhat with the private key to the account. This is done through environment variables as defined in `lib/hardhatUtils.ts`.

```shell
yarn hardhat ignition deploy ignition/modules/Gnet.m.ts --verify --network sepolia
```
