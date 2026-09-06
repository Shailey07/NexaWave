import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';
import { useMode } from '@/context/ModeContext';
// FIXED: Import real API
import { api } from '@/services/api';

const emailSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const phoneSchema = z.object({ phone: z.string().regex(/^[6-9]\d{9}$/), otp: z.string().length(6) });
type EmailFormData = z.infer<typeof emailSchema>;
type PhoneFormData = z.infer<typeof phoneSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithPhone } = useAuth();
  const { mode } = useMode();
  const [loginType, setLoginType] = useState<'email' | 'phone'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const emailForm = useForm<EmailFormData>({ resolver: zodResolver(emailSchema) });
  const phoneForm = useForm<PhoneFormData>({ resolver: zodResolver(phoneSchema) });

  const handleEmailLogin = async (data: EmailFormData) => {
    setIsLoading(true);
    try { await login(data.email, data.password); navigate('/home'); } 
    catch (error) {} finally { setIsLoading(false); }
  };

  // 🚀 FIXED: Handling Real Phone Login Response
  const handlePhoneLogin = async (data: PhoneFormData) => {
    setIsLoading(true);
    try { 
      await loginWithPhone(data.phone, data.otp); 
      navigate('/home'); 
    } catch (error) {
      alert("❌ Galat OTP! Backend ne reject kar diya.");
    } finally { 
      setIsLoading(false); 
    }
  };

  // 🚀 FIXED: Sending Real OTP to Backend Terminal
  const sendOtp = async () => {
    const phone = phoneForm.getValues('phone');
    if (!phone) {
      alert("Pehle phone number daalo bhai!");
      return;
    }
    setIsLoading(true);
    try { 
      await api.post('/auth/send-otp', { phone });
      setOtpSent(true); 
      alert("✅ OTP Sent! Check Backend Terminal.");
    } catch (error) {
      alert("Error sending OTP to backend.");
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-gray-50">
      <div className="w-full max-w-md">
        <GlassCard className="p-8 bg-white border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue to NEXAWAVE</p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <Button variant={loginType === 'email' ? 'default' : 'ghost'} className={`flex-1 ${loginType === 'email' ? 'bg-white text-gray-900 shadow-sm hover:bg-gray-50' : 'text-gray-500'}`} onClick={() => setLoginType('email')}>
              <Mail className="h-4 w-4 mr-2" /> Email
            </Button>
            <Button variant={loginType === 'phone' ? 'default' : 'ghost'} className={`flex-1 ${loginType === 'phone' ? 'bg-white text-gray-900 shadow-sm hover:bg-gray-50' : 'text-gray-500'}`} onClick={() => setLoginType('phone')}>
              <Phone className="h-4 w-4 mr-2" /> Phone
            </Button>
          </div>

          {loginType === 'email' ? (
            <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input {...emailForm.register('email')} type="email" placeholder="Enter your email" className="pl-10" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input {...emailForm.register('password')} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <Button type="submit" variant={mode === 'rural' ? 'rural' : 'urban'} className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</Button>
            </form>
          ) : (
            <form onSubmit={phoneForm.handleSubmit(handlePhoneLogin)} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input {...phoneForm.register('phone')} type="tel" placeholder="Phone number (e.g. 9876543210)" className="pl-10" />
              </div>
              <div className="flex space-x-2">
                <Input {...phoneForm.register('otp')} placeholder="OTP" disabled={!otpSent} className="flex-1" />
                <Button type="button" variant="outline" onClick={sendOtp} disabled={isLoading || otpSent}>{otpSent ? 'Sent' : 'Send OTP'}</Button>
              </div>
              <Button type="submit" variant={mode === 'rural' ? 'rural' : 'urban'} className="w-full" disabled={isLoading || !otpSent}>{isLoading ? 'Verifying...' : 'Verify & Sign In'}</Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/register" className="text-blue-600 font-medium hover:underline">Don't have an account? Sign up</Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};