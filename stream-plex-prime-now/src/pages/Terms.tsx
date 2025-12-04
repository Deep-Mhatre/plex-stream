
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
        
        <div className="max-w-3xl space-y-8">
          <p className="text-muted-foreground">Last Updated: April 7, 2025</p>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the PLEXSTREAM service, website, and software applications 
              (collectively, the "PLEXSTREAM Service"), you agree to be bound by these Terms of Use. 
              If you do not agree to these Terms of Use, please do not use the PLEXSTREAM Service.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">2. Subscription</h2>
            <p>
              Your PLEXSTREAM subscription, which may start with a free trial, will continue until 
              terminated. To use the PLEXSTREAM service, you must have Internet access and a 
              PLEXSTREAM ready device, and provide a current, valid, accepted method of payment.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">3. Free Trials</h2>
            <p>
              Your PLEXSTREAM membership may start with a free trial. The duration of the free trial 
              period will be specified during sign-up. We will begin charging your payment method for 
              your monthly subscription fee at the end of the free trial period unless you cancel prior 
              to the end of the free trial period.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">4. Billing and Cancellation</h2>
            <p className="mb-4">
              The subscription fee for the PLEXSTREAM service and any other charges you may incur related 
              to your use of the service, such as taxes and possible transaction fees, will be charged to 
              your Payment Method on the specific payment date indicated on your "Account" page.
            </p>
            <p>
              You can cancel your PLEXSTREAM subscription at any time, and you will continue to have access 
              to the PLEXSTREAM service through the end of your billing period.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">5. PLEXSTREAM Service</h2>
            <p className="mb-4">
              The PLEXSTREAM service and any content accessed through the service are for your personal and 
              non-commercial use only and may not be shared with individuals beyond your household.
            </p>
            <p>
              We continually update the PLEXSTREAM service, including the content library. In addition, 
              we test various aspects of the service, including our website, user interfaces, promotional 
              features, and availability of content.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">6. Passwords & Account Access</h2>
            <p>
              The member who created the PLEXSTREAM account and whose Payment Method is charged is referred 
              to as the Account Owner. The Account Owner has access and control over the PLEXSTREAM account. 
              The Account Owner's control is exercised through use of the Account Owner's password and therefore 
              to maintain exclusive control, the Account Owner should not reveal the password to anyone.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">7. Disclaimers of Warranties and Limitations on Liability</h2>
            <p>
              THE PLEXSTREAM SERVICE AND ALL CONTENT AND SOFTWARE ASSOCIATED THEREWITH ARE PROVIDED "AS IS," 
              WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND. PLEXSTREAM DOES NOT GUARANTEE, REPRESENT, 
              OR WARRANT THAT YOUR USE OF THE PLEXSTREAM SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of the state 
              of California, U.S.A.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms of Use</h2>
            <p>
              PLEXSTREAM may, from time to time, change these Terms of Use. We will notify you at least 30 days 
              before such changes apply to you.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at legal@plexstream.example.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
