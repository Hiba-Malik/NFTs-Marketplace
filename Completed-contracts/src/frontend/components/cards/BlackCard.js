import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Card.css';

const BlackCard = ({ name, id, img, desc, price, creator, onBuy }) => {
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
        <div class="card color-card-2">
          <img src={img} alt="profile-pic" class="profile" />
          <h1 class="title-2">{name}</h1>
          <p class="job-title-2">#{id}</p>

          <div class="container">
            <div class="sub-content">
              <p class="description">{desc}</p>
            </div>
            <div class="sub-content">
              <div class="price">
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
                  <p style={{ color: 'white' }}>{price} ETH</p>
                </button>
              </div>
            </div>
            <div class="partition">
              <hr />
            </div>

            <div class="sub-content">
              <div class="creator">
                <p class="description">
                  Creation of <ins> {creator}</ins>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlackCard;
