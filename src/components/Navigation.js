import { ethers } from 'ethers'

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Muzon <sub>By Team Doge</sub></h1>
            </div>

            <input
                type="text"
                className="nav__search"
            />

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="/">Musical Instruments and Electronics</a></li>
                <li><a href="/my-items">My Items</a></li>
                {/* <li><a href="#Toys & Gaming"> </a></li> */}
                <li><a href="/my-nfts">Music NFTs</a></li>
                <li><a href="/my-resales">Music NFTs Resales</a></li>
                <li><a href="/my-tokens">My Music NFTs Tokens</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;