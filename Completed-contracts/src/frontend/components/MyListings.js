import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card } from 'react-bootstrap';
import WhiteCard from './cards/WhiteCard';
import BlackCard from './cards/BlackCard';

function renderSoldItems(items) {
  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Sold</h1>
      {items.map((item, idx) => (
        <BlackCard
          key={idx}
          name={item.name}
          desc={item.description}
          img={item.image}
          id={item.itemId}
          price={item.totalPrice}
          creator={item.seller}
          onBuy={null}
        />
      ))}
    </>
  );
}

export default function MyListings({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        console.log('i: ', i);
        let item = {
          totalPrice: metadata.price,
          itemId: parseInt(i.itemId),
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.toString(),
          seller: i.seller.slice(0, 5) + '...' + i.seller.slice(38, 42),
        };
        if (!i.sold) listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
    console.log('sold', soldItems);
  };

  useEffect(() => {
    console.log(account);
    loadListedItems();
  }, []);

  return (
    <>
      {listedItems.length > 0 ? (
        <div>
          <h1
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            Listed Items
          </h1>
          {listedItems.map((item, idx) => (
            <WhiteCard
              key={idx}
              name={item.name}
              desc={item.description}
              img={item.image}
              id={item.itemId}
              price={item.totalPrice}
              creator={item.seller}
              onBuy={null}
            />
          ))}
          <br />
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      ) : (
        <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
          No items listed
        </h1>
      )}
    </>
  );
}
