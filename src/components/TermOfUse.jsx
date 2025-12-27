import { Footer2 } from "./Home/Footer";
import Navbar from "./Home/Navbar";
import acceptance from "../assets/icons/agreement.png";
import termination from "../assets/icons/restriction.png";
import discontinue from "../assets/icons/stop.png";
import disclaimer from "../assets/icons/disclaimer.png";
import limitation from "../assets/icons/limitation.png";
import indemnity from "../assets/icons/protection.png";
import dispute from "../assets/icons/argue.png";
import copyright from "../assets/icons/copyright.png";
import terms from "../assets/icons/terms.png";
import contact from "../assets/icons/customer.png";

const TermOfUse = () => {
  return (
    <div className="bg-[#0d0d0d]">
      <Navbar />
      <div className="px-4 pt-40 md:pt-52">
        <h1 className=" text-center text-6xl md:text-8xl xl:text-[8rem] font-bold text-gray-200">
          Terms Of Use
        </h1>

        <div className="container border-t mx-auto mt-28 md:mt-36 px-4 py-8 max-w-4xl">
          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={acceptance} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Acceptance of Terms
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Acceptance of Terms
          </h2> */}

          <p className="mb-4 text-gray-200">
            These Terms of Use (“Terms”) govern your access to and use of
            BharatAI's services, including any features, tools, or functionality
            (collectively, “Services”) provided by Bharattech Techecosystem Pvt
            Ltd (“Bharattech,” “we,” “us,” or “our”). By accessing or using the
            Services, you agree to be bound by these Terms, including any
            updates and modifications. If you do not agree to these Terms, you
            must stop using the Services immediately.
          </p>
          <p className="mb-4 text-gray-200">
            You acknowledge that BharatAI reserves the right to modify these
            Terms at any time, and such changes will be communicated to you.
            Continued use of the Services after changes to the Terms have been
            posted constitutes acceptance of the revised Terms.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={termination} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Termination and Suspension
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Termination and Suspension
          </h2> */}
          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li className="text-gray-200">
              <strong className="text-gray-200">
                Your Rights to Terminate
              </strong>
              <p className="text-gray-200 ml-5">
                You have the right to stop using the Services at any time,
                without providing any notice to BharatAI. You are not required
                to cancel your account to stop using the Services, though we
                encourage you to formally close your account for clarity. You
                may cancel any subscriptions or paid features through your
                account settings, or by contacting our support team.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Bharattech's Rights to Terminate or Suspend
              </strong>
              <p className="text-gray-200 ml-5 pb-1">
                BharatAI reserves the right to suspend, restrict, or terminate
                your access to the Services or your account if we believe you
                have violated these Terms or if there are security concerns.
                Reasons for termination or suspension include, but are not
                limited to:
              </p>
              <p className="text-gray-200 ml-5">
                <p className="underline">Violation of Terms:</p> If you breach
                any provision of these Terms, including misuse of the Services,
                prohibited content, or fraudulent activity. Legal or Regulatory
                Requirement: If required by law, regulatory bodies, or a court
                order, BharatAI may suspend or terminate access to comply with
                legal obligations.
                <br />
                <p className="underline">
                  Risk to Service Integrity or Security:
                </p>{" "}
                If your activities pose a threat to the security or integrity of
                the Services, other users, or BharatAI’s systems. Extended
                Inactivity: If you have not logged into your account for a
                period exceeding 12 months (for free accounts) or a defined
                period in the case of paid accounts.
                <br /> In such cases, BharatAI may notify you about the
                suspension or termination. You may also be subject to permanent
                removal of your content or data from our systems.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Appeal and Resolution of Suspended Accounts
              </strong>
              <p className="text-gray-200 ml-5">
                If your account is suspended or terminated, and you believe it
                was in error or want to challenge the decision, you can submit a
                request to our support team. We will review the case and provide
                you with a response. However, BharatAI has the final discretion
                in determining whether your account should be reinstated.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={discontinue} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Discontinuation of Services
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Disclaimer of Warranties
          </h2> */}

          <p className="mb-4">
            <strong>Temporary Discontinuation:</strong> BharatAI may temporarily
            disable or restrict access to certain features or the Services due
            to maintenance, upgrades, or unforeseen technical issues. We will
            strive to provide notice in advance, except in emergencies where
            immediate action is required to ensure the security or functionality
            of the Services.
          </p>
          <p className="mb-4">
            <strong>Permanent Discontinuation:</strong> In some cases, BharatAI
            may decide to discontinue offering the Services or any part of it.
            In such cases, we will provide reasonable notice to you via email or
            through your account before shutting down or phasing out a service.
            If you have a paid subscription, we will refund you for any prepaid,
            unused service periods.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={disclaimer} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Disclaimer of Warranties
            </h2>
          </div>

          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Disclaimer of Warranties
          </h2> */}

          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">
                No Warranty for Service Availability
              </strong>
              <p className="text-gray-200 ml-5">
                The Services are provided “as is” and “as available” without any
                warranty of any kind, either express or implied. BharatAI does
                not guarantee the accuracy, reliability, completeness, or
                availability of the Services.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Limitation of Liability</strong>
              <p className="text-gray-200 ml-5">
                BharatAI is not responsible for any loss or damage that may
                occur from your use of the Services, including, but not limited
                to, loss of data, interruptions, or inability to access the
                Services. You are solely responsible for any decisions made
                based on the output provided by BharatAI, and we disclaim
                responsibility for any consequences of such decisions.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                No Liability for User-Generated Content
              </strong>
              <p className="text-gray-200 ml-5">
                BharatAI does not control the content posted by users. You are
                responsible for the content you post, share, or transmit through
                the Services. BharatAI disclaims any liability for any
                offensive, harmful, or illegal content posted by users.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={limitation} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Limitation of Liability
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Limitation of Liability
          </h2> */}
          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">Types of Damages</strong>
              <p className="text-gray-200 ml-5">
                To the fullest extent permitted by law, BharatAI shall not be
                liable for any indirect, incidental, special, consequential, or
                exemplary damages, including loss of profits, goodwill, data, or
                use, even if we have been advised of the possibility of such
                damages.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Monetary Limit on Liability
              </strong>
              <p className="text-gray-200 ml-5">
                In no event shall BharatAI’s total liability to you for any
                claim or damages arising from the use of the Services exceed the
                amount you have paid for the specific Service(s) in question
                during the 12 months prior to the claim, or $100, whichever is
                greater.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Local Law Considerations
              </strong>
              <p className="text-gray-200 ml-5">
                Some jurisdictions may not allow the exclusion or limitation of
                certain damages, so these limitations may not apply to you.
                Please check your local laws for more details.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={indemnity} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">Indemnity</h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Indemnity
          </h2> */}

          <p className="mb-4 text-gray-200">
            You agree to indemnify and hold harmless BharatAI, its affiliates,
            officers, directors, employees, agents, suppliers, and licensors
            from any and all claims, damages, liabilities, losses, and expenses
            (including legal fees) arising from:
          </p>
          <p>
            <p className="underline">Your use of the Services.</p>
            <br /> Any violation of these Terms or other agreements related to
            the Services. Any content you post or submit through the Services,
            including third-party claims of infringement or harm.
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={dispute} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Dispute Resolution
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Dispute Resolution
          </h2> */}
          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">Mandatory Arbitration</strong>
              <p className="text-gray-200 ml-5">
                Any dispute or claim arising out of or relating to these Terms
                or your use of the Services shall be resolved through binding
                arbitration. Arbitration shall be conducted on an individual
                basis, and the arbitrator’s decision will be final and binding.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Informal Resolution First
              </strong>
              <p className="text-gray-200 ml-5">
                Before proceeding to arbitration, you agree to make reasonable
                efforts to resolve the dispute informally. You may contact
                BharatAI customer support, and we will attempt to resolve the
                issue through discussions.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Arbitration Procedures</strong>
              <p className="text-gray-200 ml-5">
                If the dispute is not resolved informally, it will be settled
                through binding arbitration administered by the National
                Arbitration and Mediation (NAM) under the rules of NAM. The
                arbitration will take place in [Insert City], India, and the
                decision will be governed by the laws of India.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Class Action Waiver</strong>
              <p className="text-gray-200 ml-5">
                You agree that any arbitration proceedings will be conducted on
                an individual basis only. You waive the right to participate in
                any class action, consolidated, or representative action.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={copyright} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Copyright Complaints
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Copyright Complaints
          </h2> */}
          <p className="mb-4 text-gray-200">
            If you believe that your copyright has been infringed upon by
            content available through the Services, you may submit a copyright
            infringement notification to BharatAI. Your notification must
            contain the following:
          </p>
          <p className="mb-4 text-gray-200">
            A statement of your good faith belief that the disputed use is
            unauthorized.
          </p>
          <p className="mb-4 text-gray-200">
            Identification of the copyrighted work or material that has been
            infringed.
          </p>
          <p className="mb-4 text-gray-200">
            Your contact details, including an email address.
          </p>
          <p className="mb-4 text-gray-200">
            A statement affirming the accuracy of your claim and your authority
            to act on behalf of the copyright holder.
          </p>
          <p className="mb-4 text-gray-200">
            Once your complaint is received, BharatAI will investigate and take
            appropriate action in accordance with the Digital Millennium
            Copyright Act (DMCA).
          </p>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={terms} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">General Terms</h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            General Terms
          </h2> */}
          <ul className="list-disc list-inside mb-4 text-gray-200">
            <li>
              <strong className="text-gray-200">Assignment</strong>
              <p className="text-gray-200 ml-5">
                You may not assign or transfer your rights and obligations under
                these Terms to any other party without our prior written
                consent. BharatAI may assign or transfer its rights and
                obligations at its discretion, without notice to you.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Changes to Terms or Services
              </strong>
              <p className="text-gray-200 ml-5">
                BharatAI reserves the right to modify these Terms or any part of
                the Services at any time. If we make material changes to these
                Terms, we will notify you by email or through a notice on our
                platform. If you do not agree with the updated Terms, you must
                stop using the Services.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Delay in Enforcement of Terms
              </strong>
              <p className="text-gray-200 ml-5">
                Any delay or failure on BharatAI’s part to enforce any provision
                of these Terms does not waive our right to enforce it in the
                future.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Compliance with Laws</strong>
              <p className="text-gray-200 ml-5">
                You agree to comply with all applicable laws, including those
                related to export control, privacy, and data protection, in
                using the Services. You will not use the Services for unlawful
                purposes, including, but not limited to, conducting illegal
                activities, infringing on intellectual property rights, or
                distributing harmful software.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">Entire Agreement</strong>
              <p className="text-gray-200 ml-5">
                These Terms, along with any policies or guidelines incorporated
                herein by reference, constitute the entire agreement between you
                and BharatAI regarding the Services. Any prior agreements,
                whether written or oral, are superseded by this agreement.
              </p>
            </li>
            <li>
              <strong className="text-gray-200">
                Governing Law and Jurisdiction
              </strong>
              <p className="text-gray-200 ml-5">
                These Terms will be governed by and construed in accordance with
                the laws of India. Any disputes arising out of or in connection
                with these Terms will be subject to the exclusive jurisdiction
                of the courts in [Insert City], India.
              </p>
            </li>
          </ul>

          <div className="flex mt-12 mb-8 bg-[#111111] bg-opacity-60 rounded-xl p-5 items-center border border-gray-500  border-opacity-40">
            <div className="w-20 mr-4">
              <img className="object-cover" src={contact} alt="data" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200">
              Contact Information
            </h2>
          </div>
          {/* <h2 className="text-3xl mt-10 font-bold mb-2 text-gray-200">
            Contact Information
          </h2> */}
          <p className="mb-4 text-gray-200">
            If you have any questions or concerns regarding these Terms of Use,
            please contact us a
            <strong className="text-gray-200">
              <br /> BharatAI Email: Contact@bharatai.bsearch.in,
              Support@bharatai.bsearch.in, Info@bharatai.bsearch.in <br />{" "}
              Phone: +91-05124050467 <br />
              Address: Lucknow, Uttar Pradesh, India
            </strong>
          </p>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};
export default TermOfUse;
