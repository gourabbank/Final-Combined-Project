require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const {
  INFURA_PROJECT_ID,
  MNEMONIC,
  PRIVATE_KEY_RINKEBY,
  PRIVATE_KEY_RINKEBY_2,
  PRIVATE_KEY_KOVAN
} = process.env;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
      skipDryRun: true,
    },
    test: {
      host: '127.0.0.1',
      port: 8777,
      network_id: 777,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          [PRIVATE_KEY_RINKEBY, PRIVATE_KEY_RINKEBY_2],
          'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID
        ),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000,
      skipDryRun: true,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(PRIVATE_KEY_KOVAN, 'https://kovan.infura.io/v3/' + INFURA_PROJECT_ID)
      },
      network_id: '42',
      gas: 4465030,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, 'https://ropsten.infura.io/v3/' + INFURA_PROJECT_ID)
      },
      network_id: '3',
      gas: 4465030,
      gasPrice: 10000000000,
    },
    main: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://mainnet.infura.io/v3/' + INFURA_PROJECT_ID),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000,
    },
  },
  plugins: ['solidity-coverage'],
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '^0.5.0',
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: 'petersburg'
    }
  }
};
