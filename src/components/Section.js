import { ethers } from 'ethers'
import { Card, Container, Row } from 'react-bootstrap';

// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />
            <br/>
            <br/>
            <br/>
            <br/>

            <Container className='cards'>
                {items.map((item, index) => (
                    <Card key={index} onClick={() => togglePop(item)}>
                        <Row className='card__image'>
                            <img src={item.image} alt="Item" />
                        </Row>
                        <Row className='card__info'>
                            <h4>{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</p>
                        </Row>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default Section;