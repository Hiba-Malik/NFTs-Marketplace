import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ethers } from 'ethers';
import './css/MintForm.css';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = '2DTzPWLbFhEcwsNVZSEnG7WOFfA'; // <---------- your Infura Project ID
const projectSecret = 'ab50ee28a53e37298f049068d200875c'; // <---------- your Infura Secret
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const SingleMint = ({ nft, marketplace }) => {
  const [tokenURI, setTokenURI] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //Uploading to IPFS
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://kwiktrust.infura-ipfs.io/ipfs/${result.path}`);
        console.log(`https://kwiktrust.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log('ipfs image upload error: ', error);
      }
    }
  };

  //Create a JSON obeject and upload to IPFS
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mintThenList(result);
    } catch (error) {
      console.log('ipfs uri upload error: ', error);
    }
  };

  const mintThenList = async (tokenURI) => {
    const uri = `https://kwiktrust.infura-ipfs.io/ipfs/${tokenURI.path}`;
    if (!uri) return;
    // mint nft
    await (await nft.singleMint(uri, marketplace.address)).wait();
    // Set approval for marketplace
    await nft.setApprovalForAll(marketplace.address, true);
    // get tokenId of new nft
    const id = await nft.totalSupply();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.listItem(nft.address, id, listingPrice)).wait();
  };
  return (
    <>
      <h1>Mint Token</h1>
      <hr />
      <Form.Group className="left mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
      </Form.Group>
      <Form.Group className="left mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
        />
      </Form.Group>
      <Form.Group className="left mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          as="textarea"
        />
      </Form.Group>
      <Form.Group className="left mb-3" controlId="formBasicEmail">
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          required
          name="file"
          onChange={uploadToIPFS}
        />
      </Form.Group>

      <Button
        className="mb-3 btn"
        onClick={createNFT}
        variant="primary"
        type="submit"
      >
        Mint
      </Button>
    </>
  );
};

export default SingleMint;
