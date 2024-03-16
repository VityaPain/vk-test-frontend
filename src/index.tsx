import ReactDOM from 'react-dom/client';

import {
  ConfigProvider,
  AdaptivityProvider
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import App from './App';

bridge.send("VKWebAppInit")

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);

