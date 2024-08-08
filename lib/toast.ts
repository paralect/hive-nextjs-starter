import { toast } from 'sonner';

export const showSuccessMessage = (message, options = {}) => {
  return toast.message(message, {
    position: 'bottom-left',
    ...options
  });
};

export const showErrorMessage = (message, options = {}) => {
  return toast.error(message, {
    position: 'bottom-left',
    ...options
  });
};