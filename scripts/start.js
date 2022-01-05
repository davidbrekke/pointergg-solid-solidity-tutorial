const main = async () => {
  const provider = hre.ethers.getDefaultProvider()
  const [owner, somebodyElse] = await hre.ethers.getSigners()
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    'Keyboards'
  )
  const keyboardsContract = await keyboardsContractFactory.deploy()
  await keyboardsContract.deployed()

  const keyboardTxn = await keyboardsContract.create(0, true, 'sepia')
  await keyboardTxn.wait()

  const tipTxn = await keyboardsContract
    .connect(somebodyElse)
    .tip(0, { value: hre.ethers.utils.parseEther('1') })
  const tipTxnReceipt = await tipTxn.wait()
  console.log(tipTxnReceipt.events)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// ;(async () => {
//   try {
//     const [owner, somebodyElse] = await hre.ethers.getSigners()

//     // get contract from contracts folder
//     const keyboardsContractFactory = await hre.ethers.getContractFactory(
//       'Keyboards'
//     )

//     // deploy contract and wait for it to be deployed
//     const keyboardsContract = await keyboardsContractFactory.deploy()
//     await keyboardsContract.deployed()
//     console.log('Contract deployed to:', keyboardsContract.address)

//     // call the contract to add a new keyboard via the create function
//     const keyboardTxn1 = await keyboardsContract.create(0, true, 'sepia')
//     await keyboardTxn1.wait()

//     const keyboardTx2 = await keyboardsContract
//       .connect(somebodyElse)
//       .create(1, false, 'grayscale')
//     await keyboardTx2.wait()

//     // fetch the list of keyboards from contract again to see the newly added keyboard
//     keyboards = await keyboardsContract.getKeyboards()
//     console.log('We got the keyboards!', keyboards)

//     keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards()
//     console.log('And as somebody else!', keyboards)

//     const balanceBefore = await hre.ethers.provider.getBalance(
//       somebodyElse.address
//     )
//     console.log(
//       'somebodyElse balance before!',
//       hre.ethers.utils.formatEther(balanceBefore)
//     )

//     const tipTxn = await keyboardsContract.tip(1, {
//       value: hre.ethers.utils.parseEther('1000'),
//     })
//     await tipTxn.wait()

//     const balanceAfter = await hre.ethers.provider.getBalance(
//       somebodyElse.address
//     )
//     console.log(
//       'somebodyElse balance after!',
//       hre.ethers.utils.formatEther(balanceAfter)
//     )
//   } catch (error) {
//     console.error(error)
//     process.exit(1)
//   }
//   process.exit(0)
// })()
