import { ethers } from 'ethers'

import abi from '../utils/Keyboards.json'

const contractAddress = '0xa64164F4fe4c4ae943cc471b08bF0c32409592D8'
const contractABI = abi.abi

const  getKeyboardsContract = (ethereum) => {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
  }
  return undefined
}

export default getKeyboardsContract