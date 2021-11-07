import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";
import { lightTheme, Theme } from "../theme";

interface ToggleProps {
    theme: Theme;
}

const ToggleButton = styled('button') <ToggleProps>`
    position: fixed;
    width: 125px;
    height: 45px;
    right: 1.5rem;
    bottom: 1.5rem;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: ${({ theme }) => theme.toggleBackground};
    color: ${({ theme }) => theme.text};
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    z-index: 10000;

    $:hover {
        filter: brightness(
            ${({ theme }) => (theme === lightTheme ? '0.9' : '1.13')}
        );
    }
`;


const Emoji = styled.figure`
    width: 33px;
    height: 33px;
    border-radius: 100%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModeContent = styled.p`
    font-size: 0.8rem;
    margin-left: 5px;
`;

export default function DarkModeToggle(): ReactElement {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <ToggleButton onClick={toggleTheme} theme={theme}>
            {theme === lightTheme ? (
                <>
                    <Emoji>
                        <span role="img" aria-label="darkMoon">
                            🌒
                        </span>
                    </Emoji>
                    <ModeContent>다크 모드</ModeContent>
                </>
            ) : (
                <>
                    <Emoji>
                        <span role="img" aria-label="lightSun">
                            ☀️
                        </span>
                    </Emoji>
                    <ModeContent>라이트 모드</ModeContent>
                </>
            )}
        </ToggleButton>
    )
}
