import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!otp.trim() || !newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",
                {
                    otp: otp.trim(),
                    newPassword,
                    email: email.trim(),
                }
            );
            toast.success("Password reset successful!");
            navigate("/login");
        } catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "Error resetting password.. try again!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    async function sendOtp() {

        if (!email.trim()) {
        toast.error("Please enter your email");
        return;
                }

        setLoading(true);        

        try {
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/users/send-otp",
                {
                    email:  email.trim() , 
                }
            );
            toast.success("OTP is sent to your email");
            setOtpSent(true);
        } catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "Error sending OTP.. try again!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {loading && <Loader />}

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {otpSent ? "Reset Password" : "Forgot Password"}
                </h2>

                {/* STEP 1 */}
                {!otpSent && (
                    <div className="space-y-4">
                        <input
                            type="email"
                             value={email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {otpSent && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}