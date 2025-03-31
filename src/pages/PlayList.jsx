import React from 'react'
import RecommendedPlaylist from '../components/RecommendedPlaylist'
import WithoutFooterLayout from '../components/Layout/WithoutFooterLayout'
import { useLocation } from 'react-router-dom';

const PlayList = () => {
  const location = useLocation();
  const recommendationData = location.state?.recommendationData || [];

  return (
    <WithoutFooterLayout>
      <RecommendedPlaylist recommendationData={recommendationData}/>
    </WithoutFooterLayout>
  )
}

export default PlayList