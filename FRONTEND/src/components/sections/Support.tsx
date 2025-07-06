import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Building, Users, Star, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const fallbackBankDetails = {
  accountName: 'Karnataka Regional Catholic Bishops Council',
  accountNumber: '1234567890123456',
  ifscCode: 'SBIN0001234',
  bankName: 'State Bank of India',
  branch: 'Bangalore Main Branch',
  upiId: 'krcbc@sbi'
};

const Support = () => {
  const { toast } = useToast();

  // Fetch bank details from Strapi
  const [bankDetails, setBankDetails] = useState(fallbackBankDetails);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bank-account`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data?.data) {
          setBankDetails({
            accountName: data.data.accountName || fallbackBankDetails.accountName,
            accountNumber: data.data.accountNumber || fallbackBankDetails.accountNumber,
            ifscCode: data.data.ifscCode || fallbackBankDetails.ifscCode,
            bankName: data.data.bankName || fallbackBankDetails.bankName,
            branch: data.data.branch || fallbackBankDetails.branch,
            upiId: data.data.upiId || fallbackBankDetails.upiId
          });
        } else {
          setBankDetails(fallbackBankDetails);
        }
      } catch (error) {
        setBankDetails(fallbackBankDetails);
      }
    };
    fetchBankDetails();
  }, []);

  const causes = [
    {
      id: 'general',
      title: 'General Fund',
      description: 'Support all our ministries and programs',
      icon: Heart
    },
    {
      id: 'education',
      title: 'Education Initiative',
      description: 'Scholarships and school infrastructure',
      icon: Users
    },
    {
      id: 'healthcare',
      title: 'Healthcare Services',
      description: 'Medical camps and health programs',
      icon: Building
    },
    {
      id: 'youth',
      title: 'Youth Ministry',
      description: 'Programs for young Catholics',
      icon: Star
    }
  ];

  const handleCopy = async (text: string, label: string) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Copied!",
          description: `${label} copied to clipboard`,
        });
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard. Please copy manually.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Copy not supported",
        description: "Clipboard API not available. Please copy manually.",
        variant: "destructive",
      });
    }
  };


  return (
    <section id="support" className="py-16 relative bg-gradient-to-br to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Support Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your generous support enables us to continue serving the communities of Karnataka 
            through faith, hope, and charitable works. Every contribution makes a difference.
          </p>
        </div>

        <div className="col-span-3 flex justify-center">
          <div className="w-full lg:max-w-2xl">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Bank Transfer Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Cause Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Causes to Support</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {causes.map((cause) => {
                        const IconComponent = cause.icon;
                        return (
                          <div
                            key={cause.id}
                            className="p-3 border-2 rounded-lg border-gray-200 hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className="font-medium">{cause.title}</div>
                                <div className="text-sm text-gray-600">{cause.description}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bank Account Details */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Bank Account Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Account Name</div>
                          <div className="font-medium">{bankDetails.accountName}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(bankDetails.accountName, 'Account name')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Account Number</div>
                          <div className="font-medium font-mono">{bankDetails.accountNumber}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(bankDetails.accountNumber, 'Account number')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">IFSC Code</div>
                          <div className="font-medium font-mono">{bankDetails.ifscCode}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(bankDetails.ifscCode, 'IFSC code')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Bank & Branch</div>
                          <div className="font-medium">{bankDetails.bankName}, {bankDetails.branch}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(`${bankDetails.bankName}, ${bankDetails.branch}`, 'Bank details')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* UPI Details */}
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold mb-4 text-green-800">UPI Payment</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">UPI ID</div>
                        <div className="font-medium font-mono">{bankDetails.upiId}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(bankDetails.upiId, 'UPI ID')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-amber-800 mb-1">Important Notice</div>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Please mention the cause you're supporting in the transaction reference</li>
                          <li>• 80G tax exemption certificates will be issued for donations above ₹500</li>
                          <li>• For receipt, please email transaction details to donations@krcbc.org</li>
                          <li>• Contact us at +91-80-2234-5678 for any donation queries</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
