
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JobListingProps {
  title: string;
  department: string;
  location: string;
  type: string;
}

const JobListing: React.FC<JobListingProps> = ({ title, department, location, type }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{department}</span>
              <span className="text-sm bg-card/80 px-2 py-1 rounded">{location}</span>
              <span className="text-sm bg-card/80 px-2 py-1 rounded">{type}</span>
            </div>
          </div>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Jobs = () => {
  const openings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "New York",
      type: "Full-time"
    },
    {
      title: "Content Acquisition Manager",
      department: "Content",
      location: "Los Angeles",
      type: "Full-time"
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract"
    },
    {
      title: "Customer Support Representative",
      department: "Customer Success",
      location: "Remote",
      type: "Part-time"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
        
        <div className="max-w-4xl">
          <p className="mb-8">
            At PLEXSTREAM, we're building the future of entertainment. Join our diverse team of passionate 
            individuals who are shaping how the world experiences digital content.
          </p>
          
          <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
          
          <div className="space-y-4">
            {openings.map((job, index) => (
              <JobListing 
                key={index}
                title={job.title}
                department={job.department}
                location={job.location}
                type={job.type}
              />
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-card/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Don't see a position that fits your skills?</h3>
            <p className="mb-4">
              We're always looking for talented individuals to join our team. Send us your resume
              and tell us how you can contribute to PLEXSTREAM.
            </p>
            <Button variant="outline">Submit General Application</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
