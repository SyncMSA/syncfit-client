import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './css/AboutUsForm.css';

const AboutUsForm = () => {
  const [isVisible, setisVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setisVisible(true);
        } else {
          setisVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="about-us" ref={sectionRef}>
      <h1>About Us</h1>
      <div className='about-intro'>
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          SyncFit 소개
        </motion.h2>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          SyncFit은 사용자의 감정과 상황에 딱 맞는 음악을 추천하는 서비스 입니다<br />
          지금 기분과 상황을 입력하고 당신의 순간을 더 특별하게 만들어 줄 음악을 만나보세요 !<br />
        </motion.p>

        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          저희는 LG CNS Inspire AM 1기 교육생들로 이루어진 팀입니다<br />
          SyncFit을 통해 사용자에게 새로운 경험을 선사하는 미니 프로젝트를 진행하고 있습니다<br />
          음악과 기술의 조화를 통해 더 나은 서비스를 제공하려 노력 중입니다
        </motion.p>
      </div>
    </section>
  );
};

export default AboutUsForm;
