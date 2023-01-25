import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './css/home.css';
import WhiteCard from './cards/WhiteCard';
import BlackCard from './cards/BlackCard';

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([{}]);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let collectItems = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (item.sold === false) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        console.log(item);

        // Add item to items array
        collectItems.push({
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.toString(),
          itemId: parseInt(item.itemId),
          totalPrice: metadata.price,
          seller: item.seller.slice(0, 5) + '...' + item.seller.slice(38, 42),
        });
        console.log(metadata.image.toString());
      }
    }
    setLoading(false);
    setItems(collectItems);
    console.log(collectItems[0].image);
  };

  const buyItem = async (item) => {
    console.log('item object:', item);
    const priceBigNo = { value: ethers.utils.parseEther(item.totalPrice) };
    console.log(priceBigNo);
    await (await marketplace.purchaseItem(item.itemId, priceBigNo)).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  if (loading)
    return (
      <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>Loading...</h1>
    );
  return (
    <>
      {items.length > 0 ? (
        items.map((item, idx) =>
          idx % 2 == 0 ? (
            <WhiteCard
              key={idx}
              name={item.name}
              desc={item.description}
              img={item.image}
              id={item.itemId}
              price={item.totalPrice}
              creator={item.seller}
              onBuy={buyItem}
            />
          ) : (
            <BlackCard
              key={idx}
              name={item.name}
              desc={item.description}
              img={item.image}
              id={item.itemId}
              price={item.totalPrice}
              creator={item.seller}
              onBuy={buyItem}
            />
          )
        )
      ) : (
        <h1>Nothing to display here</h1>
      )}
    </>
  );
};
export default Home;
