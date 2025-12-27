import React, { useState, useEffect, useContext } from "react";
import { Check, ChevronRight, Loader2, LogIn } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

const PricingPage = () => {
  const { userToken } = useContext(AuthContext);
  
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(null);

  const API_BASE_URL = "http://localhost:8000";

  // Fetch subscription plans from backend only if user is logged in
  useEffect(() => {
    if (userToken) {
      fetchPlans();
      fetchCurrentSubscription();
    }
  }, [userToken]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subscription/plans/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscription/current/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setCurrentSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  // Handle plan purchase
  const handlePurchase = async (plan) => {
    if (!userToken) {
      alert('Please login first to purchase a plan!');
      return;
    }

    // Free plan - no payment needed
    if (plan.name === 'free') {
      alert('You are already on the free plan!');
      return;
    }

    // Check if already on this plan
    if (currentSubscription?.plan?.name === plan.name && currentSubscription?.is_active) {
      alert('You are already subscribed to this plan!');
      return;
    }

    setPaymentLoading(plan.id);

    try {
      const orderResponse = await fetch(`${API_BASE_URL}/payment/create-order/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id: plan.id })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const options = {
        key: orderData.razorpay_key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'BharatAI',
        description: `${plan.display_name} Subscription`,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
        },
        theme: {
          color: '#8B5CF6'
        },
        handler: async function(response) {
          await verifyPayment(response);
        },
        modal: {
          ondismiss: function() {
            setPaymentLoading(null);
            console.log('Payment cancelled by user');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
      setPaymentLoading(null);
    }
  };

  // Verify payment
  const verifyPayment = async (razorpayResponse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/verify/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_signature: razorpayResponse.razorpay_signature
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment successful! Your subscription is now active.');
        await fetchCurrentSubscription();
        setPaymentLoading(null);
      } else {
        throw new Error(data.message || 'Payment verification failed');
      }

    } catch (error) {
      console.error('Verification error:', error);
      alert('Payment verification failed: ' + error.message);
      setPaymentLoading(null);
    }
  };

  // Map plan names to colors
  const getPlanColor = (planName) => {
    const colors = {
      'free': {
        bg: 'bg-white',
        text: 'text-gray-900',
        button: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
        dot: 'bg-gray-400',
        featureText: 'text-gray-700'
      },
      'monthly': {
        bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
        text: 'text-white',
        button: 'bg-gray-800 text-white hover:bg-gray-900',
        dot: 'bg-purple-300',
        featureText: 'text-purple-100',
        popular: true
      },
      'six_months': {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-white',
        button: 'bg-blue-700 text-white hover:bg-blue-800',
        dot: 'bg-blue-300',
        featureText: 'text-blue-100'
      },
      'yearly': {
        bg: 'bg-gradient-to-br from-emerald-400 to-emerald-500',
        text: 'text-white',
        button: 'bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-400',
        dot: 'bg-emerald-300',
        featureText: 'text-emerald-100'
      }
    };
    return colors[planName] || colors['free'];
  };

  // Get button text based on current subscription
  const getButtonText = (plan) => {
    if (plan.name === 'free') {
      return 'Free Plan';
    }
    
    if (currentSubscription?.plan?.name === plan.name && currentSubscription?.is_active) {
      return 'Current Plan';
    }
    
    return 'Get Started';
  };

  // Check if button should be disabled
  const isButtonDisabled = (plan) => {
    return (
      plan.name === 'free' ||
      (currentSubscription?.plan?.name === plan.name && currentSubscription?.is_active) ||
      paymentLoading !== null
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Entire Page Gradient Background */}
      <div
        className="min-h-screen py-12 px-4"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 0%,
              transparent 30%,
              rgba(255, 255, 255, 0.6) 70%,
              rgba(255, 255, 255, 0.6) 100%
            ),
            linear-gradient(
              to right,
              #e2eef6 0%,
              #d3def8 45%,
              #c8d3f8 65%,
              #dcd6f7 85%,
              #f1eef6 100%
            )`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative w-full h-80 overflow-hidden rounded-3xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
              <div className="absolute inset-0">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl transform rotate-12"></div>
                <div className="absolute top-10 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/40 to-transparent rounded-full blur-2xl transform -rotate-45"></div>
                <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-2xl transform rotate-45"></div>
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-300/25 to-transparent rounded-full blur-2xl transform rotate-30"></div>
                <div className="absolute top-16 left-32 w-64 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl transform rotate-45 skew-x-12"></div>
                <div className="absolute bottom-16 right-32 w-56 h-40 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-xl transform -rotate-30 skew-y-12"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <h1 className="text-5xl font-light text-white">Pricing plans</h1>
            </div>
          </div>

          {/* Current Subscription Status - Only show if logged in */}
          {userToken && currentSubscription && currentSubscription.plan.name !== 'free' && currentSubscription.is_active && (
            <div className="mb-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Current Plan: {currentSubscription.plan.display_name}
                  </h3>
                  <p className="text-purple-100">
                    {currentSubscription.end_date ? 
                      `Expires on: ${new Date(currentSubscription.end_date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}` 
                      : 'Unlimited access'
                    }
                  </p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium">No Ads • Unlimited Access</span>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Cards Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
                Choose the plan that fits your needs
              </h2>
            </div>
            
            {/* Show sign-in card when not logged in */}
            {!userToken ? (
              <div className="max-w-lg mx-auto">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg text-center">
                  <div className="mb-6">
                    <LogIn className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      Sign in to view pricing plans
                    </h3>
                    <p className="text-purple-100">
                      Please sign in to see our pricing options and subscribe to a plan that fits your needs
                    </p>
                  </div>
                </div>
              </div>
            ) : plans.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading pricing plans...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {plans.map((plan) => {
                  const colors = getPlanColor(plan.name);
                  const buttonText = getButtonText(plan);
                  const disabled = isButtonDisabled(plan);
                  const isLoading = paymentLoading === plan.id;

                  return (
                    <div key={plan.id} className="relative flex flex-col h-full">
                      {/* Popular Badge for Monthly Plan */}
                      {colors.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-white text-purple-600 px-6 py-2 rounded-full text-sm font-medium border border-purple-200">
                            Popular
                          </span>
                        </div>
                      )}

                      <div className={`${colors.bg} rounded-3xl p-8 shadow-lg ${plan.name === 'free' ? 'border border-gray-200' : ''} flex flex-col h-full`}>
                        <div className="mb-6">
                          <h3 className={`text-3xl font-bold mb-2 ${colors.text}`}>
                            {plan.display_name}
                          </h3>
                          <p className={`${plan.name === 'free' ? 'text-gray-800' : colors.featureText} text-sm`}>
                            {plan.name === 'free' && 'Great for trying out'}
                            {plan.name === 'monthly' && 'Perfect for regular users'}
                            {plan.name === 'six_months' && 'Best value - Save 17%'}
                            {plan.name === 'yearly' && 'Maximum savings - 30% off'}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-8 flex-grow">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                              <span className={`${colors.featureText} whitespace-nowrap text-sm`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          {plan.price === '0.00' || plan.price === '0' ? (
                            <span className={`text-5xl font-bold ${colors.text}`}>Free</span>
                          ) : (
                            <div className="flex items-baseline">
                              <span className={`text-5xl font-bold ${colors.text}`}>
                                ₹{Math.floor(parseFloat(plan.price))}
                              </span>
                              <span className={`${plan.name === 'free' ? 'text-gray-600' : colors.featureText} ml-1`}>
                                /{plan.name === 'monthly' ? 'mo' : plan.name === 'six_months' ? '6mo' : 'yr'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Button */}
                        <button
                          onClick={() => handlePurchase(plan)}
                          disabled={disabled}
                          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${colors.button} ${
                            disabled ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span>{buttonText}</span>
                              <span className="text-3xl">›</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <section className="text-black py-16">
          <div className="container mx-auto px-16">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left */}
              <div className="lg:w-1/2 space-y-8">
                <div className="text-sm text-gray-400 tracking-wide">
                  [ get in touch ]
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  We are always ready to help you and answer your questions
                </h2>
                <p className="text-black">
                  Have questions or need assistance? Contact us anytime.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-gray-800">+91-05124050467</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Our Location</h4>
                    <p className="text-gray-800">
                      Lucknow, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <div className="bg-white text-black px-4 py-2 rounded-xl inline-block">
                    Contact@bharatai.bsearch.in
                  </div>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    Get in Touch
                  </h3>
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Message"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
                    >
                      Send message <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
