import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
/* Noted: Thai font */
@font-face {
  font-family: 'IBMPlex';
  src: url('/fonts/IBMPlexSansThai-Regular.ttf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'LexendDeca';
  src: url('/fonts/LexendDeca-Regular.ttf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-ExtraLight.ttf');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Light.ttf');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Regular.ttf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Medium.ttf');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-SemiBold.ttf');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Bold.ttf');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-ExtraBold.ttf');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

html {
  --reach-dialog: 1;
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
}

body {
  background-color: #eff1fb;
}

#root {
  background-color: white;
  height: 100%;
}

html,
body,
input, 
button {
  font-family: LexendDeca, Arial, sans-serif;
}

.pointer-link {
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


input:disabled {
    background-color: #f5f5f5!important;
    border-color: #f5f5f5!important;
    box-shadow: none!important;
    color: #7a7a7a!important;
}

a {
    text-decoration-line: none;
}

p {
    margin: 0;
    padding: 0;
}

`
