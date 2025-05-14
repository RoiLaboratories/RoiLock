import Button from '../../components/Button';
import { Lock } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="flex w-full md:flex-row flex-col items-center justify-between md:py-10 py-4 md:px-12 px-4">
      {/* Left Content */}
      <div className="md:w-full max-w-xl mb-10 lg:mb-0 md:pl-12 pl-0">
        <h1 className=" md:text-5xl text-4xl font-bold text-text mb-4 md:text-left text-center">
          Secure Liquidity Locks. <span className="text-primary md:text-4xl text-4xl">Flexible Vesting.</span>
          {" "} <span className=" md:text-4xl text-3xl font-bold text-primary md:mb-6 mb-2"> 
          Built for Web3.
        </span>
        </h1>
       
        <p className="md:text-lg text-md text-text mb-8 md:text-left text-center">
          RoiLock is a decentralized platform for locking tokens and liquidity with customizable 
          schedules, multi-chain support, and rewards for long-term commitment.
        </p>
        <div className=' justify-center items-center flex md:hidden'>
         <Button
                    variant="outlined"
                    className="sm:flex border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                    icon={
                     <Lock width={20}/>
                    }
                  >
                    Create Lock
                  </Button>
                  </div>
                   <Button
                    variant="outlined"
                    className="sm:flex border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-surface)] md:flex hidden"
                    icon={
                     <Lock width={20}/>
                    }
                  >
                    Create Lock
                  </Button>
      </div>

      {/* Right Image with Glow Effect */}
      <div className="relative md:block hidden">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-primary rounded-full opacity-5 blur-3xl animate-pulse"></div>
        
        {/* Safe and coins image */}
        <div className="relative">
          <img 
            src="/bgHome.png" 
            alt="RoiLock Safe with Crypto Coins" 
            className=" relative z-10 image-contain animate-scale-pulse"
          />
        </div>
      </div>
    </div>
  );
}