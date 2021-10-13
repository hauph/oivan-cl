import { createGlobalStyle } from 'styled-components';
import './scss/root.scss';
import './scss/style.scss';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #f2fafe;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
