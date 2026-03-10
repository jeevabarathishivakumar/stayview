import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/validation';
import LoadingSpinner, { LoginButtonLoader } from '../../components/common/LoadingSpinner';
import { triggerToast } from '../../components/common/toast/Toast';
import ToastMessage from '../../components/common/toast/Toast';
import PrimaryButton from "../../components/common/Button";
import Input from '../../components/common/Input';

// Replace with your own image or a relevant unsplash image
const loginImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

/**
 * Login page component with responsive design.
 * Handles user authentication and form validation.
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show toast if both fields are empty
    if (!formData.email && !formData.password) {
      triggerToast('Please enter your email and password', 'error');
      return;
    }

    // Email validation
    if (!formData.email) {
      triggerToast('Email is required', 'error');
      return;
    } else if (!isValidEmail(formData.email)) {
      triggerToast('Please enter a valid email', 'error');
      return;
    }

    // Password validation
    if (!formData.password) {
      triggerToast('Password is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        triggerToast('Login successful!', 'success');
        setTimeout(() => navigate('/'), 1200); // 1.2s delay so toast is visible
      } else {
        triggerToast('Invalid email or password', 'error');
      }
    } catch (error) {
      triggerToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Toast notifications */}
      <ToastMessage />
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-200">
          <img
            src={loginImage}
            alt="Login visual"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Sign In</h2>
            <p className="text-base text-gray-600">Access your Real Estate Portal account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            {/* Email Field */}
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {/* Password Field */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            {/* Submit Button */}
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? (
                <LoginButtonLoader size="sm" />
              ) : (
                'Sign In'
              )}
            </PrimaryButton>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Email:</strong> admin@nurtur.tech</p>
              <p><strong>Password:</strong> Password@123</p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-8">
            © 2025 Real Estate Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;