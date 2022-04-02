import React from 'react';
import './header.component.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
function Header() {
    return (
        <div>
            <div className="header">
                 
                <h4 class="logo">
                <img class="logo_face"src={logo} />&nbsp;&nbsp;S.Y.N</h4>
                <div className="c__header">
                    <Link to="/login"><h5 className="header__signin">Sign In</h5></Link>
                    <Link to="/register"><h5 className="header__signup">Sign Up</h5></Link>
                </div>
            </div>
        </div>);
}

export default Header;
