import "../styles/globals.css";
import Link from "next/link";
// import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  // const connectMetamask = async () => {
  //   let provider;
  //   ethereum.request({ method: 'eth_requestAccounts' }).then(provider = new ethers.providers.Web3Provider(window.ethereum));
  //   const signer = provider.getSigner();
  // };
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Dave NFT Market</p>
        <div className="flex mt-4"></div>
        <Link href="/">
          <a className="mr-4 text-pink-500">Home</a>
        </Link>
        <Link href="/create-item">
          <a className="mr-6 text-pink-500">Sell NFT</a>
        </Link>
        <Link href="/my-assets">
          <a className="mr-6 text-pink-500">My NFT</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className="mr-6 text-pink-500">Dashboard</a>
        </Link>
        {/* <button
          className="bg-green-500 text-white font-bold py-2 px-12 rounded"
          onClick={() => connectMetamask()}
        >
          Connect Wallet
        </button> */}
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
