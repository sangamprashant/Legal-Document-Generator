import React from "react";

const AboutUsSection: React.FC = () => {
    return (
        <section className="text-gray-600 body-font bg-gray-50" id="about-us">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="flex flex-wrap -mx-4 lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">
                            Empowering Justice for All
                        </h1>
                        <p className="leading-relaxed text-gray-700">
                            At Legal Aid Connect, we believe that access to justice should not depend on one's financial status.
                            Our mission is to provide free and affordable legal assistance to individuals and communities who need it most.
                            From legal consultations to courtroom representation, we are committed to defending rights and promoting equality under the law.
                        </p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">5K+</h2>
                        <p className="text-gray-600">Clients Served</p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">2.3K</h2>
                        <p className="text-gray-600">Cases Resolved</p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">12</h2>
                        <p className="text-gray-600">Legal Experts</p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">100+</h2>
                        <p className="text-gray-600">Pro Bono Partners</p>
                    </div>
                </div>

                <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-10 sm:mt-0">
                    <img
                        className="object-cover object-center w-full h-full"
                        src="/about.jpg"
                        alt="Legal Aid Impact"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
