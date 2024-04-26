import { createGlobalStyle } from 'styled-components';

export const PALETTE = {
  MAIN_BACKGROUND: '#f7f7f7',
  MAIN_WHITE: '#ffffff',
  GRASS_1: '#9be9a8',
  GRASS_2: '#2eb872',
  GRASS_3: '#30a14e',
  GRASS_4: '#216e39',
  GRASS_BORDER_1: '#1b1f23',
  GRASS_BORDER_2: '#1b1f23',
  GRASS_BORDER_3: '#1b1f23',
  GRASS_BORDER_4: '#1b1f23',
  NO_GRASS_BORDER: '#1b1f23',
  NO_GRASS: '#ebedf0',
  MAIN_BLACK: '#1f2328',
  SUB_BLACK: '#24292f',
  LIGHT_BLACK: '#636c76',
  MAIN_COLOR: '#2eb872',
  SUB_COLOR: '#83cc61',
  LIGHT_COLOR: '#a3de83',
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Pretendard;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    font-weight: 300;
  }
  @font-face {
    font-family: Pretendard;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: Pretendard;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
  }
  @font-face {
    font-family: Pretendard;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraBold.woff') format('woff');
    font-weight: 800;
  }

  * {
    box-sizing: border-box;
    color: #1f2328;
  }

  body {
    font-family: Pretendard;
    font-weight: 400;
    margin: 0px;
  }

  #root {
    width: 100vw;
    min-width: 1440px;
    height: 100vh;
    display: flex;
    margin: 0;
  }

  a, span, button, input {
    display: inline-block;
  }

  input:focus {
    outline: none;
  }

  button {
    background-color: inherit;
    outline: none;
    border: none;
  }

  button:focus {
    background-color: inherit;
    outline: none;
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
      a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    vertical-align: baseline;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: inherit;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }

  .hover-bg-light:hover {
    background-color: white !important;
    transition: background-color 0.2s;
  }

  .hover-bg-dark:hover {
    background-color: #f7f7f7 !important;
    transition: background-color 0.2s;
  }

  .hover-moving:hover {
    transform: translate(-4px, -4px) !important;
    transition: transform 0.3s;
  }
`;