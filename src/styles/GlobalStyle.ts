import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
