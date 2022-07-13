import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { EtherscanProvider } from "@ethersproject/providers";
import Image from "next/image";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      //try to upload the file
      const added = await client.add(file, {
        progress: (prog) => console.log(`received : ${prog}`),
      });

      //file save in url path below
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }

  //1. create item (image/video) and upload on ipfs

  async function createItem() {
    const { name, description, price } = formInput; //get the values from the form input

    //validation
    if (!name || !description || !price || !fileUrl) {
      return;
    }
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      //pass the url to save it on polygon after it has been uploaded to ipfs
      createSale(url);
    } catch (e) {
      console.log(e);
    }
  }

  //2. List item for sale

  async function createSale(url) {
    //connect to the matamask

    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign transartion
    

    const signer = provider.getSigner();

    //contract instance
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transartion = await contract.createToken(url);
    let tx = await transartion.wait();

    //get the tokenId from the transaction that occured above
    //there events array that is returned, the first item from that event
    //is the event, third item is the token id.
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    //get a reference to the price entered in the form

    const price = ethers.utils.parseUnits(formInput.price, "ether");
    //contract instance
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    //get listing price

    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transartion = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transartion.wait();
    router.push("/");
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-8 border rounded p-4"
          type="number"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && (
          <Image
            src={fileUrl}
            alt="Picture of the author"
            className="rounded mt-4"
            width={350}
            height={500}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        )}
        <button
          onClick={createItem}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
