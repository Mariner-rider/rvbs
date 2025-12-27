import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Terms = () => {
  return (
    <>
      <Header />

      {/* Hero Section - Fully Responsive */}
      <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Banner */}
          <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 lg:mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
              <div className="absolute inset-0">
                <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
                <div className="absolute top-5 sm:top-10 left-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-blue-400/40 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute -bottom-5 sm:-bottom-10 left-1/3 w-36 sm:w-54 md:w-72 h-36 sm:h-54 md:h-72 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-blue-300/25 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight">Terms of Use</h1>
            </div>
          </div>

          {/* Terms Content */}
          <div className="p-4 sm:p-6 lg:p-10 text-gray-900 space-y-6 sm:space-y-8 lg:space-y-12 leading-relaxed">

            {/* 1. Acceptance of Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg">
                <p>These Terms of Use ("Terms") govern your access to and use of BharatAI's services. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
                <p>If you do not agree to these Terms, you must immediately stop using the Services.</p>
                <p>We may modify these Terms at any time with notice. Continued use after changes means you accept the updated Terms.</p>
              </div>
            </section>

            {/* 2. Termination and Suspension */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">2. Termination and Suspension</h2>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-gray-700">Your Rights to Terminate</h3>
              <p className="text-sm sm:text-base lg:text-lg mb-4">You may stop using the Services at any time without notice, including cancelling any subscriptions or paid features.</p>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-gray-700">BharatAI's Rights</h3>
              <p className="text-sm sm:text-base lg:text-lg mb-3">We may suspend or terminate without notice if:</p>
              <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-sm sm:text-base lg:text-lg">
                <li>Violation of Terms or policies</li>
                <li>Legal or regulatory requirements</li>
                <li>Risk to service integrity or other users</li>
                <li>Extended inactivity (typically 12+ months)</li>
                <li>Suspected fraudulent or malicious activity</li>
              </ul>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-gray-700">Appeal Process</h3>
              <p className="text-sm sm:text-base lg:text-lg">Appeal within 30 days of suspension/termination. We will review in good faith but may uphold our decision.</p>
            </section>

            {/* 3. Discontinuation of Services */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">3. Discontinuation of Services</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg">
                <p><strong>Temporary:</strong> May occur for maintenance or technical issues. We try to give advance notice.</p>
                <p><strong>Permanent:</strong> If services end, we give at least 30 days' notice, help with data export, and refund unused prepaid periods where applicable.</p>
              </div>
            </section>

            {/* 4. Disclaimer of Warranties */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">4. Disclaimer of Warranties</h2>
              <p className="text-sm sm:text-base lg:text-lg">Services are provided "as is" without warranties. We disclaim all implied warranties including merchantability and fitness. We do not guarantee uninterrupted or error-free operation. You are solely responsible for any decisions made based on BharatAI outputs, including those involving user-generated content.</p>
            </section>

            {/* 5. Limitation of Liability */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">5. Limitation of Liability</h2>
              <p className="text-sm sm:text-base lg:text-lg">To the fullest extent permitted by law, BharatAI is not liable for indirect, incidental, or special damages. Our total liability is capped at the greater of $100 or the amount you paid in the last 12 months.</p>
            </section>

            {/* 6. Indemnity */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">6. Indemnity</h2>
              <p className="text-sm sm:text-base lg:text-lg">You agree to indemnify BharatAI and affiliates from claims arising from your use of the Services or any content you post that causes harm or infringes the rights of others.</p>
            </section>

            {/* 7. Dispute Resolution */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">7. Dispute Resolution</h2>
              <p className="text-sm sm:text-base lg:text-lg">You agree to first try to resolve disputes informally. If unresolved, disputes go to binding arbitration under NAM rules in Lucknow, India. You waive any right to participate in a class action.</p>
            </section>

            {/* 8. Copyright Complaints */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">8. Copyright Complaints</h2>
              <p className="text-sm sm:text-base lg:text-lg">Send notice with: (1) your contact info, (2) copyrighted work description, (3) infringing material location, (4) statement of good faith belief, (5) statement under penalty of perjury, (6) your signature.</p>
            </section>

            {/* 9. General Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">9. General Terms</h2>
              <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-sm sm:text-base lg:text-lg">
                <li>You must comply with all applicable laws</li>
                <li>You may not assign rights without our consent</li>
                <li>Delay in enforcement doesn’t waive our rights</li>
                <li>If any provision is invalid, others remain effective</li>
                <li>These Terms are the entire agreement and governed by Indian law in Lucknow jurisdiction</li>
              </ul>
            </section>

            {/* 10. Contact Information */}
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">10. Contact Information</h2>
              <div className="space-y-2 text-sm sm:text-base lg:text-lg">
                <p><strong>Email:</strong> Contact@bharatai.bsearch.in, Support@bharatai.bsearch.in, Info@bharatai.bsearch.in</p>
                <p><strong>Phone:</strong> +91-05124050467</p>
                <p><strong>Address:</strong> Lucknow, Uttar Pradesh, India</p>
              </div>
            </section>

            <section className="pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">Last updated: December 2024</p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Terms;
