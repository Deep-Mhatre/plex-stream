import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, CreditCard, Lock, CheckCircle2, Scan, Share2, QrCode } from 'lucide-react';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PlanOption {
  id: string;
  name: string;
  price: number;
  quality: string;
  resolution: string;
  devices: number;
}

const PaymentMethod = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
};

const SubscriptionPayment = () => {
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPlan = queryParams.get('plan') || 'standard';

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted.substring(0, 19)); // Limit to 16 digits (plus 3 spaces)
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setExpiry(value);
    } else if (value.length <= 4) {
      setExpiry(`${value.substring(0, 2)}/${value.substring(2)}`);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value.substring(0, 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success(`Successfully subscribed to ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
      navigate('/');
    }, 2000);
  };

  const handleUpiPayment = () => {
    setQrDialogOpen(true);
  };

  const handlePaymentComplete = (method: string) => {
    toast.success(`Payment initiated via ${method}. Once confirmed, your ${plans.find(p => p.id === selectedPlan)?.name} plan will be activated!`);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan) || plans[1];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Complete Your Subscription</h1>
          <p className="text-muted-foreground text-center">
            You're just one step away from unlimited entertainment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </h2>
              </CardHeader>
              
              <Tabs defaultValue="card" className="w-full">
                <div className="px-6">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="card">
                  <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className="pl-12"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                               alt="Mastercard" 
                               className="h-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          type="text"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Input
                            id="cvv"
                            type="text"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            required
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="savePayment"
                        checked={savePaymentMethod}
                        onChange={() => setSavePaymentMethod(!savePaymentMethod)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="savePayment" className="text-sm text-muted-foreground">
                        Save this payment method for future transactions
                      </Label>
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit" className="w-full py-6 text-lg" disabled={processing}>
                        {processing ? 'Processing...' : `Subscribe for ₹${selectedPlanDetails.price}/month`}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="paypal" className="px-6 pb-6">
                  <div className="text-center py-6 space-y-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" 
                      alt="PayPal" 
                      className="h-16 mx-auto" 
                    />
                    <p className="text-muted-foreground">
                      You'll be redirected to PayPal to complete your purchase securely.
                    </p>
                    <Button className="w-full py-6" onClick={() => {
                      toast.info("Redirecting to PayPal...");
                      setTimeout(() => {
                        handlePaymentComplete('PayPal');
                      }, 2000);
                    }}>
                      Pay with PayPal
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upi" className="px-6 pb-6">
                  <div className="text-center py-6 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <img 
                          src="/lovable-uploads/11ec5fff-4875-4c94-b2e6-275c4ec0c786.png" 
                          alt="UPI QR Code" 
                          className="h-48 rounded-md border" 
                        />
                      </div>
                      <p className="text-center font-medium">Scan to pay with any UPI app</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">Abhyudaya Cooperative Bank Ltd 9387</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm">UPI ID: mhatredeep17@oksbi</p>
                          <Button variant="outline" size="sm" className="h-7">
                            <QrCode className="h-3.5 w-3.5 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <QrCode className="mr-2 h-4 w-4" />
                            View QR Code
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Scan QR Code to Pay</DialogTitle>
                            <DialogDescription>
                              Use any UPI app to scan this QR code
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center justify-center py-4">
                            <img 
                              src="/lovable-uploads/11ec5fff-4875-4c94-b2e6-275c4ec0c786.png" 
                              alt="UPI QR Code" 
                              className="max-w-full h-auto rounded-md" 
                            />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <p className="font-medium">Abhyudaya Cooperative Bank Ltd</p>
                            <p className="text-sm">UPI ID: mhatredeep17@oksbi</p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button className="w-full" onClick={() => handlePaymentComplete('UPI')}>
                        I've Made the Payment
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      After making the payment, click "I've Made the Payment" to complete your subscription
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <CardFooter className="border-t bg-muted/50 flex-col items-start p-6">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and securely processed. We do not store your full card details.
                </p>
              </CardFooter>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{selectedPlanDetails.name} Plan</span>
                    <span className="font-medium">₹{selectedPlanDetails.price}/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Plan includes:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{selectedPlanDetails.quality} video quality</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{selectedPlanDetails.resolution} resolution</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Watch on {selectedPlanDetails.devices} device{selectedPlanDetails.devices > 1 ? 's' : ''}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>₹{selectedPlanDetails.price}/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed monthly. Your subscription will automatically renew each month until canceled.
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPayment;
