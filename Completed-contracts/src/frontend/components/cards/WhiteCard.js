import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import './Card.css';

const WhiteCard = ({ name, id, img, desc, price, creator, onBuy }) => {
  const customHandler = () => {
    const item = {
      itemId: id,
      totalPrice: price,
    };
    onBuy(item);
  };
  return (
    <>
      <div class="grid-7 element-animation">
        <div class="card color-card-1">
          <img src={img} alt="profile-pic" class="profile" />
          <h1 class="title-1">{name}</h1>
          <p class="job-title"> #{id}</p>

          <div class="container">
            <div class="sub-content">
              <p class="description-1">{desc}</p>
            </div>
            <div class="sub-content">
              <div class="price-1">
                <button onClick={() => customHandler()} class="btn-style ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#5ea3d1"
                      d="M6 0.875L2.875 6.125L6 8L9.125 6.125L6 0.875ZM2.875 6.75L6 11.125L9.125 6.75L6 8.625L2.875 6.75Z"
                    />
                  </svg>
                  <p>{price} ETH</p>
                </button>
              </div>
            </div>
            <div class="partition">
              <hr class="hr-1" />
            </div>

            <div class="sub-content">
              <div class="creator">
                <p class="description-1">
                  Creation of <ins class="creator-1">{creator}</ins>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WhiteCard;
