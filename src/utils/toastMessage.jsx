import { toast } from 'react-toastify';

// ✅ Basic toast messages
export const showSuccess = (message = 'Operation successful!') => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const showError = (message = 'Something went wrong!') => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

// ✅ Promise-based toast
export const showToastPromise = (promiseFn, messages = {}) => {
  return toast.promise(
    promiseFn,
    {
      pending: messages.pending || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong!',
    },
    {
      position: 'top-right',
      autoClose: 3000,
    }
  );
};
