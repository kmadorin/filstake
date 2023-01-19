task('get-fil-balance', 'Gets FIL balance on the address')
	.setAction(async (taskArgs) => {
		const accounts = await ethers.getSigners();
		const account = accounts[0];
		console.log('account.address: ', account.address)
		const balance = await ethers.provider.getBalance(account.address);
		console.log(balance.toString());
	})