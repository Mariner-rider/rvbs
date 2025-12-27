import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  ShieldCheck,
  User,
  ClipboardList,
  Share2,
  KeyRound,
  Lock,
  Clock,
  Users,
  Cpu,
  Globe,
  RefreshCw,
  Mail
} from 'lucide-react';

// Gradient color map for different sections
const gradientMap = {
  info: 'from-pink-500 to-orange-500',
  usage: 'from-blue-500 to-cyan-500',
  share: 'from-purple-500 to-pink-500',
  rights: 'from-green-500 to-emerald-500',
  security: 'from-indigo-500 to-blue-500',
  retention: 'from-yellow-500 to-orange-500',
  children: 'from-rose-500 to-red-500',
  ai: 'from-fuchsia-500 to-purple-500',
  intl: 'from-sky-500 to-blue-500',
  amend: 'from-amber-500 to-yellow-500',
  contact: 'from-teal-500 to-green-500'
};

// Reusable section heading component - Made fully responsive
const SectionHeading = ({ icon: Icon, title, colorKey }) => (
  <div className="flex items-start sm:items-center gap-3 mb-4">
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradientMap[colorKey]} text-white shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{title}</h2>
  </div>
);

const Privacy = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Top Hero Section - Fully Responsive */}
          <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 lg:mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
              <div className="absolute inset-0">
                {/* Responsive decorative shapes */}
                <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-2xl sm:blur-3xl rotate-12"></div>
                <div className="absolute top-5 sm:top-10 left-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-blue-400/40 to-transparent rounded-full blur-xl sm:blur-2xl -rotate-45"></div>
                <div className="absolute -bottom-5 sm:-bottom-10 left-1/3 w-36 sm:w-54 md:w-72 h-36 sm:h-54 md:h-72 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-xl sm:blur-2xl rotate-45"></div>
                <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl sm:blur-3xl -rotate-12"></div>
                <div className="absolute bottom-0 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-blue-300/25 to-transparent rounded-full blur-xl sm:blur-2xl rotate-30"></div>
                <div className="absolute top-8 sm:top-16 left-16 sm:left-32 w-32 sm:w-48 md:w-64 h-24 sm:h-36 md:h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg sm:blur-xl rotate-45 skew-x-12"></div>
                <div className="absolute bottom-8 sm:bottom-16 right-16 sm:right-32 w-28 sm:w-42 md:w-56 h-20 sm:h-30 md:h-40 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-lg sm:blur-xl -rotate-30 skew-y-12"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight">Privacy Policy</h1>
              </div>
            </div>
          </div>

          {/* Content - Fully Responsive */}
          <div className="p-4 sm:p-6 lg:p-10 text-gray-900 space-y-6 sm:space-y-8 lg:space-y-10 leading-relaxed">

            <section>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                At BharatAI, we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, disclose, and protect information when you use our artificial intelligence services, website, and related applications.
              </p>
            </section>

            <section>
              <SectionHeading icon={User} title="Information We Collect" colorKey="info" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Personal Information</h3>
                  <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-sm sm:text-base lg:text-lg">
                    <li>Full name, email address, phone number, and demographic information</li>
                    <li>Account credentials and authentication data</li>
                    <li>Payment information and billing details</li>
                    <li>Communication preferences and support interactions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Non-Personal Information</h3>
                  <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-sm sm:text-base lg:text-lg">
                    <li>Browsing patterns, time spent on our platform, and usage analytics</li>
                    <li>Device information, IP address, and technical specifications</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>AI interaction data and query patterns (anonymized)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading icon={ClipboardList} title="How We Use Your Information" colorKey="usage" />
              <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-sm sm:text-base lg:text-lg">
                <li>To provide and maintain the Service and improve user experience</li>
                <li>To process transactions and manage your account</li>
                <li>To communicate with you about updates, security alerts, and support</li>
                <li>To personalize AI responses and improve our algorithms</li>
                <li>To comply with legal obligations and protect our rights</li>
                <li>To conduct research and development for better AI services</li>
              </ul>
            </section>

            <section>
              <SectionHeading icon={Share2} title="Sharing and Disclosure" colorKey="share" />
              <div className="space-y-3 text-sm sm:text-base lg:text-lg">
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li>With affiliates, partners, and trusted service providers under strict confidentiality agreements</li>
                  <li>When required by law, court order, or regulatory requirements</li>
                  <li>To protect our rights, property, or safety, and that of our users</li>
                  <li>In connection with business transfers or corporate restructuring</li>
                  <li>With your explicit consent for specific purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <SectionHeading icon={KeyRound} title="Your Rights" colorKey="rights" />
              <div className="space-y-3 text-sm sm:text-base lg:text-lg">
                <p>You have rights under GDPR and Indian data protection laws including:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request removal of your personal data</li>
                  <li><strong>Portability:</strong> Transfer your data to another service</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                </ul>
              </div>
            </section>

            <section>
              <SectionHeading icon={Lock} title="Data Security and Protection" colorKey="security" />
              <p className="text-sm sm:text-base lg:text-lg">We implement administrative, technical, and physical safeguards to protect your information including encryption, secure servers, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <SectionHeading icon={Clock} title="Data Retention" colorKey="retention" />
              <p className="text-sm sm:text-base lg:text-lg">We retain your personal data only as long as necessary for the purposes outlined in this policy, typically for the duration of your account plus up to 7 years for legal and regulatory compliance, unless a longer retention period is required or permitted by law.</p>
            </section>

            <section>
              <SectionHeading icon={Users} title="Children's Privacy" colorKey="children" />
              <p className="text-sm sm:text-base lg:text-lg">Our Service is not intended for individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete such information promptly.</p>
            </section>

            <section>
              <SectionHeading icon={Cpu} title="AI-Specific Laws and Regulations in India" colorKey="ai" />
              <div className="space-y-3 text-sm sm:text-base lg:text-lg">
                <p>BharatAI adheres to IT Act 2000, Digital Personal Data Protection Act 2023, and emerging AI governance frameworks in India. We ensure:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li>Transparency in AI decision-making processes</li>
                  <li>Algorithmic accountability and bias mitigation</li>
                  <li>Data localization compliance where required</li>
                  <li>Regular audits of AI systems for fairness and accuracy</li>
                </ul>
              </div>
            </section>

            <section>
              <SectionHeading icon={Globe} title="International Data Transfers" colorKey="intl" />
              <p className="text-sm sm:text-base lg:text-lg">Your data may be stored or processed outside India. When we transfer data internationally, we ensure adequate protection through standard contractual clauses, adequacy decisions, or other appropriate safeguards as required by applicable laws.</p>
            </section>

            <section>
              <SectionHeading icon={RefreshCw} title="Amendments to the Privacy Policy" colorKey="amend" />
              <p className="text-sm sm:text-base lg:text-lg">We may update this policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify users of material changes through email, in-app notifications, or prominent website notices at least 30 days before the changes take effect.</p>
            </section>

            <section>
              <SectionHeading icon={Mail} title="Contact Us" colorKey="contact" />
              <div className="space-y-2 text-sm sm:text-base lg:text-lg">
                <p>For questions about this Privacy Policy or to exercise your rights, please contact us:</p>
                <div className="pl-4 space-y-1">
                  <p><strong className="text-gray-800">Email:</strong> Contact@bharatai.bsearch.in</p>
                  <p><strong className="text-gray-800">Data Protection Officer:</strong> privacy@bharatai.bsearch.in</p>
                  <p><strong className="text-gray-800">Phone:</strong> +91-05124050467</p>
                  <p><strong className="text-gray-800">Address:</strong> Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <SectionHeading icon={ShieldCheck} title="Cookies and Tracking Technologies" colorKey="security" />
              <div className="space-y-3 text-sm sm:text-base lg:text-lg">
                <p>We use cookies and similar technologies to enhance your experience:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                </ul>
                <p>You can manage cookie preferences through your browser settings or our cookie preference center.</p>
              </div>
            </section>

            {/* Last Updated */}
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

export default Privacy;
