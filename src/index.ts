import { ethers } from "ethers";
import { IUniswapV2Router02__factory } from "../types/factories/IUniswapV2Router02__factory";

const INFURA_PROJECT_ID = "your_infura_project_id";
const PRIVATE_KEY = "your_private_key";
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Uniswap V2 Router Address
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "homestead",
    INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const router = IUniswapV2Router02__factory.connect(
    UNISWAP_ROUTER_ADDRESS,
    wallet
  );

  const amountOutMin = ethers.utils.parseUnits("0.1", 18); // 0.1 ETH
  const amountIn = ethers.utils.parseUnits("1000", 6); // 1000 USDC

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

  const swap = await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn,
    amountOutMin,
    [USDC_ADDRESS, WETH_ADDRESS],
    wallet.address,
    deadline
  );

  console.log("Transaction Hash:", swap.hash);
}

main().catch((error) => {
  console.error("Error:", error);
});
