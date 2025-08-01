import React from 'react';

const GallerySection: React.FC = () => {
    const two = "/gallery-2.avif";
    const three = "/gallery-3.jpg";

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-20 mx-auto">
                {/* Hero Gallery Card */}
                <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg group">
                    <img
                        src="/gallery-1.avif"
                        alt="gallery"
                        className="w-full h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-6">
                        <h2 className="text-3xl font-bold mb-2">Smart Legal Templates</h2>
                        <p className="text-lg mb-4">Generate error-free legal documents in seconds with our AI-powered solution.</p>
                        <a className="inline-flex items-center text-indigo-400 hover:underline cursor-pointer">
                            Learn More
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Two-column Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((item) => {
                        const img = item === 1 ? two : three;
                        const title =
                            item === 1 ? 'Instant NDA Generator' : 'Custom Contracts Made Simple';
                        const description =
                            item === 1
                                ? 'Create NDAs instantly and securely with our legal engine.'
                                : 'Tailor contracts for your business needs without hassle.';

                        return (
                            <div
                                key={item}
                                className="relative rounded-2xl overflow-hidden shadow-md group"
                            >
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-5">
                                    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                                    <p className="mb-3">{description}</p>
                                    <a className="inline-flex items-center text-indigo-300 hover:underline cursor-pointer">
                                        Learn More
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
