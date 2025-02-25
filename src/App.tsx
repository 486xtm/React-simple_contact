import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
type FormData = {
  content: string;
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    content: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const backend_URL = "https://node-telegramfoward.vercel.app/api/messages/send"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    axios.post(backend_URL,formData).then(res => {
      setTimeout(() => setIsSubmitted(false), 3000);
    }).catch((err) => {
      console.log(err.response.data);
    })
    setFormData({ ...formData, content: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Contact US
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="content" 
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                         bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                       text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       transition-colors duration-200"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <p className="text-green-800 text-sm text-center">
                Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;