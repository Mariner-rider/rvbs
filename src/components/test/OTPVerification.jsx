import { useState, useEffect, useRef } from "react";
import { X, Shield } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const OTPVerification = ({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
  autoSendOTP = false,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  // const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen && autoSendOTP) {
      handleSendOTP();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (timer > 0 && !canResend) {
  //     const interval = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   } else if (timer === 0) {
  //     setCanResend(true);
  //   }
  // }, [timer, canResend]);
  useEffect(() => {
    if (otpSent && timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (otpSent && timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend, otpSent]);


  const handleSendOTP = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/send-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setSuccessMessage(`OTP sent to ${email}`);
      setTimer(60);
      setCanResend(false);
      setOtpSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send OTP";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpValue,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid OTP");
      }

      setSuccessMessage("OTP verified successfully!");
      setTimeout(() => {
        onVerificationSuccess();
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid OTP";
      setError(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }

    // if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
    //   setTimeout(() => {
    //     handleVerifyOTP();
    //   }, 100);
    // }

  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setError("");
    } else if (e.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill("")).slice(0, 6);
      setOtp(newOtp);
      const focusIndex = Math.min(pastedData.length, 5);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    }
  };

  const handleResend = () => {
    if (canResend) {
      setOtp(["", "", "", "", "", ""]);
      handleSendOTP();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl p-8 w-full max-w-md relative transform transition-all duration-300 scale-100">
        <button
          onClick={() => {
            // Close OTP modal
            onClose();

            // Refresh login form (soft refresh)
            // window.location.reload();
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Code</h2>
          <p className="text-sm text-gray-500">
            Enter the code sent to your email
          </p>
          <p className="text-sm font-medium text-gray-700 mt-1">{email}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
            {successMessage}
          </div>
        )}

        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading}
              className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg transition-all duration-200 ${error
                ? "border-red-400 bg-red-50 text-red-600"
                : digit
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-white text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50`}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          {otpSent && (
            <div className="text-sm text-gray-600 mb-2">{formatTime(timer)}</div>
          )}
        </div>


        <button
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.some((digit) => !digit)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            </div>
          ) : (
            "Verify"
          )}
        </button>

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={!canResend || isLoading}
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Didn't receive a code?{" "}
            <span className="font-semibold underline">Resend Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
