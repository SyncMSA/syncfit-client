import React, { useState, useEffect, useContext } from 'react';
import { IoClose, IoAdd } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import '../css/PlaylistModal.css';
import { addTrack } from '../../apis/TrackApi';
import { getYoutubeVideo } from '../../apis/YoutubeApi';
import { AuthContext } from '../../contexts/AuthContext';
import SelectWishlistModal from './SelectWishlistModal';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { duration: 0.7 } },
};

const ReadPlaylistModal = ({ item, onClose }) => {
  const { accessToken } = useContext(AuthContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  useEffect(() => {
    if (item && accessToken) {
      const query = `${item.title} ${item.artistName}`;
      getYoutubeVideo(accessToken, query)
        .then((videoId) => {
          setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
        })
        .catch((error) => {
          console.error("Error fetching YouTube video:", error);
        });
    }
  }, [item, accessToken]);

  const handleOpenSelectModal = () => {
    setSelectModalOpen(true);
  };

  const handleCloseSelectModal = () => {
    setSelectModalOpen(false);
  };

  const handleSelectWishlist = async (wishlistId) => {
    const trackData = {
      wishlistId: wishlistId,
      artistName: item.artistName,
      title: item.title,
      albumName: item.albumName,
      imageUrl: item.imageUrl,
    };

    try {
      const response = await addTrack(trackData, accessToken);
      console.log('Track added successfully:', response);
      setSelectModalOpen(false);
      onClose();
    } catch (error) {
      console.error('Error adding track:', error);
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={onClose}>X</button>
            {/* YouTube 영상 iframe */}
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title={`${item.title} YouTube video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="modal-album-video"
              ></iframe>
            ) : (
              <p>Loading video...</p>
            )}
            <h2>{item.title}</h2>
            <p>{item.artistName}</p>
            <p>{item.albumName}</p>
            {/* 오른쪽 하단 플로팅 추가 버튼 */}
            <button className="add-track-button" onClick={handleOpenSelectModal}>
              <IoAdd size={25} color="white" />
            </button>
            {selectModalOpen && (
              <SelectWishlistModal 
                onClose={handleCloseSelectModal}
                onSelect={handleSelectWishlist}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReadPlaylistModal;
