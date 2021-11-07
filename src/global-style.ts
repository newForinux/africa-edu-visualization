import { createGlobalStyle } from "styled-components";
import { reset } from 'styled-reset';
import "./fonts/font.scss";

interface ThemeInterface {
    theme: {
        body: string;
        text: string;
        toggleBackground: string;
        mainColor: string;
        navBar: string;
    };
}

export const GlobalStyle = createGlobalStyle<ThemeInterface>`
    ${reset}
    *, ::before, ::after {
        box-sizing: border-box;
    }
    body {
        font-family: 'Steradian', 'NanumGothic', sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background 0.25s ease;
    }
    button {
        background: none;
        cursor: pointer;
        border: none;
        outline: none;
        transition: background 0.25s ease;
    }
    ol, ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;