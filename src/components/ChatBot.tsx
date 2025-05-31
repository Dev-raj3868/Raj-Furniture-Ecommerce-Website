
import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your furniture assistant. How can I help you find the perfect furniture today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const predefinedResponses: { [key: string]: string } = {
    'hello': 'Hello! Welcome to Raj Furniture. How can I assist you today?',
    'hi': 'Hi there! I\'m here to help you find the perfect furniture.',
    'sofa': 'We have a great collection of sofas! Check out our 3-seater leather sofa, L-shaped sectional, and modern velvet sofa.',
    'chair': 'Our chair collection includes dining chairs, office chairs, and accent chairs. What type are you looking for?',
    'table': 'We offer dining tables, coffee tables, and side tables in various styles and materials.',
    'bed': 'Our bedroom collection features king size beds, queen size beds, and storage beds.',
    'price': 'Our furniture ranges from ₹5,000 to ₹50,000. What\'s your budget range?',
    'delivery': 'We offer free delivery on orders above ₹999. Standard delivery takes 3-7 business days.',
    'discount': 'We currently have up to 60% off on selected items! Check our sale section.',
    'help': 'I can help you with product information, pricing, delivery, and recommendations. What would you like to know?'
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I\'d be happy to help! You can ask me about our furniture categories like sofas, chairs, tables, beds, pricing, delivery, or current offers.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-50 flex flex-col bg-white shadow-2xl border-0 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Raj Furniture Assistant</h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
