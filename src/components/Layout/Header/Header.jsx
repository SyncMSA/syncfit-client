import { useState, useEffect } from 'react';
import Nav from './Nav';
import MobileNav from './MobileNav';
import '../../css/Header.css';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isSticky ? 'header-sticky' : 'header-default'} hover:header-hover`}>
      <div className="container">
        {/* desktop nav */}
        <div className="nav-container">
          <Nav />
        </div>

        {/* mobile nav */}
        <div className="mobile-nav">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;