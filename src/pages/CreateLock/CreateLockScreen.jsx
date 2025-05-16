import { useState } from 'react';
import Button from '../../components/Button';

const CreateLockScreen = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedChain, setSelectedChain] = useState('Base');
  const [useAnotherOwner, setUseAnotherOwner] = useState(false);
  const [useVesting, setUseVesting] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenDetails, setTokenDetails] = useState(null);
  
  const chains = [
    { id: 'evm', name: 'EVM Chain (Base, Ethereum, BSC...)', selected: true },
    // Other chain types could be added here
  ];
  
  const subChains = [
    { id: 'base', name: 'Base', icon: '/base.png',  },
    { id: 'eth', name: 'Ethereum', icon: '/eth.png',  },
    { id: 'bnb', name: 'BSC', icon: '/bsc.png', },
    { id: 'polygon', name: 'Polygon', icon: '/polygon.png', },
    { id: 'arbitrium', name: 'Arbitrium', icon: '/arbitrum.png', },
  ];
  
  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };
  
  const handleChainSelect = (chainName) => {
    setSelectedChain(chainName);
  };

  const handleTokenAddressChange = (e) => {
    const address = e.target.value;
    setTokenAddress(address);
    
    // Set token details when a valid address is entered
    // In a real app, this would fetch data from the blockchain
    if (address && address.length > 30) {
      setTokenDetails({
        name: 'Cross',
        symbol: 'Cross',
        decimals: 18,
        balance: 30
      });
    } else {
      setTokenDetails(null);
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-surface rounded-lg shadow p-6 text-text">
      <h1 className="text-2xl text-text font-bold mb-4">Create your lock</h1>
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold mb-4">Chain</h2>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          {/* Chain Type Selection */}
          <div className="mb-4">
            {chains.map((chain) => (
              <div key={chain.id} className="flex items-center mb-2">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
                  <div className={`w-3 h-3 rounded-full ${chain.selected ? 'bg-orange-500' : 'bg-white'}`}></div>
                </div>
                <span>{chain.name}</span>
              </div>
            ))}
          </div>
          
          {/* Sub-chains Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {subChains.map((chain) => (
              <div 
                key={chain.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  selectedChain === chain.name ? 'bg-orange-200 text-black' : 'bg-btnhoverL'
                }`}
                onClick={() => handleChainSelect(chain.name)}
              >
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center mr-2`}>
                  <img src={chain.icon} alt={chain.name} />
                </div>
                <span>{chain.name}</span>
                <div className="ml-auto w-5 h-5 rounded-full border border-black flex items-center justify-center p-0 m-0">
                  {selectedChain === chain.name && (
                    <div className="w-3 h-3 flex rounded-full bg-orange-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {!isWalletConnected ? (
          <>
            <p className="text-text mb-4">You need to connect wallet first.</p>
            <Button
              variant='connect'
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          </>
        ) : (
          <div className="mt-6">
            {/* Token Configuration */}
            <div className="mb-4">
              <label className="block text-text mb-2">Token or LP Token address</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                placeholder="Enter token address"
                value={tokenAddress}
                onChange={handleTokenAddressChange}
              />
            </div>
            
            {/* Token Details - Only show when token address is entered */}
            {tokenDetails && (
              <>
                <div className="flex flex-col w-full items-center justify-center gap-4 mb-4">
                  <div className="flex w-full items-center justify-between border-b border-btnHoverL">
                    <label className="block text-text mb-2">Name</label>
                    <div className="flex justify-end text-gray-500">{tokenDetails.name}</div>
                  </div>
                  
                  <div className="flex w-full items-center justify-between border-b border-btnHoverL">
                    <label className="block text-text mb-2">Symbol</label>
                    <div className="flex justify-end text-gray-500">{tokenDetails.symbol}</div>
                  </div>
                </div>
                
                <div className="flex flex-col w-full items-center justify-center gap-4 mb-4">
                  <div className="flex w-full items-center justify-between border-b border-btnHoverL">
                    <label className="block text-text mb-2">Decimals</label>
                    <div className="flex justify-end">{tokenDetails.decimals}</div>
                  </div>
                  
                  <div className="flex w-full items-center justify-between border-b border-btnHoverL">
                    <label className="block text-text mb-2">Your Balance</label>
                    <div className="flex justify-end">{tokenDetails.balance}</div>
                  </div>
                </div>
              </>
            )}
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div 
                  className={`w-5 h-5 ${useAnotherOwner ? 'bg-orange-500 text-white' : 'bg-white border border-gray-300'} flex items-center justify-center rounded mr-2 cursor-pointer`}
                  onClick={() => setUseAnotherOwner(!useAnotherOwner)}
                >
                  {useAnotherOwner && "✓"}
                </div>
                <label className="text-text cursor-pointer" onClick={() => setUseAnotherOwner(!useAnotherOwner)}>
                  use another owner?
                </label>
              </div>
              
              {/* Only show Owner field when useAnotherOwner is true */}
              {useAnotherOwner && (
                <div className="mb-4">
                  <label className="block text-text mb-2">Owner</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                    placeholder="Enter owner's address"
                  />
                  <p className="text-orange-500 text-sm mt-1">the address you input here will be receive the tokens once they are unlocked</p>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-text mb-2">Title (Optional)</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                placeholder="Ex: My Lock"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-text mb-2">Amount</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                  placeholder="Enter amount"
                />
                <span className="absolute right-3 top-3 text-orange-500 font-medium">MAX</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div 
                  className={`w-5 h-5 ${useVesting ? 'bg-orange-500 text-white' : 'bg-white border border-gray-300'} flex items-center justify-center rounded mr-2 cursor-pointer`}
                  onClick={() => setUseVesting(!useVesting)}
                >
                  {useVesting && "✓"}
                </div>
                <label className="text-text cursor-pointer" onClick={() => setUseVesting(!useVesting)}>
                  use vesting?
                </label>
              </div>
            </div>
            
            {/* Show different fields based on useVesting state */}
            {useVesting ? (
              // Vesting Fields
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-text mb-2">TGE Date (UTC)</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                        placeholder="Ex: dd/mm/yyyy"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-text mb-2">TGE Percent</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                      placeholder="Ex: 10"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-text mb-2">Cycle (days)</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                      placeholder="Ex: 10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-text mb-2">Cycle release percent</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                      placeholder="Ex: 10"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Simple Unlock Date Field
              <div className="mb-4">
                <label className="block text-text mb-2">Unlock Date (UTC)</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full p-3 border border-gray-300 bg-[var(--color-btnhoverL)] rounded-md"
                    placeholder="Ex: dd/mm/yyyy"
                  />
                </div>
              </div>
            )}
            
            <div className="bg-orange-100 border border-red-100 p-4 rounded-lg mb-6">
              <p className="text-center text-black">
                Please exclude RoiLock's lockup address <span className="text-orange-500 text-[13px] md:text-sm">0xdD6E31A046b828CbBAf939C2a394629adf88BdC</span> from fees, rewards, max tx amount to start locking tokens
                <br />
                We don't support rebase tokens.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant='connect'
              >
                Approve
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLockScreen;