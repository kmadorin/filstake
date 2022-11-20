const util = require("util");
const request = util.promisify(require("request"));

task('get-miner-owner', 'Gets FIL balance on the address')
	.setAction(async (taskArgs) => {
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

		const accounts = await ethers.getSigners();
		const account = accounts[0];
		const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
		// const balance = await ethers.provider.getBalance(account.address);
		// console.log(balance.toString());

		const minerAPIFactory = await ethers.getContractFactory("MinerAPI");
		const minerAPI = minerAPIFactory.attach("0xE44A81aE64D08651f37B858E0179e0AEB211F91e");

		await minerAPI.change_owner_address(account.address, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    });
		const owner = await minerAPI.get_owner();

		console.log(owner);
	})