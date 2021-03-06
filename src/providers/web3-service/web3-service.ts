import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Web3 from 'web3';

/*
  Generated class for the Web3ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3ServiceProvider {

  web3: any;
  icoContract: any;
  icoContractAddress: string;
  accountAddress: string;
  contract:any;

  constructor(public http: HttpClient) {
    console.log('Hello Web3ServiceProvider Provider');
    this.icoContractAddress = '0xcf5d7db4b239583d830a053ceb17d55ddea6cdc9';
    

    console.log("WEB3 ===>",typeof window['web3']);
    
    // if (typeof window['web3']  !== 'undefined') {
    if (typeof window['web3'] !== 'undefined') {
          // this.web3 = new Web3(window.web3.currentProvider);
          // this.web3 = new Web3(window['web3'].currentProvider);
          this.web3 = new Web3(window['web3'].currentProvider);
    } else {
          this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

        // Step 2: Set default account (address)
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        this.accountAddress = this.web3.eth.defaultAccount;
        console.log("Got default account ==>",this.web3.eth.defaultAccount);
        
        // Step 3: Get Interface to the contact - ABI from remix
        let abi = [
          {
            "constant": true,
            "inputs": [],
            "name": "getMinPerContributorn",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "getContribution",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getContributors",
            "outputs": [
              {
                "name": "",
                "type": "address[]"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "getTokenBalance",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "alreadyContributed",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getPoolCreator",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getPoolBalance",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMyContribution",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMaxPerContributor",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMaxPoolAllocation",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getRegisteredTokenSupply",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "DepositForTokenReceived",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "contributor",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawal",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "contribution",
                "type": "uint256"
              }
            ],
            "name": "setMinPerContributorn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "contribute",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "depositToken",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "maxPoolAllocation1",
                "type": "uint256"
              },
              {
                "name": "maxPerContributor1",
                "type": "uint256"
              },
              {
                "name": "minPerContributor1",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "tokens",
                "type": "uint256"
              }
            ],
            "name": "distributeTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "tokenAddress",
                "type": "address"
              }
            ],
            "name": "registerToken",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "tokenAddress",
                "type": "address"
              },
              {
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "registerAndDeposit",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawContribution",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
        this.contract = this.web3.eth.contract(abi);
        // this.createPool();

         // Step 4: Get Contract instance at the address from remix
     this.icoContract = this.contract.at(this.icoContractAddress);
     console.log("Got the smart contract ==> " , this.icoContract);
     
  }

 

  getContractAddress(){
    if(this.icoContract) {
      console.log('Returning contract address',this.icoContract.address);
      return this.icoContract.address;
   }
  }

  depositTokens(tokenAddress:string,tokenAmount:number) {
    let p = new Promise<any>((resolve, reject) => {
      this.icoContract.registerAndDeposit(tokenAddress,tokenAmount,function(error,result){
        if(!error) {
          console.log('Successfuly registered and deposited',result);
          resolve();
        } else {
          console.log('Error while depositing or registering token',error);
          reject();
          
        }
      });
  });
  return p;
}

  // contribute(amount) {
  //   amount = amount * 1000000000000000000;
  //   console.log('Calling contribute on smart contract' , amount);
  //   let res = this.icoContract.contribute({value:amount, gas:3000000});
  //   console.log('Result ===> ',res);
  // }
   contribute(amount) {
      amount = amount * 1000000000000000000;
      // var value = this.web3.fromWei(amount, 'ether');
      console.log('Calling contribute on smart contract' , amount);
      let p = new Promise<any>((resolve, reject) => {
        let that = this;
          return this.icoContract.contribute({value:amount, gas:3000000},function(error,result){
            if (!error) {
              let res = that.web3.fromWei(result.toString(), 'ether');
              console.log('Contribution Successful: ',res);
              resolve();
              that.refresh();
            } else {
              console.error(error);
              reject(error);
            }
          });

      });
      return p;
      
  }

  // getPoolBalance() {
  //   let res = this.icoContract.getPoolBalance({gas:3000000});
  //   console.log("Pool Balance ==> ", res.toString());
  //   return  this.web3.fromWei(res, 'ether');
  // }

  getPoolBalance() {
    let that = this;
    console.log('Getting pool balance for contract address..',that.icoContract);
    
    let p = new Promise<any>((resolve, reject) => {
        return  that.icoContract.getPoolBalance({gas:3000000},function(error, result) {
          if (!error) {
            let res = that.web3.fromWei(result.toString(), 'ether');
            console.log('Current Pool Balance: ' ,res);
            resolve(res);
          } else {
            console.error(error);
            reject(error);
          }
        });
    });
    return p;
  }

  // getMyCurrentBalance() {
    // var balance = this.web3.eth.getBalance(this.web3.eth.defaultAccount);
    // console.log(balance); 
    // console.log(balance.toString(10)); 
    // return this.web3.fromWei(balance, 'ether');
  // }

  getMyCurrentBalance() {
    let p = new Promise<any>((resolve, reject) => {
      let that = this;
      return this.web3.eth.getBalance(that.web3.eth.defaultAccount, function (error, result) {
        if (!error) {
          let res = that.web3.fromWei(result.toString(), 'ether');
          console.log('Current Balance: ' ,res);
          resolve(res);
        } else {
          console.error(error);
          reject(error);
        }
      });
    }); 
    return p;
  }


  getMyAccount() {
    return this.accountAddress;
  }

  getTokenBalance(addr: any) {
    let that = this;
    addr = that.web3.eth.defaultAccount;
    let p = new Promise<any>((resolve, reject) => {
    return  this.icoContract.getTokenBalance(addr,{gas:3000000},function(e,result){
        if(!e) {
          // let res = that.web3.fromWei(result.toString(), 'ether');
          console.log('Token Balance for : ' + addr + ' is : ',result);
          resolve(result);
        } else {
          console.error(e);
          reject(e);
        }

      })

    });
    return p;
  }


  // getMyContribution() {
  //   let res = this.icoContract.getMyContribution({gas:3000000});
  //   console.log('My contribution: ', res.toString());
  //   return this.web3.fromWei(res, 'ether');
  // }

  getMyContribution() {
    let that = this;
    let p = new Promise<any>((resolve, reject) => {
      return this.icoContract.getMyContribution({gas:3000000},function(error,result){
        if (!error) {
          let res = that.web3.fromWei(result.toString(), 'ether');
          console.log('My Contribution: ' ,res);
          resolve(res);
        } else {
          console.error(error);
          reject(error);
        }
      });

    });
    return p;
  }

  // withdrawContribution(amount) {
  //   let res = this.icoContract.withdrawContribution(amount,{gas:3000000});
  //   console.log('Withdrawal result: ', res);
  //   return res;
  // }

  withdrawContribution(amount) {
    amount = amount * 1000000000000000000;
    let that = this;
    let p = new Promise<any>((resolve, reject) => {
      this.icoContract.withdrawContribution(amount,{gas:3000000},function(error,result){
        if (!error) {
          // let res = that.web3.fromWei(result.toString(), 'ether');
          console.log('Withdrawal Successful: ');
          resolve();
          that.refresh();
        } else {
          console.error(error);
          reject(error);
        }
      });
    });
    return p; 

  }


  refresh() {
    this.getMyCurrentBalance();
  }

}
