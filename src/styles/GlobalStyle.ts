import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard.woff') format('woff');
    font-style: normal;
  }
  :root {
    position : relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
    color: ${props => props.theme.black};
    font-family: 'Pretendard', 'sans-serif';
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`;

export default GlobalStyle;
