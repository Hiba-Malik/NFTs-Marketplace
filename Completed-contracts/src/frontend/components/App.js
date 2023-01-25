import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from './Navbar';
import SingleMint from './SingleMint';
import MintForm from './MintForm';
import Home from './Home';
import MyListings from './MyListings';
import MyPurchases from './MyPurchases';
import MarketplaceAbi from '../contractsData/Marketplace.json';
import MarketplaceAddress from '../contractsData/Marketplace-address.json';
import NFTAbi from '../contractsData/NFTContract.json';
import NFTAddress from '../contractsData/NFT-address.json';

function App() {
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [nft, setNFT] = useState({});
  const [errorMessage, setErrorMessage] = useState('Connect Wallet');
  const [marketplace, setMarketplace] = useState({});
  const { ethereum } = window;

  const connectWallet = async () => {
    if (!ethereum) {
      setHaveMetamask(false);
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    //Check Chain/Network wallet is connected to
    const chainId = provider.getNetwork();
    if ((await chainId).chainId.toString() === '4') {
      const signer = provider.getSigner();
      console.log(signer);
      loadContracts(signer);
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } else {
      setErrorMessage('Please connect to Rinkeby Test Network!');
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHaveMetamask(true);
      }
      setHaveMetamask(false);
    };
    checkMetamaskAvailability();
    console.log('Marketplace address: ', MarketplaceAddress.address);
  }, []);

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const NFT = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    console.log('NFT', NFT);
    setNFT(NFT);
    const itemCount = await marketplace.itemCount();
    console.log('items: ', itemCount.toString());
  };
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Navigation
            account={accountAddress}
            connectWallet={connectWallet}
          ></Navigation>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <Routes>
                <Route
                  path="/"
                  element={
                    isConnected ? (
                      <div className="content ">
                        <Home marketplace={marketplace} nft={nft} />
                      </div>
                    ) : (
                      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        {errorMessage}
                      </h1>
                    )
                  }
                />
                <Route
                  path="/create"
                  element={
                    isConnected ? (
                      <div className="mx-auto">
                        <SingleMint nft={nft} marketplace={marketplace} />
                      </div>
                    ) : (
                      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        {errorMessage}
                      </h1>
                    )
                  }
                />
                <Route
                  path="/create-multiple"
                  element={
                    isConnected ? (
                      <div className="mx-auto">
                        <MintForm nft={nft} marketplace={marketplace} />
                      </div>
                    ) : (
                      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        {errorMessage}
                      </h1>
                    )
                  }
                />
                <Route
                  path="/my-listed-items"
                  element={
                    isConnected ? (
                      <div className="mx-auto">
                        <MyListings
                          marketplace={marketplace}
                          nft={nft}
                          account={accountAddress}
                        />
                      </div>
                    ) : (
                      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        {errorMessage}
                      </h1>
                    )
                  }
                />
                <Route
                  path="/my-purchases"
                  element={
                    isConnected ? (
                      <MintForm
                        nft={nft}
                        marketplaceAddress={MarketplaceAddress.address}
                      />
                    ) : (
                      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        {errorMessage}
                      </h1>
                    )
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
