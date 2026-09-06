import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Phone, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModeToggle } from '@/components/home/ModeToggle';
import { useAuth } from '@/context/AuthContext';
import { useMode } from '@/context/ModeContext';

const schema = z.object({
  name: z.string().min(2), email: z.string().email(), phone: z.string().regex(/^[6-9]\d{9}$/),
  password: z.string().min(6), confirmPassword: z.string(),
  address: z.string().min(10), city: z.string().min(2), state: z.string().min(2), pincode: z.string().regex(/^\d{6}$/)
}).refine(d => d.password === d.confirmPassword, { path: ["confirmPassword"] });
type Form = z.infer<typeof schema>;

export const Register: React.FC = () => {
  const navigate = useNavigate(); const { register: registerUser } = useAuth(); const { mode } = useMode();
  const [step, setStep] = useState(1); const [showPwd, setShowPwd] = useState(false);
  const form = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await registerUser({ ...data, mode, location: { latitude: 0, longitude: 0, address: data.address, city: data.city, state: data.state, pincode: data.pincode }});
      navigate('/home');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-gray-50">
      <GlassCard className="p-8 w-full max-w-md bg-white border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Join NEXAWAVE</h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <Input {...form.register('name')} placeholder="Full Name" />
              <Input {...form.register('phone')} placeholder="Phone Number" />
              <Input {...form.register('email')} placeholder="Email Address" />
              <Button type="button" onClick={() => setStep(2)} className="w-full">Next</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Input {...form.register('password')} type={showPwd ? 'text' : 'password'} placeholder="Password" />
              <Input {...form.register('confirmPassword')} type={showPwd ? 'text' : 'password'} placeholder="Confirm Password" />
              <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button><Button type="button" onClick={() => setStep(3)} className="flex-1">Next</Button></div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <Input {...form.register('address')} placeholder="Address" />
              <div className="grid grid-cols-2 gap-2"><Input {...form.register('city')} placeholder="City" /><Input {...form.register('state')} placeholder="State" /></div>
              <Input {...form.register('pincode')} placeholder="Pincode" />
              <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button><Button type="submit" className="flex-1">Register</Button></div>
            </div>
          )}
        </form>
        <div className="mt-6 text-center"><Link to="/login" className="text-blue-600 font-medium">Already have an account? Sign in</Link></div>
      </GlassCard>
    </div>
  );
};