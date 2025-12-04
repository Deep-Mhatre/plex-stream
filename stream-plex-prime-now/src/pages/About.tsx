
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">About PLEXSTREAM</h1>
        
        <div className="max-w-3xl space-y-6">
          <p>
            PLEXSTREAM is a premium streaming service offering a vast library of movies,
            TV shows, and original content for our subscribers around the world.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">Our Story</h2>
          <p>
            Founded in 2023, PLEXSTREAM was born from a passion for great storytelling and the desire
            to make quality entertainment accessible to everyone. What began as a small streaming startup
            has quickly grown into a global entertainment platform.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
          <p>
            At PLEXSTREAM, our mission is to entertain the world. We believe that great stories can inspire,
            entertain and bring people together. That's why we're committed to offering a diverse range of
            content that caters to different tastes, cultures, and interests.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-card/30 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Extensive Library</h3>
              <p>Access thousands of movies and TV shows, from classics to the latest releases.</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Original Content</h3>
              <p>Enjoy PLEXSTREAM exclusive shows and movies you can't find anywhere else.</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Multiple Devices</h3>
              <p>Watch on your TV, computer, tablet, or smartphone—anytime, anywhere.</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg">
              <h3 className="font-bold mb-2">No Commitments</h3>
              <p>Cancel your subscription anytime with no cancellation fees.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
