import Login from '../../components/Login'
import AboutUsSection from './aboutus'
import Footer from './footer'
import GallerySection from './GallerySection'
import Header from './header'

const MainPage = () => {
    return (
        <>
            <Header />
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    {/* Left content */}
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                            Instantly Generate Legal Documents
                            <br className="hidden lg:inline-block" />
                            using AI, Offline & Secure
                        </h1>
                        <p className="mb-8 leading-relaxed text-gray-700">
                            Say goodbye to templates and tedious edits. Our AI-powered tool generates customized legal documents from a short description — all offline, secure, and lightning-fast.
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg">
                                Generate Now
                            </button>
                            <button className="ml-4 inline-flex text-indigo-600 bg-indigo-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-200 rounded text-lg">
                                How It Works
                            </button>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img
                            className="object-cover object-center"
                            alt="legal generation illustration"
                            src="/judge.svg"
                        />
                    </div>
                </div>
            </section>
            <AboutUsSection />
            <Login />
            <GallerySection />
            <Footer />
        </>
    )
}

export default MainPage