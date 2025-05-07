
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showSignUpLink?: boolean;
  showLoginLink?: boolean;
};

const AuthLayout = ({ 
  children, 
  title, 
  subtitle = "Access your volunteer management dashboard", 
  showSignUpLink = false,
  showLoginLink = false
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Promotional content */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 p-12 text-white flex-col justify-between">
        <div>
          <Link to="/" className="inline-flex items-center">
            <div className="font-bold text-2xl">
              <span className="text-white">Volunteer</span>
              <span className="text-teal-200">Track</span>
            </div>
          </Link>
          <div className="mt-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Make a difference in your community</h1>
            <p className="text-xl text-purple-100 mb-8">Track, manage and coordinate volunteers with an easy-to-use platform designed for NGOs.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Simple Event Management</h3>
                  <p className="text-purple-100">Create events and track volunteer attendance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Volunteer Profiles</h3>
                  <p className="text-purple-100">Maintain detailed records of all your volunteers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Attendance Tracking</h3>
                  <p className="text-purple-100">Record volunteer hours and generate reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-purple-200">
          © 2025 VolunteerTrack. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center md:hidden">
              <div className="font-bold text-2xl mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Volunteer</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">Track</span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          
          {children}
          
          <div className="mt-8 text-center">
            {showSignUpLink && (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-600 hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            )}
            
            {showLoginLink && (
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:underline font-medium">
                  Log In
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
