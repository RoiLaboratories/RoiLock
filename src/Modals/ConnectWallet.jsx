import { X, MessageSquare } from 'lucide-react';
import Modal from '../components/Modal';

// Wallet categories and data
const walletData = {
  installed: [
    { id: 'metamask', name: 'MetaMask', icon: '/metamask.png' },
    { id: 'phantom', name: 'Phantom', icon: '/phantom.png' },
    { id: 'nest', name: 'Nest Wallet', icon: '/nest.png' },
  ],
  recommended: [
    { id: 'coinbase', name: 'Coinbase', icon: '/coinbase.png' },
    { id: 'roiwallet', name: 'RoiWallet', icon: '/roi.png' },
  ],
  others: [
    { id: 'walletconnect', name: 'Wallet Connect', icon: '/walletConnect.png' },
  ]
};

/**
 * Wallet Connect Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls if the modal is visible
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Function} props.onWalletSelect - Function called when wallet is selected
 */
const ConnectWallet = ({ isOpen, onClose, onWalletSelect }) => {
  const handleWalletSelect = (walletId) => {
    if (onWalletSelect) {
      onWalletSelect(walletId);
    }
    onClose();
  };
  
  // Render wallet list section
  const renderWalletSection = (title, wallets, colorClass) => (
    <>
      <div className="mt-4 mb-2">
        <p className={`text-sm font-medium ${colorClass}`}>{title}</p>
      </div>
      <div className="space-y-3">
        {wallets.map(wallet => (
          <div 
            key={wallet.id}
            className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-btnhoverL transition-colors duration-150"
            onClick={() => handleWalletSelect(wallet.id)}
          >
            <div className="w-8 h-8 mr-3 flex-shrink-0">
              <img 
                src={wallet.icon} 
                alt={wallet.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-medium">{wallet.name}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="w-80 rounded-3xl"
    >
      <div className="relative p-2">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
              <MessageSquare size={16} />
            </div>
            <h2 className="text-xl font-bold">Connect Wallet</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-btnhoverL transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Wallet Lists */}
        <div className="overflow-y-auto scrollbar-hide  scrollbar-hide max-h-[60vh] px-2">
          {renderWalletSection("Installed", walletData.installed, "text-orange-500")}
          {renderWalletSection("Recommended", walletData.recommended, "text-orange-500")}
          {renderWalletSection("Others", walletData.others, "text-orange-500")}
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWallet;