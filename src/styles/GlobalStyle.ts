import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, #root {
    position : relative;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', 'sans-serif';
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    background-color: ${props => props.theme.primary};
  }
  button {
    font-family: 'Pretendard', 'sans-serif';
    outline: 0;
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      opacity: 0.9;
    }
  }
  input, select {
    box-sizing: border-box;
    width: 320px;
    height: 46px;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    padding: 0 16px;
    transition: all 0.3s;
    &:focus {
      outline: none;
      border: 1px solid ${props => props.theme.secondary};
      box-shadow: 0 0 6px 3px rgba(156, 184, 255, 0.3);
    }
  }
`;

export default GlobalStyle;
