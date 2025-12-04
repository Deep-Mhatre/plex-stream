
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tv, Smartphone, Laptop, Tablet, Gamepad, Cast } from 'lucide-react';

interface DeviceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-card/30 rounded-lg p-6 flex flex-col items-center text-center">
      <div className="mb-4 p-4 bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Devices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-12">
        <h1 className="text-4xl font-bold mb-6">Supported Devices</h1>
        
        <div className="max-w-4xl">
          <p className="mb-12 text-lg">
            Watch PLEXSTREAM on your favorite devices. Connect to PLEXSTREAM using your internet connection to watch on
            your TV, game console, computer, tablet, or phone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DeviceCard 
              icon={<Tv size={32} className="text-primary" />}
              title="Smart TVs"
              description="Samsung, LG, Sony, Vizio, and other smart TV platforms"
            />
            
            <DeviceCard 
              icon={<Laptop size={32} className="text-primary" />}
              title="Computers"
              description="Chrome OS, MacOS, Windows PC, and all major browsers"
            />
            
            <DeviceCard 
              icon={<Smartphone size={32} className="text-primary" />}
              title="Mobile Devices"
              description="Android phones & tablets, iPhone & iPad"
            />
            
            <DeviceCard 
              icon={<Gamepad size={32} className="text-primary" />}
              title="Game Consoles"
              description="PS5, PS4, Xbox Series X|S, Xbox One"
            />
            
            <DeviceCard 
              icon={<Cast size={32} className="text-primary" />}
              title="Streaming Devices"
              description="Apple TV, Amazon Fire TV, Roku, Chromecast, Android TV"
            />
            
            <DeviceCard 
              icon={<Tablet size={32} className="text-primary" />}
              title="Set-top Boxes"
              description="Cable set-top boxes and other streaming media players"
            />
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Supported Browsers</h3>
                <p className="text-muted-foreground">
                  Google Chrome, Firefox, Safari, Microsoft Edge (latest versions)
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Internet Speed</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>3.0 Mbps - Recommended for SD quality</li>
                  <li>5.0 Mbps - Recommended for HD quality</li>
                  <li>25 Mbps - Recommended for 4K/Ultra HD quality</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Mobile Requirements</h3>
                <p className="text-muted-foreground">
                  Android 5.0 or later, iOS 14 or later
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Devices;
