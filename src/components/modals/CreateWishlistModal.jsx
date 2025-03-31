// src/components/modals/CreateWishlistModal.jsx
import React, { useState, useContext } from 'react';
import CustomButton from '../CustomButton';
import { createWishlist } from '../../apis/WishlistApi';
import { AuthContext } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import '../css/CreateWishlistModal.css';
import defaultImg from '../../assets/images/default.png';

const CreateWishlistModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  // coverImage will store the selected File object
  const [coverImage, setCoverImage] = useState(null);
  // previewUrl for showing preview image
  const [previewUrl, setPreviewUrl] = useState(null);
  const { accessToken } = useContext(AuthContext);
  const { setLoading } = useLoading();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let imageFile = coverImage;
    if (!imageFile) {
      try {
        const response = await fetch(defaultImg);
        const blob = await response.blob();
        imageFile = new File([blob], "default.png", { type: blob.type });
      } catch (error) {
        console.error("기본 이미지 로딩 실패:", error);
        return;
      }
    }

    try {
      setLoading(true);
      await createWishlist(title, imageFile, accessToken);
      onClose();
    } catch (error) {
      console.error('위시리스트 생성 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wishlist-modal">
      <div className="wishlist-modal-container">
        <form onSubmit={handleSubmit}>
          <div className="wishlist-modal-content">

            <div className="wishlist-modal-img">
              <input
                id="coverImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <div
                className="wishlist-modal-img-input"
                onClick={() => document.getElementById("coverImageInput").click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="커버 미리보기" />
                ) : (
                  <span>Image</span>
                )}
              </div>
            </div>
            {/* 제목 입력 영역 */}
            <div className="wishlist-modal-title">
              <input
                type="text"
                placeholder="TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wishlist-modal-buttons">
            <CustomButton
              type="submit"
              text="Create"
              className="wishlist-modal-button-create"
            />
            <CustomButton
              type="button"
              text="Cancel"
              className="wishlist-modal-button-cancel"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWishlistModal;
