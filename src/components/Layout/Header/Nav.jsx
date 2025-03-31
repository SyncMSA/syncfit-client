import { Link, useLocation } from 'react-router-dom';
import '../../css/Nav.css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Emotion', path: '/emotion' },
  { name: 'Wishlist', path: '/wishlist' },
  { name: 'AboutUs', path: '/aboutus' },
  { name: 'MyPage', path: '/mypage' },
];

const Nav = () => {
  const location = useLocation();

  const darkPages = ['/', '/emotion', '/wishlist'];
  const isDark = darkPages.includes(location.pathname);

  return (
    <nav className="nav">
      {links.map((link, index) => (
        <Link
          to={link.path}
          key={index}
          className={`nav-link nav-link-${isDark ? 'dark' : 'light'} ${link.path === location.pathname ? 'nav-link-active' : 'nav-link'}`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;