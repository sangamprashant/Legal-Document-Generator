import { useState } from "react";
import { LoginForm } from "./login/LoginForm";

function Login() {
    const [status, setStatus] = useState<"login" | "register">("login");
    return (
        <>
            <div className="w-full max-w-2xl mx-auto flex items-center justify-center p-4" id="auth">
                <div className="w-full">
                    {/* register login  toggleslider */}
                    <div className="flex justify-between gap-1">
                        <button
                            onClick={() => setStatus("login")}
                            className={`px-4 py-2 rounded-s-sm flex-1 font-medium ${status === "login"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setStatus("register")}
                            className={`px-4 py-2 rounded-e-sm flex-1 font-medium ${status === "register"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            Register
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {status === "login" ? "Welcome Back!" : "Join Us!"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {status === "login"
                                    ? "Please sign in to continue"
                                    : "Create an account to get started"}
                            </p>
                        </div>
                        <LoginForm status={status} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
