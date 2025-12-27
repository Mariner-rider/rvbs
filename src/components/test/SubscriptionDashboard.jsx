import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  Check, 
  X, 
  Loader2,
  RefreshCw,
  Zap,
  Lock
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const SubscriptionDashboard = () => {
  const { userToken } = useContext(AuthContext);

  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    if (userToken) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [userToken]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchSubscription(),
        fetchPaymentHistory()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscription/current/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/history/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/subscription/cancel/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Subscription cancelled successfully. You have been moved to the Free plan.');
        setShowCancelModal(false);
        await fetchSubscription();
      } else {
        throw new Error(data.message || 'Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel subscription: ' + error.message);
    } finally {
      setCancelLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'success': 'bg-green-100 text-green-800 border-green-300',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'failed': 'bg-red-100 text-red-800 border-red-300',
      'refunded': 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[status] || colors['pending'];
  };

  const getPlanBadgeColor = (planName) => {
    const colors = {
      'free': 'bg-gray-100 text-gray-800 border-gray-300',
      'monthly': 'bg-purple-100 text-purple-800 border-purple-300',
      'six_months': 'bg-blue-100 text-blue-800 border-blue-300',
      'yearly': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };
    return colors[planName] || colors['free'];
  };

  // Loading state
  if (loading && userToken) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </>
    );
  }

  // Not logged in state - Simple message without sign in button
  if (!userToken) {
    return (
      <>
        <Header />
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Subscription Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your subscription and view payment history
              </p>
            </div>

            {/* Empty Dashboard for non-logged in users */}
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                <Lock className="w-10 h-10 text-purple-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Sign In Required
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Please sign in to view and manage your subscription details, payment history, and plan information.
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </>
    );
  }

  // Logged in state - Show actual dashboard
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Subscription Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your subscription and view payment history
            </p>
          </div>

          {/* Current Subscription Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${
                  subscription?.is_paid 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'bg-gray-200'
                }`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Current Plan
                  </h2>
                  <p className="text-sm text-gray-600">
                    {subscription?.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              
              {subscription?.is_paid && subscription?.is_active && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                  Cancel Subscription
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Name */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Plan Type</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    getPlanBadgeColor(subscription?.plan?.name)
                  }`}>
                    {subscription?.plan?.display_name || 'Free Plan'}
                  </span>
                </div>
              </div>

              {/* Start Date */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Start Date</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {subscription?.start_date 
                      ? formatDate(subscription.start_date)
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>

              {/* End Date / Status */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">
                  {subscription?.plan?.name === 'free' ? 'Status' : 'Expires On'}
                </p>
                <div className="flex items-center space-x-2">
                  {subscription?.plan?.name === 'free' ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        Free Plan
                      </span>
                    </>
                  ) : subscription?.end_date ? (
                    <>
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {formatDate(subscription.end_date)}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-gray-900">
                      Unlimited
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            {subscription?.is_paid ? (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-green-600 mb-3">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Active Benefits</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Unlimited Access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No Ads</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>All Features</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Upgrade to Premium
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get unlimited access, no ads, and priority support
                      </p>
                      <button
                        onClick={() => window.location.href = '/test/pricing'}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
                      >
                        View Plans
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment History
                </h2>
              </div>
              <button
                onClick={fetchPaymentHistory}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {payments.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No payment history yet</p>
                <p className="text-sm text-gray-500">
                  Your payment transactions will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {payment.plan}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            getStatusColor(payment.status)
                          }`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Amount</p>
                            <p className="font-medium text-gray-900">
                              ₹{Math.floor(parseFloat(payment.amount))}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-600 mb-1">Date</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(payment.created_at)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-600 mb-1">Payment Method</p>
                            <p className="font-medium text-gray-900">
                              {payment.payment_method || 'Online'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-600 mb-1">Transaction ID</p>
                            <p className="font-mono text-xs text-gray-700">
                              {payment.razorpay_payment_id 
                                ? payment.razorpay_payment_id.substring(0, 15) + '...'
                                : 'N/A'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Cancel Subscription?
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You will:
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <X className="w-4 h-4 text-red-500" />
                <span>Lose unlimited access</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <X className="w-4 h-4 text-red-500" />
                <span>See ads again</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <X className="w-4 h-4 text-red-500" />
                <span>Go back to 10 credits/day limit</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelLoading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={cancelLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {cancelLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <span>Yes, Cancel</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SubscriptionDashboard;