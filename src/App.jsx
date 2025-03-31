import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Emotion from './pages/Emotion';
import AboutUs from './pages/AboutUs';
import MyPage from './pages/MyPage'
import Notfound from './pages/NotFound'
import OAuthCallback from './pages/OAuthCallback';
import { LoadingProvider } from './contexts/LoadingContext';
import { AuthProvider } from './contexts/AuthContext';
import WishList from './pages/WishList';
import PlayList from './pages/PlayList';
import Admin from './pages/Admin'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/emotion",
    element: <Emotion />,
  },
  {
    path: "/playlist",
    element: <PlayList />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/auth/kakao/callback",
    element: <OAuthCallback />,
  },
  {
    path: "*",
    element: <Notfound />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </AuthProvider>
  )
}

export default App
