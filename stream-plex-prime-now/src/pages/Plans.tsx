
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Info } from 'lucide-react';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  quality: string;
  resolution: string;
  devices: number;
}

const Plans = () => {
  const plans: PlanOption[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 49,
      quality: 'Good',
      resolution: '720p',
      devices: 1
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 129,
      quality: 'Better',
      resolution: '1080p',
      devices: 2
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 299,
      quality: 'Best',
      resolution: '4K+HDR',
      devices: 4
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState('standard');
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log(`Selected plan: ${selectedPlan}`);
    // Show a toast to inform the user
    toast.info(`You've selected the ${plans.find(p => p.id === selectedPlan)?.name} plan`);
    // Navigate to subscription payment page with selected plan
    navigate(`/subscription?plan=${selectedPlan}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex justify-center">
          <Logo />
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Enjoy full access to PLEXSTREAM on all your devices. You can change or cancel your plan anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`overflow-hidden transition-all ${
                selectedPlan === plan.id 
                  ? 'border-primary border-2 shadow-lg shadow-primary/20' 
                  : 'hover:border-primary/50'
              }`}
            >
              <div className={`h-2 ${selectedPlan === plan.id ? 'bg-primary' : 'bg-secondary'}`} />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{plan.quality} video quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{plan.resolution} resolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Watch on {plan.devices} device{plan.devices > 1 ? 's' : ''}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Cancel anytime</span>
                  </li>
                </ul>
                
                <Button
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" onClick={handleContinue}>
            Continue with {plans.find(p => p.id === selectedPlan)?.name}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            By continuing, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
