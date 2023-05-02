import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import MusicNFTMarketplaceAddress from './contractsData/MusicNFTMarketplace-address.json'
import MusicNFTMarketplaceAbi from './contractsData/MusicNFTMarketplace.json'
import { Card, Button, ButtonGroup } from 'react-bootstrap'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
import Home from './components/Home'

function App() {
  const [provider, setProvider] = useState(null)
  const [dappazon, setDappazon] = useState(null)
  const [musicNft, setMusicNft] = useState(null)
  const [account, setAccount] = useState(null)
  // let naivgate = useNavigate();

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const dappazon = new ethers.Contract(config[network.chainId].dappazon.address, Dappazon, provider)
    setDappazon(dappazon)
    console.log(dappazon)

    const contractMusic = new ethers.Contract(MusicNFTMarketplaceAddress.address, MusicNFTMarketplaceAbi.abi, provider)
    setMusicNft(contractMusic)
    console.log("contractMusic", contractMusic)

    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1)
      items.push(item)
    }

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const handleMusicNft = ()=>{
    console.log('here')
    this.props.history.push("/my-nfts")
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={
              <div>
                <Navigation account={account} setAccount={setAccount} />

                <h2>Dappazon Zest Sellers</h2>

                {electronics && clothing && toys && (
                  <>
                    <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
                    <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
                    <Section title={"Toys & "} items={toys} togglePop={togglePop} />
                    <Button onClick={()=>{handleMusicNft()}}> Music NFTs</Button>
                  </>
                )}

                {toggle && (
                  <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
                )}
              </div>
            } />
            <Route path="/my-nfts" element={
              <Home contract={musicNft} />
            } />
            {/* <Route path="/my-resales" element={
              <MyResales contract={contract} account={account} />
            } /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
