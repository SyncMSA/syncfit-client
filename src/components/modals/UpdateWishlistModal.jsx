// src/components/modals/UpdateWishlistModal.jsx
import React, { useState, useContext, useEffect } from 'react';
import CustomButton from '../CustomButton';
import { updateWishlist } from '../../apis/WishlistApi';
import { AuthContext } from '../../contexts/AuthContext';
import '../css/CreateWishlistModal.css';
import defaultImg from '../../assets/images/default.png';

const UpdateWishlistModal = ({ onClose, wishlist }) => {
  const { accessToken } = useContext(AuthContext);
  const [title, setTitle] = useState(wishlist.title);
  // coverImage will store the selected File object (if any)
  const [coverImage, setCoverImage] = useState(null);
  // previewUrl for showing preview image
  const [previewUrl, setPreviewUrl] = useState(wishlist.imageUrl || defaultImg);

  useEffect(() => {
    setTitle(wishlist.title);
    setPreviewUrl(wishlist.imageUrl || defaultImg);
  }, [wishlist]);

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
    try {
      await updateWishlist(wishlist.id, title, coverImage, accessToken);
      onClose();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  return (
    <div className="wishlist-modal">
      <div className="wishlist-modal-container">
        <form onSubmit={handleSubmit}>
          <div className="wishlist-modal-content">
            {/* 이미지 영역: 클릭하면 파일 선택 */}
            <div className="wishlist-modal-img">
              <input
                id="updateCoverImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <div
                className="wishlist-modal-img-input"
                onClick={() => document.getElementById("updateCoverImageInput").click()}
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
              text="Update"
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

export default UpdateWishlistModal;
