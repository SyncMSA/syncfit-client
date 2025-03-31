import React, { useState, useEffect, useContext } from 'react';
import './css/UserWishlist.css';
import wishlistVideo from '../assets/videos/wishlist.mp4';
import { AuthContext } from '../contexts/AuthContext';
import CreateWishlistModal from './modals/CreateWishlistModal';
import ReadWishlistModal from './modals/ReadWishlistModal';
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { getWishlists, deleteWishlist, updateWishlist, downloadImage } from '../apis/WishlistApi';
import defaultImg from '../assets/images/default.png';
import { useLoading } from '../contexts/LoadingContext';
import { MdFileDownload } from "react-icons/md";

const UserWishlist = () => {
  const { nickname, profileImg, accessToken } = useContext(AuthContext);
  const [wishlists, setWishlists] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [readModalOpen, setReadModalOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState(null);

  // Inline 수정 모드 관련 상태
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [editedPreview, setEditedPreview] = useState(null);

  // 로딩
  const { setLoading } = useLoading();

  // 위시리스트 데이터 API 호출
  useEffect(() => {
    if (accessToken) {
      getWishlists(accessToken)
        .then((data) => setWishlists(data.data))
        .catch((error) => console.error("Error fetching wishlists:", error));
    }
  }, [accessToken]);

  const handleAddList = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    if (accessToken) {
      getWishlists(accessToken)
        .then((data) => setWishlists(data.data))
        .catch((error) => console.error("Error fetching wishlists:", error));
    }
  };

  const handleItemClick = (wishlist) => {
    // 읽기 모드 호출은 수정 모드가 아닐 때만
    if (editingItemId === wishlist.id) return;
    setSelectedWishlist(wishlist);
    setReadModalOpen(true);
  };

  const handleCloseReadModal = () => {
    setReadModalOpen(false);
    setSelectedWishlist(null);
  };

  const handleDelete = async (wishlistId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteWishlist(wishlistId, accessToken);
        setWishlists(wishlists.filter(item => item.id !== wishlistId));
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  // 인라인 수정 시작: 수정 아이콘 클릭 시 호출
  const handleStartEditing = (wishlist) => {
    setEditingItemId(wishlist.id);
    setEditedTitle(wishlist.title);
    setEditedPreview(wishlist.imageUrl || defaultImg);
    setEditedImage(null);
  };

  const handleCancelEditing = () => {
    setEditingItemId(null);
    setEditedTitle("");
    setEditedImage(null);
    setEditedPreview(null);
  };

  const handleSaveEditing = async (wishlistId) => {
    try {
      setLoading(true);
      await updateWishlist(wishlistId, editedTitle, editedImage, accessToken);

      const data = await getWishlists(accessToken);
      setWishlists(data.data);
      setLoading(false);
      handleCancelEditing();
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  const handleEditedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      setEditedPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClickForEditing = (wishlistId) => {
    document.getElementById(`editImageInput-${wishlistId}`).click();
  };

  const handleDownloadImg = async (wishlistId) => {
    try {
      setLoading(true);
      const res = await downloadImage(wishlistId, accessToken);
      // res.data는 blob 타입으로 반환됨
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wishlist_${wishlistId}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("이미지 다운로드 실패:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <video autoPlay loop muted>
        <source src={wishlistVideo} type="video/mp4" />
      </video>
      <div className="wishlist">
        <div className="wishlist-header">
          <div className="wishlist-header-img">
            <img src={profileImg} alt="프로필" />
          </div>
          <h1>{nickname}'s Playlist</h1>
        </div>
        <div className="wishlist-list">
          {wishlists.map(item => (
            <div
              key={item.id}
              className="wishlist-list-item"
              // 배경 이미지로 cover 효과
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="wishlist-item-overlay">
                {editingItemId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="edit-title-input"
                    />
                    <div onClick={() => handleImageClickForEditing(item.id)} className="edit-image-container">
                      <img src={editedPreview} alt="미리보기" className="edit-preview" />
                      <input
                        id={`editImageInput-${item.id}`}
                        type="file"
                        accept="image/*"
                        onChange={handleEditedImageChange}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="item-actions">
                      <button onClick={(e) => { e.stopPropagation(); handleSaveEditing(item.id); }}>
                        <FaCheck size={16}/>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleCancelEditing(); }}>
                        <RxCross1 size={16}/>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 onClick={() => handleItemClick(item)}>{item.title}</h3>
                    <div className="item-actions">
                      <button onClick={(e) => { e.stopPropagation(); handleStartEditing(item); }} title="수정">
                        <IoPencil size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} title="삭제">
                        <IoTrash size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDownloadImg(item.id); }} title="이미지">
                        <MdFileDownload size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div 
            className="wishlist-list-item add-item"
            onClick={handleAddList}
          >
            <h3><IoAdd size={20} /></h3>
          </div>
        </div>
        {createModalOpen && <CreateWishlistModal onClose={handleCloseCreateModal} />}
        {readModalOpen && (
          <ReadWishlistModal 
            onClose={handleCloseReadModal} 
            wishlistId={selectedWishlist ? selectedWishlist.id : null}
            wishlist={selectedWishlist}
          />
        )}
      </div>
    </>
  );
};

export default UserWishlist;
