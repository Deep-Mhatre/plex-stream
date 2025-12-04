
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is PLEXSTREAM?",
      answer: "PLEXSTREAM is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
    },
    {
      question: "How much does PLEXSTREAM cost?",
      answer: "PLEXSTREAM offers several different plans to meet your needs. The Basic plan costs $8.99 per month, the Standard plan costs $13.99 per month, and the Premium plan costs $17.99 per month."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your PLEXSTREAM account to watch instantly on the web at plexstream.example from your personal computer or on any internet-connected device that offers the PLEXSTREAM app, including smart TVs, smartphones, tablets, streaming media players, and game consoles."
    },
    {
      question: "How do I cancel?",
      answer: "PLEXSTREAM is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on PLEXSTREAM?",
      answer: "PLEXSTREAM has an extensive library of feature films, documentaries, TV shows, anime, award-winning PLEXSTREAM originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is PLEXSTREAM good for kids?",
      answer: "The PLEXSTREAM Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."
    },
    {
      question: "Why am I seeing this title not available in my country?",
      answer: "Due to licensing agreements, certain titles may not be available in all regions. Our content offerings vary based on geographic location and we're constantly working to expand our library in all regions."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team through the 'Contact Us' page on our website, or by emailing support@plexstream.example. Our support team is available 24/7 to assist you with any questions or issues."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl space-y-6 mb-12">
          <p className="text-lg">
            Find answers to commonly asked questions about PLEXSTREAM, our services, billing, and more.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-card/30 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-4">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <a href="/contact" className="text-primary hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
