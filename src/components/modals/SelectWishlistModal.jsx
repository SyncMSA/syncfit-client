// src/components/modals/SelectWishlistModal.jsx
import React, { useState, useEffect, useContext } from 'react';
import { getWishlists } from '../../apis/WishlistApi';
import { AuthContext } from '../../contexts/AuthContext';
import CustomButton from '../CustomButton';
import '../css/SelectWishlistModal.css';
import defaultImg from '../../assets/images/default.png';

const SelectWishlistModal = ({ onClose, onSelect }) => {
  const { accessToken } = useContext(AuthContext);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    if (accessToken) {
      getWishlists(accessToken)
        .then((data) => setWishlists(data.data))
        .catch((error) => console.error("Error fetching wishlists:", error));
    }
  }, [accessToken]);

  return (
    <div className="select-wishlist-modal">
      <div className="select-wishlist-modal-container">
        <h2>Select Wishlist</h2>
        <ul className="wishlist-select-list">
          {wishlists.map((w) => (
            <li key={w.id} className="wishlist-select-item" onClick={() => onSelect(w.id)}>
              <img src={w.imageUrl || defaultImg} alt={w.title} />
              <span>{w.title}</span>
            </li>
          ))}
        </ul>
        <CustomButton onClick={onClose} text="Cancel" className="select-modal-cancel-button" />
      </div>
    </div>
  );
};

export default SelectWishlistModal;
