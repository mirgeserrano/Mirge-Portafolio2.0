import { toast } from 'react-toastify';

const showToastPromise = (promise, messages) => {
  const { loading, success, error } = messages;

  return toast.promise(
    promise,
    {
      pending: loading,
      success: success,
      error: error,
    }
  );
};

export default showToastPromise;
