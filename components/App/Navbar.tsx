'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connect, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 xl:left-[12%] lg:left[15%] transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto mt-4 px-4"
    >
      <div className="bg-black bg-opacity-20 backdrop-blur-lg px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300 rounded-lg">
        <div className="flex items-center flex-col">
          <span className="font-extrabold text-emerald-300 text-[2rem] sm:text-[2rem] ml-2 tracking-wide">SOLGOTCHI</span>
          <div className="-mt-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">A Stakecity game</div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 md:space-x-4">

          <Button
            onClick={() => publicKey ? disconnect() : setVisible(true)}
            className="font-semibold text-black bg-emerald-300 border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-all duration-300 hover:text-white hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-pentagon"
          >
            {publicKey 
              ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` 
              : 'Connect Wallet'}
          </Button>
          <Link href="/sign-in">
            <Button className="font-semibold text-white bg-[#172C4D] border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-all duration-300 hover:bg-[#172C4D] hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-diamond">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="font-semibold text-white bg-[#172C4D] border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-all duration-300 hover:bg-[#172C4D] hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-hexagon">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="sm:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white bg-[#172C4D] p-1"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-90 backdrop-blur-lg p-4 rounded-lg">
          <div className="flex flex-col space-y-2">
            <Button className="font-semibold text-black hover:text-white bg-emerald-300 border border-white/20 px-4 py-2 text-base transition-all duration-300  hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-pentagon">
              Connect Wallet
            </Button>
            <Button className="font-semibold text-white bg-[#172C4D] border border-white/20 px-4 py-2 text-base transition-all duration-300 hover:bg-[#172C4D] hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-diamond">
              Sign In
            </Button>
            <Button className="font-semibold text-white bg-[#172C4D] border border-white/20 px-4 py-2 text-base transition-all duration-300 hover:bg-[#172C4D] hover:border-white/40 hover:shadow-lg hover:scale-105 clip-path-hexagon">
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar
