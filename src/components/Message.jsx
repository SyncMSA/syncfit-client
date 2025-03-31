import { useState, useContext } from 'react';
import "./css/Message.css";
import emotion from '../assets/videos/emotion.mp4'
import { TypeAnimation } from 'react-type-animation';
import CustomButton from './CustomButton';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';
import { musicRecommendation } from '../apis/MusicApi';
import { mockData } from '../utils/getMockData'

const Message = () => {
  const [input, setInput] = useState("");
  const { accessToken } = useContext(AuthContext);
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const handleInputChange = (e) => {
   setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/mypage", { replace: true });
      return;
    }

    try {
      const payload = {"input": input };
      setLoading(true);
      const recommendationData = await musicRecommendation(payload, accessToken);
      setLoading(false); 
      
      nav("/playlist", { state: { recommendationData } });
    } catch (error) {
      console.error("음악 추천 요청 실패:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='message'>
      <video autoPlay loop muted>
        <source src={emotion} type="video/mp4" />
      </video>
      <h1>Welcome to SyncFit</h1>
      <div className='message-typing-animation'>
        <TypeAnimation
          sequence={[
            '오늘 당신의 기분은 어떠신가요?',
            '웃음 가득한 순간이 있으셨나요?',
            '어쩌면 슬픈 일도 있었을 거예요...',
            '당신의 하루를 들려주세요!',
          ]}
          wrapper='span'
          speed={250}
          repeat={0}
          className="type-animation"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="postContent"
          placeholder='기분을 입력하세요'
          rows={4}
          cols={40}
          value={input}
          onChange={handleInputChange}
        />
        <CustomButton type={"submit"} text={"전송"} className={"message-button"}/>
      </form>
    </div>
  );
};

export default Message;