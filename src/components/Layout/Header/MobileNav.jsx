import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/MobileNav.css";

const links = [
  { name: 'Home', path: '/' },
  { name: 'Emotion', path: '/emotion' },
  { name: 'Wishlist', path: '/wishlist' },
  { name: 'AboutUs', path: '/aboutus' },
  { name: 'MyPage', path: '/mypage' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const darkPages = ['/', '/emotion', '/wishlist'];
  const iconColor = darkPages.includes(location.pathname) ? 'white' : 'black';

  return (
    <div>
      <button
        className="NavButton"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu
          className="NavIcon"
          style={{ color: iconColor }}
        />
      </button>

      <div className={`SideBar ${isOpen ? "open" : ""}`}>
        <div className="SideBar-Content">
          <nav className="Nav-Links">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="Nav-Item"
                activeClassName="active"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
