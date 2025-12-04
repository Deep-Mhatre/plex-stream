
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="max-w-3xl space-y-8">
          <p className="text-muted-foreground">Last Updated: April 7, 2025</p>
          
          <p>
            At PLEXSTREAM, we are committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect several types of information from and about users of our service, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Personal Information:</span> Information by which you 
                may be personally identified, such as name, email address, billing information, and 
                payment details.
              </li>
              <li>
                <span className="font-semibold">Usage Data:</span> Information about your connection to 
                our service, including your viewing history, search queries, device information, IP address, 
                and how you interact with our content.
              </li>
              <li>
                <span className="font-semibold">Preferences:</span> Your content preferences, account settings, 
                and other choices you make within the service.
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect about you for various purposes, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing and maintaining our service</li>
              <li>Processing your subscription and payments</li>
              <li>Personalizing content recommendations</li>
              <li>Improving our service based on user interactions</li>
              <li>Communicating with you about account-related matters</li>
              <li>Detecting, preventing, and addressing technical issues</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">3. Disclosure of Your Information</h2>
            <p className="mb-4">We may disclose your personal information in the following situations:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Service Providers:</span> To third-party vendors who provide 
                services on our behalf, such as payment processing, data analysis, and customer service.
              </li>
              <li>
                <span className="font-semibold">Business Transfers:</span> In connection with a merger, 
                acquisition, or sale of assets, your information may be transferred as a business asset.
              </li>
              <li>
                <span className="font-semibold">Legal Requirements:</span> To comply with any court order, 
                law, or legal process, including responding to government or regulatory requests.
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, 
              disclosure, or destruction of your personal information. However, no internet transmission or 
              electronic storage method is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
            <p className="mb-4">You have several choices regarding your personal information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access, update, or delete your account information through your account settings</li>
              <li>Opt-out of marketing communications while still receiving service announcements</li>
              <li>Adjust privacy settings to control visibility of your viewing activity</li>
              <li>Use features to clear viewing history</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">6. Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information 
              from children under 13. If you are a parent or guardian and believe your child has provided us 
              with personal information, please contact us.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">7. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p>
              If you have questions or concerns about our Privacy Policy, please contact us at 
              privacy@plexstream.example.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
