import React, { useState, useEffect, useContext } from 'react';
import { IoClose } from "react-icons/io5";
import { TbMusicMinus } from "react-icons/tb";
import { getTracks, deleteTrack } from '../../apis/TrackApi';
import { AuthContext } from '../../contexts/AuthContext';
import '../css/ReadWishlistModal.css';

const ReadWishlistModal = ({ onClose, wishlistId, wishlist }) => {
  const { title, imageUrl } = wishlist;
  const { accessToken } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (wishlistId && accessToken) {
      getTracks(wishlistId, accessToken)
        .then((res) => {
          console.log("Fetched tracks:", res);
          setTracks(res.data);
        })
        .catch((error) => {
          console.error("Error fetching tracks:", error);
        });
    }
  }, [wishlistId, accessToken]);

  const handleDeleteTrack = async (trackId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const res = await deleteTrack(trackId, accessToken);
        console.log("Track deleted:", res);
        setTracks(tracks.filter(t => t.trackId !== trackId));
      } catch (error) {
        console.error("Error deleting track:", error);
      }
    }
  };

  return (
    <div className="read-wishlist-modal">
      <div
        className="read-wishlist-modal-container"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* 오버레이로 배경 이미지 위 텍스트 가독성 확보 */}
        <div className="read-wishlist-modal-overlay">
          <div className="read-wishlist-modal-header">
            <h2>{title} - Tracks</h2>
            <button className="close-button" onClick={onClose} style={{ color: "white"}}>
              <IoClose size={30} />
            </button>
          </div>
          <div className="read-wishlist-modal-content">
            {tracks.length > 0 ? (
              tracks.map(track => (
                <div key={track.trackId} className="track-item" >
                  <img src={track.imageUrl} alt={track.title} />
                  <div className="track-info">
                    <h3>{track.title}</h3>
                    <p>{track.artistName}</p>
                  </div>
                  <button 
                    className="delete-track-button" 
                    onClick={() => handleDeleteTrack(track.trackId)}
                    title="삭제"
                  >
                    <TbMusicMinus size={25} />
                  </button>
                </div>
              ))
            ) : (
              <p>No tracks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadWishlistModal;
