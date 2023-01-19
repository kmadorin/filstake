task("get-signers", "Get signers")
  .setAction(async (config, hre) => {
    console.log(hre.network)
    try {
      const signers = await ethers.getSigners();
      console.log(signers);
    } catch (e) {
      console.log(e)
    }
  })