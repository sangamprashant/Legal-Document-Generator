
const Logo = () => {
    return (
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
    )
}

export default Logo
