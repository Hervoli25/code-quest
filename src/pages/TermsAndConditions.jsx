// Code written and maintained by Elisee Kajingu
import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to Code Quest ("we," "our," or "us"). These Terms and Conditions govern your use of the Code Quest platform, 
            including all related content, services, and functionality offered through our website or mobile applications 
            (collectively, the "Service").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
            please do not access or use the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Account Registration</h2>
          <p>
            To access certain features of the Service, you may be required to register for an account. You agree to provide 
            accurate, current, and complete information during the registration process and to update such information to 
            keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. You agree 
            to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. User Content</h2>
          <p>
            The Service allows you to create, upload, and share content, including code, comments, and other materials 
            ("User Content"). You retain all rights to your User Content, but you grant us a worldwide, non-exclusive, 
            royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content 
            in connection with the Service.
          </p>
          <p>
            You are solely responsible for your User Content and the consequences of posting or publishing it. By posting 
            User Content, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You own or have the necessary rights to use and authorize us to use your User Content;</li>
            <li>Your User Content does not violate the rights of any third party, including copyright, trademark, privacy, or other personal or proprietary rights;</li>
            <li>Your User Content does not contain malicious code, viruses, or other harmful components;</li>
            <li>Your User Content complies with these Terms and all applicable laws and regulations.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Prohibited Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service for any illegal purpose or in violation of any laws;</li>
            <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable;</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service;</li>
            <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or other systems or networks connected to the Service;</li>
            <li>Use any robot, spider, or other automated device to access the Service;</li>
            <li>Collect or harvest any information about other users, including email addresses, without their consent;</li>
            <li>Create multiple accounts for abusive purposes.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Code Quest and are protected by 
            international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            The Code Quest name, logo, and all related names, logos, product and service names, designs, and slogans are 
            trademarks of Code Quest or its affiliates. You may not use such marks without our prior written permission.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Educational Use</h2>
          <p>
            Code Quest is designed for educational purposes. The coding challenges, tutorials, and other educational content 
            provided through the Service are intended to help users learn programming concepts and improve their coding skills.
          </p>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties about the 
            completeness, accuracy, reliability, suitability, or availability of the educational content provided through the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Third-Party Services</h2>
          <p>
            The Service may contain links to third-party websites or services that are not owned or controlled by Code Quest. 
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
            third-party websites or services.
          </p>
          <p>
            You acknowledge and agree that Code Quest shall not be responsible or liable, directly or indirectly, for any 
            damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
            goods, or services available on or through any such websites or services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, 
            for any reason, including, without limitation, if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, 
            you may simply discontinue using the Service or contact us to request account deletion.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Limitation of Liability</h2>
          <p>
            In no event shall Code Quest, its directors, employees, partners, agents, suppliers, or affiliates be liable for 
            any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
            data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at 
            least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined 
            at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the 
            revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard 
            to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of 
            these Terms will remain in effect.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-medium">
            Email: support@codequest.com<br />
            Address: 123 Learning Street, Education City, 12345
          </p>
        </div>
      </div>
    </div>
  );
}
