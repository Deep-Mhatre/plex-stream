
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, CreditCard, PlayCircle, Settings, HelpCircle, VideoIcon, UserRound } from 'lucide-react';

interface HelpCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  articles: string[];
}

const HelpCategory: React.FC<HelpCategoryProps> = ({ icon, title, description, articles }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {articles.map((article, index) => (
            <li key={index}>
              <a href="#" className="text-primary hover:underline flex items-center">
                <span className="mr-2">•</span>
                {article}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Search for help topics..."
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <HelpCategory 
              icon={<UserRound size={24} className="text-primary" />}
              title="Account & Settings"
              description="Manage your account details and preferences"
              articles={[
                "How to reset your password",
                "Update payment information",
                "Change your email address",
                "Manage profiles"
              ]}
            />
            
            <HelpCategory 
              icon={<CreditCard size={24} className="text-primary" />}
              title="Billing & Payments"
              description="Information about subscriptions and payments"
              articles={[
                "Subscription plans and pricing",
                "Billing date and payment receipts",
                "Payment methods",
                "Cancel or change your plan"
              ]}
            />
            
            <HelpCategory 
              icon={<PlayCircle size={24} className="text-primary" />}
              title="Watching PLEXSTREAM"
              description="Everything about enjoying your content"
              articles={[
                "Streaming quality issues",
                "Download shows and movies",
                "Find something to watch",
                "PLEXSTREAM on different devices"
              ]}
            />
            
            <HelpCategory 
              icon={<Settings size={24} className="text-primary" />}
              title="Technical Issues"
              description="Troubleshooting common problems"
              articles={[
                "Fix streaming errors",
                "Connection problems",
                "App not working properly",
                "Audio or subtitle issues"
              ]}
            />
            
            <HelpCategory 
              icon={<VideoIcon size={24} className="text-primary" />}
              title="Content Questions"
              description="Information about movies and shows"
              articles={[
                "When new seasons are released",
                "Request new content",
                "Content availability in your region",
                "Original series and movies"
              ]}
            />
            
            <HelpCategory 
              icon={<HelpCircle size={24} className="text-primary" />}
              title="Getting Started"
              description="New to PLEXSTREAM? Start here"
              articles={[
                "Creating your account",
                "Getting started guide",
                "Streaming on your device",
                "Understanding your first bill"
              ]}
            />
          </div>
          
          <div className="mt-12 p-6 bg-card/30 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Can't find what you're looking for?</h3>
            <p className="mb-4">
              Our support team is ready to help you with any questions or issues.
            </p>
            <a href="/contact" className="inline-block">
              <Button>Contact Support</Button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
