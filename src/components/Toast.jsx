import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white min-w-[300px]`}>
        {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span className="font-montserrat flex-1">{message}</span>
        <button onClick={onClose} className="hover:opacity-80">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
