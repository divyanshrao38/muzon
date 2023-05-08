import { useEffect, useState } from 'react'

// Components
import Section from './Section'
import Product from './Product'
import { Card, Button, ButtonGroup, Row, Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
// ABIs
import Dappazon from '../abis/Dappazon.json'

// Config
import config from '../config.json'
import { ethers } from 'ethers'


export default function MyItems({ contract }) {
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
        toggle ? setToggle(false) : setToggle(true);
        loadBlockchainData()
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
        console.log(contract)

        const items = await dappazon.getAllItems()
        console.log("bought itemsssss",items)

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

    const handleMusicNft = async () => {
        const items = await dappazon.getAllItems()
        console.log('here items', items)
    }

    return (
        <div>
            <h2>Purchased Items</h2>

            {electronics && clothing &&  (
                <>

                    <Container className="mx-auto" fluid>
                       {clothing.length>0 ? <>  <Row >
                            <Section title={"Musical Instruments"} items={clothing} togglePop={togglePop} />
                        </Row>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        </> : <></>}
                        {electronics.length>0?
                       <> <Row >
                            <Section title={"Musical Electronics"} items={electronics} togglePop={togglePop} />
                        </Row >
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        </>
                        :<></>}

{toys.length>0?
                       <> <Row >
                            <Section title={"Musical classes"} items={toys} togglePop={togglePop} />
                        </Row ></>:<></>}

                        {/* <Section title={"Toys & "} items={toys} togglePop={togglePop} /> */}
                        {/* <Button onClick={() => { handleMusicNft() }}> Music NFTs</Button> */}
                    </Container>
                </>
            )}

            {toggle && (
                <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} myItemsPage={true}  />
            )}
            
        </div>


    );
}

