import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'
import { Container, Row } from 'react-bootstrap'

const Product = ({ item, provider, account, dappazon, togglePop, myItemsPage, isLessonPage }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await dappazon.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()

    // Buy item...
    let transaction = await dappazon.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()

    setHasBought(true)
    togglePop()
  }
  const subscribe = async () => {
    const signer = await provider.getSigner()

    let transaction = await dappazon.connect(signer).subscribe(item.id,  { value: item.cost })
    await transaction.wait()

    setHasBought(true)
    togglePop()
  }

  const unsubscribe = async () => {
    const signer = await provider.getSigner()

    let transaction = await dappazon.connect(signer).unsubscribe(item.id,{ value: item.cost })
    await transaction.wait()

    setHasBought(true)
    togglePop()
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product">
      <Container className="product__details">
        <Row className="product__image">
          <img src={item.image} alt="Product" />
        </Row>
        <Row className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item?.cost?.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </Row>

        <Row className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

      {myItemsPage?
      <p>
      Delivered on: <br />
      <strong>
        {new Date(Date.now() - 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </strong>
    </p>
      : <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>}

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

        {(!myItemsPage && !isLessonPage)  &&  <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>}
         {isLessonPage &&  <button className='product__buy' onClick={subscribe}>
            Subscribe Now
          </button>} 

         {item?.category !=="toys" &&<> <p><small>Ships from</small> Team Doge</p>
          <p><small>Sold by</small> Team Doge</p></>}

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })
                }
              </strong>
            </div>
          )}

          {(item?.category =="toys" && myItemsPage) &&  <button className='product__buy' onClick={unsubscribe}>
            Unsubscribe Now
          </button>} 

        </Row>

        

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </Container>
    </div >
  );
}

export default Product;