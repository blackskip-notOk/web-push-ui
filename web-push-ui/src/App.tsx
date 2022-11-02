import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { askPermission, isPushNotificationSupported, registerServiceWorker, sendNotification } from './webPush/notification'
// import { Checkbox } from './components/common/checkbox/Checkbox';

function App() {

  const [publicKey, setPublicKey] = useState('');

  const handleCreateVapidKeys = async () => {
    const response = await fetch('http://localhost:3000/vapid/create', {
      method: 'POST',
      // mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ userId: 1 }),
    });

    const keys = await response.json();

    setPublicKey(keys.publicKey);

    console.log(response.json);
  };

  const handleAsk = () => {
    if (isPushNotificationSupported()) {
      askPermission().then(consent => {
        if (consent === 'granted') {
          sendNotification();
        }
      });
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleCreateVapidKeys}>
          create VAPID keys
        </button>
        <h2 style={{ maxWidth: '100px' }}>{publicKey}</h2>
        <button onClick={registerServiceWorker}>
          Register Service Worker
        </button>
        <button onClick={handleAsk}>
          Ask User Permission
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <Checkbox /> */}
    </div>
  )
}

export default App
