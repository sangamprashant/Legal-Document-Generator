import React from "react";

const Header: React.FC = () => {
    return (
        <header className="text-gray-700 body-font sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="#">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-blue-600 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M2 7l10 5 10-5M12 22V12M2 17l10 5 10-5" />
                    </svg>
                    <span className="ml-3 text-xl font-semibold">LegalAid</span>
                </a>
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
