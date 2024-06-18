import { useState } from 'react';
import showToastPromise from './showToastPromise';

const ToastPromise = () => {
  const [settings, setSettings] = useState({});

  const saveSettings = async (settings) => {
    // Simula una llamada API que guarda la configuración
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Settings saved');
      }, 2000);
    });
  };

  const handleSaveSettings = () => {
    const savePromise = saveSettings(settings);

    showToastPromise(savePromise, {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default ToastPromise;
