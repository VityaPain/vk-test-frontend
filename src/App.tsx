import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FactBar from "./components/factBar/FactBar"
import NameBar from "./components/nameBar/NameBar"

import {
  AppRoot,
  SplitLayout,
  SplitCol,
  CellButton,
  View,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderBack,
  usePlatform
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css'
import './style/style.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  const platform = usePlatform();

  const [activePanel, setActivePanel] = useState('main');

  return (
    <AppRoot>
      <QueryClientProvider client={queryClient}>
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
          <SplitCol autoSpaced>
            <View activePanel={activePanel}>
              <Panel id="main">
                <PanelHeader>Задания</PanelHeader>
                <Group>
                  <CellButton
                    expandable="auto"
                    onClick={() => setActivePanel('fact')}
                  >
                    Случайный факт про котиков
                  </CellButton>
                  <CellButton
                    expandable="auto"
                    onClick={() => setActivePanel('age')}
                  >
                    Узнать возраст по имени
                  </CellButton>
                </Group>
              </Panel>
              <Panel id="fact">
                <PanelHeader
                  before={
                    <PanelHeaderBack
                      onClick={() => setActivePanel('main')}
                      label={platform === 'vkcom' ? 'Назад' : undefined}
                    />
                  }
                >
                  Факт про котиков
                </PanelHeader>
                <FactBar/>
              </Panel>
              <Panel id="age">
                <PanelHeader
                  before={
                    <PanelHeaderBack
                      onClick={() => setActivePanel('main')}
                      label={platform === 'vkcom' ? 'Назад' : undefined}
                    />
                  }
                >
                  Возраст
                </PanelHeader>
                <NameBar />
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </QueryClientProvider>
    </AppRoot>
  );
}

export default App;
