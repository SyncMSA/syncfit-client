import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';
import './css/AboutUsCard.css';

const AboutUsCard = () => {
  const dragRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);


  return (
    <div className="about-card">
      <motion.div
        className="about-card-motion"
        ref={dragRef}
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
      >
        <h1 className="about-card-title">LG CNS AM CAMP TEAM 3</h1>
        <h3 className="about-card-content">{`SyncFit은 사용자의 감정이나 상황을 기반으로 음악을 추천해주는 서비스입니다\n모든 코드와 자료는 오픈소스로 공개합니다`}</h3>
        <div className="about-card-icons">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/SyncFit"
            target='_blank'
          >
            <FaGithub size={40} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://boiling-capri-3b8.notion.site/SyncFit-19a077591f22806891a6d447f17d4bb6?pvs=4"
            target='_blank'
          >
            <SiNotion size={40} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsCard;
