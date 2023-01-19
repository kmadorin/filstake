const util = require("util");
const request = util.promisify(require("request"));

task('stake-fil', 'Stakes FIL to the liquid staking pool')
	.setAction(async (taskArgs) => {
		const accounts = await ethers.getSigners();
		const signer = accounts[0];

		const stakingPoolAddress = '0xF7E28CFDa8e197EcC4b37E9D913E979b9F89A183';
		const StakingPool = await ethers.getContractFactory("StakingPoolMock");

		const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    async function callRpc(method, params) {
        var options = {
          method: "POST",
          url: "https://wallaby.node.glif.io/rpc/v0",
          // url: "http://localhost:1234/rpc/v0",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
          }),
        };
        const res = await request(options);
        return JSON.parse(res.body).result;
      }

    const amount = 100;
    const stakingPoolContract = new ethers.Contract(stakingPoolAddress, StakingPool.interface, signer)
    console.log("Staking:", amount)
    // const result = await stakingPoolContract.getBalance()
    const result = await stakingPoolContract.deposit({
    		value: amount,
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    })

    console.log(result);
    // let result = BigInt(await simpleCoinContract.getBalance(toAccount)).toString()
    // console.log("Total SimpleCoin at:", toAccount, "is", result)
	})