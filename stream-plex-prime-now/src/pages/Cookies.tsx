
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Cookies = () => {
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [analyticalCookies, setAnalyticalCookies] = useState(true);
  const [advertisingCookies, setAdvertisingCookies] = useState(false);

  const handleSavePreferences = () => {
    // In a real app, this would save to local storage or a backend
    toast.success('Cookie preferences saved successfully');
  };

  const handleAcceptAll = () => {
    setEssentialCookies(true);
    setFunctionalCookies(true);
    setAnalyticalCookies(true);
    setAdvertisingCookies(true);
    toast.success('All cookies accepted');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Cookie Preferences</h1>
        
        <div className="max-w-3xl space-y-8">
          <p>
            We use cookies and similar technologies to help personalize content, enhance your experience, 
            provide social media features, and analyze our traffic. Below you can choose which kinds of 
            cookies you allow on this website. Click on the different cookie categories to learn more and 
            change your default settings.
          </p>
          
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">Always active</p>
                </div>
                <Switch checked={essentialCookies} disabled />
              </div>
              <p className="text-sm">
                These cookies are necessary for the website to function and cannot be switched off. 
                They are usually only set in response to actions you take such as logging in or filling 
                in forms. You can set your browser to block these cookies, but some parts of the site 
                will not work.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Functional Cookies</h3>
                </div>
                <Switch 
                  checked={functionalCookies} 
                  onCheckedChange={setFunctionalCookies} 
                />
              </div>
              <p className="text-sm">
                These cookies enable enhanced functionality and personalization, such as remembering 
                your preferences, recognizing you when you return to our website, and providing enhanced 
                features like video playback.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Analytical Cookies</h3>
                </div>
                <Switch 
                  checked={analyticalCookies} 
                  onCheckedChange={setAnalyticalCookies} 
                />
              </div>
              <p className="text-sm">
                These cookies allow us to count visits and traffic sources so we can measure and improve 
                the performance of our site. They help us identify which pages are the most and least 
                popular and see how visitors move around the site.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Advertising Cookies</h3>
                </div>
                <Switch 
                  checked={advertisingCookies} 
                  onCheckedChange={setAdvertisingCookies} 
                />
              </div>
              <p className="text-sm">
                These cookies may be set through our site by our advertising partners. They build a profile 
                of your interests and show you relevant advertisements on other sites. They don't directly 
                store personal information but uniquely identify your browser and device.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={handleAcceptAll}>
              Accept All
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
          
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">More Information</h2>
            <p className="mb-4">
              For more information about how we use cookies and your personal data, please refer to our 
              <a href="/privacy" className="text-primary hover:underline"> Privacy Policy</a>.
            </p>
            <p>
              If you have any questions or concerns about our use of cookies, please contact us at 
              privacy@plexstream.example.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookies;
