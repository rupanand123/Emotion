import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, Info, Home as HomeIcon } from 'lucide-react';
import { auth } from '../firebase';
import { cn } from '../utils';

interface NavbarProps {
  user: any;
}

export default function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="font-bold text-black text-xs">SER</span>
          </div>
          <span className="font-bold tracking-tight text-lg hidden sm:block">Speech Emotion Recognition</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <Link 
            to="/" 
            className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="Home"
          >
            <HomeIcon className="w-5 h-5" />
          </Link>
          <Link 
            to="/about" 
            className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="About"
          >
            <Info className="w-5 h-5" />
          </Link>

          <div className="w-px h-4 bg-white/10 mx-2" />

          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-black font-bold rounded-full text-sm hover:bg-orange-400 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-white/60 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/5"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-1.5 border border-white/20 text-white font-medium rounded-full text-sm hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
