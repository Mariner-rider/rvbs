import { Footer2 } from "./Home/Footer";
import Navbar from "./Home/Navbar";
import image from "../assets/images/compliant.png";
import dataCollection from "../assets/icons/data-retention.png";
import retention from "../assets/icons/protection.png";
import dataSharing from "../assets/icons/data-sharing.png";
import rights from "../assets/icons/rights.png";
import information from "../assets/icons/folder.png";
import regulation from "../assets/icons/regulation.png";
import dataex from "../assets/icons/dataex.png";
import compliant from "../assets/icons/compliant.png";
import customer from "../assets/icons/customer.png";
import security from "../assets/icons/security.png";
import children from "../assets/icons/children.png";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0d0d0d]">
      <Navbar />
      <div className="px-4 pt-40 md:pt-42">
        <div className="flex justify-center w-56 mx-auto">
          <img src={image} />
        </div>
        <h1 className=" text-center text-6xl md:text-8xl xl:text-[8rem] font-bold text-gray-200">
          Privacy Policy
        </h1>
        <div className="container border-t mx-auto mt-28 md:mt-36 px-4 py-8 max-w-4xl">
          <p className="mb-4 text-gray-200">
            <strong className="text-xl pr-1">At BharatAI,</strong> we are
            committed to protecting your privacy and handling your personal
            information responsibly. This Privacy Policy explains how we
            collect, use, disclose, and protect your personal information when
            you interact with our services, including our website, mobile
            applications, AI-driven tools, and other related services
            (collectively referred to as the “Service”). The policy also covers
            the legal basis for processing your personal information in
            accordance with{" "}
            <strong>
              the General Data Protection Regulation (GDPR), the Information
              Technology Act, 2000 (IT Act),
            </strong>{" "}
            and other relevant laws in India related to artificial intelligence
            (AI).
          </p>
          <p className="mb-4 text-gray-200">
            By using our Service, you consent to the practices outlined in this
            Privacy Policy. If you do not agree with this Privacy Policy, please
            do not use our Service.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={dataCollection} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Information We Collect
            </h2>
          </div>

          <p className="mb-4 text-gray-200">
            BharatAI collects various types of personal and non-personal data to
            provide and improve our Service. The following is a detailed
            breakdown of the types of information we may collect:
          </p>

          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li className="text-gray-200">
              <strong className="text-gray-200">Personal Information</strong>
              <p className="text-gray-200 ml-5">
                We collect identifiable information, including but not limited
                to:
              </p>
              <p className="text-gray-200 ml-5">
                <span className="underline">Identification Information:</span>{" "}
                Full name, email address, phone number, postal address, and
                contact details.
                <br />
                <span className="underline">Account Information:</span> User ID,
                password, account preferences, and other authentication data.
                <br /> <span>Geolocation Data:</span> Physical location or
                movements tracked by GPS or other location-tracking
                technologies.
                <br />
                <span className="underline">Sensitive Personal Data:</span>{" "}
                Payment card details, financial information, login credentials,
                and security questions for account recovery.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Non-Personal Information
              </strong>
              <p className="text-gray-200 ml-5">
                We also collect non-identifiable data such as:
              </p>
              <p className="text-gray-200 ml-5">
                <span className="underline">Usage Data:</span> Browsing
                patterns, time spent on the Service, actions taken on the
                platform (e.g., clicks, searches). <br />
                <span className="underline">AI Interaction Data:</span> Input
                data provided by you for AI processing, outputs generated by AI,
                and metadata related to your interactions with AI tools.
                <br /> <span className="underline">
                  Device Information:
                </span>{" "}
                Device type, operating system, browser type, and unique device
                identifiers.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={information} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              How We Use Your Information
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            How We Use Your Information
          </h2> */}
          <p className="mb-4 text-gray-200">
            We use the information we collect for the following purposes:
          </p>
          <p className="mb-4">
            <span className="underline">Service Delivery:</span> To provide you
            with the functionality of the Service, including processing
            transactions and enabling access to AI models.
            <br />
            <span className="underline">AI Training & Improvement:</span> To
            improve our AI models, including machine learning and model
            fine-tuning using anonymized and aggregated data. <br />
            <span className="underline">Customization:</span> To personalize the
            Service experience, such as recommendations or customized results
            based on your preferences and usage. <br />
            <span className="underline">Communication:</span> To communicate
            with you about account-related updates, new features, marketing
            communications, and important notices.
            <br />
            <span className="underline">Security and Fraud Prevention:</span> To
            monitor and secure the Service from unauthorized access, fraud, or
            misuse.
            <br />
            <span className="underline">Legal Compliance:</span> To comply with
            applicable legal requirements, including responses to law
            enforcement and regulatory authorities.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={dataSharing} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Sharing and Disclosure of Your Information
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Sharing and Disclosure of Your Information
          </h2> */}
          <p className="mb-4 text-gray-200">
            We may share your personal data under the following circumstances:
          </p>

          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">
                Affiliates and Service Providers
              </strong>
              <p className="text-gray-200 ml-5">
                We may share your information with our affiliates, partners,
                vendors, and service providers to assist with the provision of
                our services, including payment processors, cloud service
                providers, and data analysts. These parties process data on our
                behalf and are bound by contractual obligations to protect your
                data.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Legal Compliance and Protection
              </strong>
              <p className="text-gray-200 ml-5">
                We may disclose your information to comply with legal
                obligations, respond to legal requests, prevent fraud, protect
                our users' safety, and protect our rights or the rights of third
                parties. Indian Laws: We may disclose data as required under the
                Information Technology Act, 2000 (IT Act) and the Indian Penal
                Code, 1860, particularly for purposes related to cybercrime,
                fraud prevention, and national security.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Business Transfers</strong>
              <p className="text-gray-200 ml-5">
                If BharatAI undergoes a merger, acquisition, or sale of assets,
                your personal data may be transferred as part of the
                transaction. We will notify you of any such change in ownership
                or control of your data.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">AI Model Training</strong>
              <p className="text-gray-200 ml-5">
                Input data and output generated by AI models may be used to
                improve our AI capabilities, subject to de-identification and
                aggregation to ensure no personal identification.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Third-Party Links</strong>
              <p className="text-gray-200 ml-5">
                Our Service may contain links to third-party websites, and we
                are not responsible for their privacy practices. These external
                sites are governed by their own privacy policies, not this
                Privacy Policy.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={rights} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Your Rights Regarding Personal Information
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Your Rights Regarding Personal Information
          </h2> */}

          <p className="mb-4 text-gray-200">
            Under the General Data Protection Regulation (GDPR), Indian data
            protection laws, and related privacy regulations, you have the
            following rights regarding your personal information:
          </p>

          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">Right to Access</strong>
              <p className="text-gray-200 ml-5">
                You have the right to request a copy of the personal data we
                hold about you.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Right to Rectification</strong>
              <p className="text-gray-200 ml-5">
                You can request the correction of any inaccuracies or completion
                of incomplete personal data.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Right to Erasure (Right to be Forgotten)
              </strong>
              <p className="text-gray-200 ml-5">
                You have the right to request the deletion of your personal data
                under specific circumstances, such as when the data is no longer
                necessary for the purpose for which it was collected or if you
                withdraw your consent.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Right to Restriction of Processing
              </strong>
              <p className="text-gray-200 ml-5">
                You can request that we restrict the processing of your personal
                information in certain circumstances, such as when the accuracy
                of the data is contested.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Right to Data Portability
              </strong>
              <p className="text-gray-200 ml-5">
                You may request that we provide your personal data in a
                structured, commonly used, and machine-readable format, and
                transmit it to another controller if feasible.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Right to Object</strong>
              <p className="text-gray-200 ml-5">
                You can object to the processing of your personal data for
                certain purposes, including direct marketing.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Right to Withdraw Consent
              </strong>
              <p className="text-gray-200 ml-5">
                If we rely on your consent for processing, you can withdraw that
                consent at any time. The withdrawal of consent does not affect
                the lawfulness of processing before the withdrawal. To exercise
                any of the above rights, please contact us at
                support@bharatai.com. We may need to verify your identity before
                fulfilling certain requests.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={security} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Data Security and Protection
            </h2>
          </div>

          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Data Security and Protection
          </h2> */}

          <p className="mb-4 text-gray-200">
            We adopt a range of administrative, technical, and physical measures
            to protect your personal information from unauthorized access,
            misuse, and alteration. However, no method of electronic
            transmission or storage is completely secure, and while we strive to
            protect your data, we cannot guarantee its absolute security.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={retention} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">Data Retention</h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Data Retention
          </h2> */}
          <p className="mb-4 text-gray-200">
            We retain your personal data only for as long as is necessary to
            fulfill the purposes outlined in this Privacy Policy or as required
            by law, such as for compliance with tax, accounting, or legal
            obligations. Once the retention period has expired, we will securely
            delete or anonymize your personal data.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={children} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Children’s Privacy
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Children’s Privacy
          </h2> */}
          <p className="mb-4 text-gray-200">
            Our Service is not intended for individuals under the age of 13, and
            we do not knowingly collect personal information from children. If
            we become aware that we have collected personal information from a
            child under 13, we will take steps to delete such data.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={regulation} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              AI-Specific Laws and Regulations in India
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            AI-Specific Laws and Regulations in India
          </h2> */}
          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">
                Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011 (under the IT Act, 2000)
              </strong>
              <p className="text-gray-200 ml-5">
                These rules mandate how organizations should handle sensitive
                personal data and adopt reasonable security measures to protect
                it. BharatAI adheres to these guidelines, ensuring the
                confidentiality, integrity, and security of sensitive data like
                payment card information and login credentials.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Personal Data Protection Bill, 2019
              </strong>
              <p className="text-gray-200 ml-5">
                The Personal Data Protection Bill, 2019 (PDPB), currently under
                discussion in India, proposes significant regulations for data
                protection in India, including explicit rules on consent, data
                processing, rights of individuals, and data breaches. BharatAI
                is actively monitoring the progress of this bill and will comply
                with its provisions once enacted.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                National Artificial Intelligence Strategy
              </strong>
              <p className="text-gray-200 ml-5">
                The Indian government’s National AI Strategy aims to promote AI
                adoption in India while ensuring ethical considerations, data
                privacy, and security. BharatAI is aligned with these national
                guidelines to ensure that AI technologies we use comply with the
                principles of fairness, transparency, and accountability.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                The National Data Governance Framework Policy
              </strong>
              <p className="text-gray-200 ml-5">
                India is introducing frameworks and policies that regulate data
                governance for AI and machine learning models. BharatAI adheres
                to these evolving regulations to ensure that data is used
                ethically and responsibly.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={dataex} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              International Data Transfers
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            International Data Transfers
          </h2> */}

          <p className="mb-4 text-gray-200">
            BharatAI may store and process your data on servers located outside
            your country of residence. If you are in the European Union (EU) or
            other jurisdictions with strict data protection laws, this may
            involve the transfer of your data to countries with different levels
            of data protection. We ensure that these transfers comply with
            applicable data protection laws and are subject to appropriate
            safeguards, such as Standard Contractual Clauses (SCCs).
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={compliant} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Amendments to the Privacy Policy
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Amendments to the Privacy Policy
          </h2> */}
          <p className="mb-4 text-gray-200">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. When we make material changes,
            we will notify you through our Service or by email. The updated
            Privacy Policy will be posted on this page, and the effective date
            will be updated accordingly.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={customer} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">Contact Us</h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Contact Us
          </h2> */}
          <p className="mb-4 text-gray-200">
            If you have any questions or concerns regarding this Privacy Policy
            or how we handle your personal data, please contact us at:
            <strong className="text-gray-200">
              <br /> BharatAI Email: Contact@bharatai.bsearch.in,
              Support@bharatai.bsearch.in, Info@bharatai.bsearch.in <br />{" "}
              Phone: +91-05124050467 <br />
              Address: Lucknow, Uttar Pradesh, India
            </strong>
          </p>

          <p className="mb-4 mt-12">
            This privacy policy is subject to change without notice.
          </p>
        </div>
      </div>
      
      <Footer2 />
    </div>
  );
};

export default PrivacyPolicy;
