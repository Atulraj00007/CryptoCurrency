import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/coinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setAllCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setAllCurrency({ name: "usd", symbol: "$" });
        break;
      case "inr":
        setAllCurrency({ name: "inr", symbol: "₹" });
        break;
      case "eur":
        setAllCurrency({ name: "eur", symbol: "€" });
        break;
      default:
        setAllCurrency({ name: "inr", symbol: "₹" });
        break;
    }
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="Logo" className='logo' /> 
      </Link>
      <ul>
        <Link to={'/'}>
        <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blogs</li>
      </ul>
      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
        <button>
          SIGN UP<span><img src={arrow_icon} alt="Arrow icon" /></span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
