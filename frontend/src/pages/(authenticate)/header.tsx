import React from "react";
import Logo from "./logo";

const Header: React.FC = () => {
    return (
        <header className="text-gray-700 body-font sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Logo />
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-blue-600 transition" href="#">Home</a>
                    <a className="mr-5 hover:text-blue-600 transition" href="#about-us">About Us</a>
                    <a className="mr-5 hover:text-blue-600 transition" href="#auth">Get Started</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
