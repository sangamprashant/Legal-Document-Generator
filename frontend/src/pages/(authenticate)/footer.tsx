
const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap md:text-left text-center order-first">
                    {/* Resources */}
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">RESOURCES</h2>
                        <nav className="list-none mb-10">
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Templates</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Case Studies</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Privacy Policy</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Terms of Use</a></li>
                        </nav>
                    </div>

                    {/* Support */}
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SUPPORT</h2>
                        <nav className="list-none mb-10">
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Help Center</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Documentation</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">API Access</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Contact Us</a></li>
                        </nav>
                    </div>

                    {/* Legal Tools */}
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">LEGAL TOOLS</h2>
                        <nav className="list-none mb-10">
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Affidavits</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Agreements</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Declarations</a></li>
                            <li><a className="text-gray-600 hover:text-gray-800" href="#">Contracts</a></li>
                        </nav>
                    </div>

                    {/* Subscribe */}
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SUBSCRIBE</h2>
                        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                            <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">Your Email</label>
                                <input
                                    type="text"
                                    id="footer-field"
                                    name="footer-field"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                Submit
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
                            Get weekly legal tips and updates.
                            <br className="lg:block hidden" />No spam, we promise.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-gray-100">
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="ml-3 text-xl">LegalAI</span>
                    </a>
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
                        © {new Date().getFullYear()} LegalAI —
                        <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@LegalAI_Tech</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="text-gray-500" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="ml-3 text-gray-500" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="ml-3 text-gray-500" href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="ml-3 text-gray-500" href="#"><i className="fab fa-github"></i></a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
