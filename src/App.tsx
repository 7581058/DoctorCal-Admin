import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from './styles/Themes.ts';
import GlobalStyle from './styles/GlobalStyle.ts';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={themes}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
