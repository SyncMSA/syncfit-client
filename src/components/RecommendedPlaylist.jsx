import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './css/RecommendedPlaylist.css';
import ReadPlaylistModal from './modals/ReadPlaylistModal'; 

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }
  },
};

const RecommendedPlaylist = ( { recommendationData } ) => {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="recommended-playlist">
      <h1>감정 맞춤형 곡 리스트</h1>
      <motion.div
        className="recommended-playlist-container"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recommendationData.map((item, index) => (
          <motion.div
            className="recommended-playlist-item"
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            onClick={() => handleItemClick(item)}
          >
            <div className="recommended-playlist-album-img">
              <img
                src={item.imageUrl}
                alt={`${item.title} 앨범 커버`}
              />
            </div>
            <div className="recommended-playlist-album-details">
              <h3>{item.title}</h3>
              <p>{item.artistName}</p>
              <span>{item.albumName}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* 모달 컴포넌트 */}
      <ReadPlaylistModal item={selectedItem} onClose={closeModal} />
    </div>
  );
};

export default RecommendedPlaylist;
