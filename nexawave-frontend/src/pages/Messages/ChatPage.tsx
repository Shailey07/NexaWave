import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { providerName, role } = location.state || { providerName: 'Provider', role: 'Service' };
  
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: 1, text: `Hi! I saw your requirement for ${role}. How can I help?`, sender: 'provider', time: '10:00 AM' },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setChat([...chat, { id: Date.now(), text: message, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage('');
    
    // Auto reply for demo
    setTimeout(() => {
      setChat(prev => [...prev, { id: Date.now(), text: "I'll be there in 15 minutes. Can you share the exact landmark?", sender: 'provider', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#E5DDD5]"> {/* WhatsApp-like background */}
      
      {/* App Header is hidden via layout, so we build custom Chat Header */}
      <div className="bg-[#0052cc] text-white pt-16 pb-3 px-4 shadow-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-2 rounded-full hover:bg-white/20 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/30">
            {providerName.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">{providerName}</h2>
            <p className="text-blue-100 text-xs">{role} • Online</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => window.open('tel:+919876543210')}>
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${msg.sender === 'user' ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none' : 'bg-white text-slate-900 rounded-tl-none'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className="text-[10px] text-slate-500 text-right mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f0f0] p-3 pb-safe border-t border-gray-300">
        <form onSubmit={handleSend} className="flex items-end gap-2 max-w-4xl mx-auto">
          <Button type="button" variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white text-gray-500 hover:bg-gray-100 shadow-sm shrink-0">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="w-full max-h-32 min-h-[48px] py-3 px-4 resize-none focus:outline-none text-slate-900 placeholder:text-gray-400"
              rows={1}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
            />
          </div>
          <Button type="submit" disabled={!message.trim()} className="h-12 w-12 rounded-full bg-[#0052cc] hover:bg-blue-700 text-white shadow-sm shrink-0 flex items-center justify-center p-0">
            <Send className="w-5 h-5 ml-1" />
          </Button>
        </form>
      </div>
    </div>
  );
};