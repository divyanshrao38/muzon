import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import MyItems from './components/MyItems'
import MusicNFTMarketplaceAddress from './contractsData/MusicNFTMarketplace-address.json'
import MusicNFTMarketplaceAbi from './contractsData/MusicNFTMarketplace.json'
import { Card, Button, ButtonGroup, Row, Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

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
import MyResales from './components/MyResales'
import MyTokens from './components/MyTokens'

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
    const signer = provider.getSigner();
    console.log(signer)

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    const dappazon = new ethers.Contract(config[network.chainId].dappazon.address, Dappazon, signer)
    setDappazon(dappazon)
    console.log(dappazon)

    const contractMusic = new ethers.Contract(MusicNFTMarketplaceAddress.address, MusicNFTMarketplaceAbi.abi, signer)
    setMusicNft(contractMusic)
    console.log("contractMusic", contractMusic)

    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1)
      items.push(item)
    }
    console.log(items)

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'instruments')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const handleMusicNft = async() => {
    const signer = await provider.getSigner()
    console.log('here',dappazon)
    const items = await dappazon.getAllItems()
    console.log('here items',items)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Navigation account={account} setAccount={setAccount} />
          <Routes>
            <Route path="/" element={
              <div>


                <h2>Muzon Best Sellers</h2>

                {electronics && clothing && toys && (
                  <>

                  <Container  className="mx-auto" fluid>
                  <Row >
                    <Section title={"Musical Instruments"} items={clothing} togglePop={togglePop} />
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row >
                    <Section title={"Musical Electronics"} items={electronics} togglePop={togglePop} />
                    </Row >
                    {/* <Section title={"Toys & "} items={toys} togglePop={togglePop} /> */}
                    {/* <Button onClick={() => { handleMusicNft() }}> Music NFTs</Button> */}
                    </Container>
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
            <Route path="/my-resales" element={
              <MyResales contract={musicNft} account={account} />
            } />

            <Route path="/my-tokens" element={
              <MyTokens contract={musicNft} />
            } />
            <Route path="/my-items" element={
              <MyItems contract={dappazon} />
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
