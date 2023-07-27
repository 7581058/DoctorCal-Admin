import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from './styles/Themes.ts';
import GlobalStyle from './styles/GlobalStyle.ts';

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
