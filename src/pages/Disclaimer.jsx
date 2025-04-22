// Code written and maintained by Elisee Kajingu
import React from 'react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Educational Purpose</h2>
          <p>
            Code Quest is an educational platform designed to help users learn programming concepts and improve their coding skills. 
            The content, challenges, and resources provided on this platform are for educational and informational purposes only.
          </p>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, 
            express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, 
            products, services, or related graphics contained on the platform for any purpose.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. No Professional Advice</h2>
          <p>
            The information provided on Code Quest is not intended to be a substitute for professional advice. Before you act on 
            any information provided on our platform, you should consider seeking advice from a qualified professional relevant 
            to your particular circumstances.
          </p>
          <p>
            Code Quest does not provide professional software development, engineering, or technical consulting services. The 
            platform is designed for learning and practice, not for developing production-ready software or solutions.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Code Execution and Security</h2>
          <p>
            Code Quest allows users to write and execute code within the platform. While we implement security measures to protect 
            our systems, we cannot guarantee that all user-submitted code is free from errors, bugs, or security vulnerabilities.
          </p>
          <p>
            Users are responsible for the code they write and execute on the platform. Code Quest is not responsible for any damage, 
            data loss, or security breaches that may result from executing code on our platform or implementing code learned through 
            our platform in other environments.
          </p>
          <p>
            We strongly recommend following security best practices and thoroughly testing any code before using it in production 
            environments or critical applications.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. User-Generated Content</h2>
          <p>
            Code Quest may allow users to submit content, including code, comments, and other materials. We do not claim ownership 
            of user-generated content, but we cannot guarantee the accuracy, integrity, quality, or appropriateness of such content.
          </p>
          <p>
            We are not responsible for any user-generated content that may be offensive, inappropriate, inaccurate, misleading, or 
            otherwise objectionable. Users are solely responsible for the content they submit to the platform.
          </p>
          <p>
            Code Quest reserves the right to remove any user-generated content that violates our Terms and Conditions or that we 
            determine, in our sole discretion, is harmful, offensive, or otherwise inappropriate.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Third-Party Links and Resources</h2>
          <p>
            Code Quest may contain links to third-party websites, resources, or services that are not owned or controlled by us. 
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party 
            websites or services.
          </p>
          <p>
            We do not endorse or make any representations about third-party websites or services. If you access a third-party website 
            or service from Code Quest, you do so at your own risk and subject to the terms and conditions of use for such website 
            or service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Code Quest and its affiliates, officers, employees, agents, partners, 
            and licensors will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service;</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content;</li>
            <li>The execution of code on our platform;</li>
            <li>Reliance on information or content provided through the Service;</li>
            <li>Any other matter relating to the Service.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Accuracy and Completeness</h2>
          <p>
            While we strive to provide accurate and comprehensive educational content, we do not warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The information on our platform is complete, true, accurate, or non-misleading;</li>
            <li>The platform will be available at all times, or at any time, uninterrupted, error-free, or secure;</li>
            <li>Any defects or errors will be corrected;</li>
            <li>The platform is free of viruses or other harmful components;</li>
            <li>The results of using the platform will meet your requirements.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to the Platform</h2>
          <p>
            Code Quest reserves the right to modify, suspend, or discontinue, temporarily or permanently, the platform or any 
            service to which it connects, with or without notice and without liability to you.
          </p>
          <p>
            We may update the content on this platform from time to time, but its content is not necessarily complete or up-to-date. 
            Any of the material on the platform may be out of date at any given time, and we are under no obligation to update such material.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Code Quest, its affiliates, licensors, and service providers, and its 
            and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns 
            from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable 
            attorneys' fees) arising out of or relating to your violation of these Terms or your use of the platform.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law</h2>
          <p>
            This Disclaimer shall be governed by and construed in accordance with the laws of [Your Country/State], without regard 
            to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of this Disclaimer will not be considered a waiver of those rights. If any 
            provision of this Disclaimer is held to be invalid or unenforceable by a court, the remaining provisions of this Disclaimer 
            will remain in effect.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">11. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify or replace this Disclaimer at any time. If a revision is material, we will provide at 
            least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at 
            our sole discretion.
          </p>
          <p>
            By continuing to access or use our platform after any revisions become effective, you agree to be bound by the revised 
            Disclaimer. If you do not agree to the new terms, you are no longer authorized to use the platform.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at:
          </p>
          <p className="font-medium">
            Email: legal@codequest.com<br />
            Address: 123 Learning Street, Education City, 12345
          </p>
        </div>
      </div>
    </div>
  );
}
