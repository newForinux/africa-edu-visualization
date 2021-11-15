import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { CurrentThemeProps, ThemeContext } from "../App"
import { darkTheme, lightTheme, Theme } from "../theme";
import Logo from "./Logo";


interface NavProps {
    visible: boolean;
    onClose: () => void;
}

interface CurrentNavProps {
    currentTheme: Theme;
    visible: boolean;
}


const NavTop = styled.div`
    display: grid;
    row-gap: 3rem;
    column-gap: 1rem;
    grid-template-columns: repeat(8, 1fr);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    align-items: start;
    position: relative;
    max-width: 90rem;
    width: 100%;

    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 2.5rem;
    }

    @media screen and (min-width: 48em) {
        column-gap: 1.25rem;
    }

    @media screen and (min-width: 62em) {
        column-gap: 1.5rem;
        padding-left: 5rem;
        padding-right: 5rem;
        padding-top: 4rem;
    }

    @media screen and (min-width: 80em) {
        column-gap: 2.5rem;
    }
`

const NavCloseWrapper = styled.div`
    grid-row: 1;
    grid-column: -3 / -1;
    align-self: center;
    text-align: right;
`

const NavCloseSvg = styled.svg`
    width: 2.5rem;
    height: 2.5rem;
    color: currentColor;
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    backface-visibility: hidden;
`

const NavCloseButton = styled.button<CurrentThemeProps>`
    border-radius: 0;
    font-weight: 600;
    width: 3.5rem;
    display: inline-flex;
    appearance: none;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 1.2;
    outline: none;
    height: 3.5rem;
    min-width: 2.5rem;
    font-size: 1rem;
    padding-left: 0;
    padding-right: 0;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? "#000" : "#fff"};
`

const NavContainer = styled.div<CurrentNavProps>`
    pointer-events: ${({ visible }) => visible ? "all" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ currentTheme }) => currentTheme === lightTheme ? lightTheme.navBar : darkTheme.navBar};
    z-index: 10000;
    transition: opacity 0.25s ease-in-out;
`

const NavLogoWrapper = styled.div`
    grid-column: 1 / span 3;
    grid-row: 1;
`

const NavLogoLink = styled.a<CurrentThemeProps>`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#585858' : '#FFFFFF'}};
`

const NavLogoSvg = styled.svg`
    height: 5.5rem;
    color: inherit;
`;

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 1rem;
    padding-right: 1rem;
    max-width: 90rem;
    margin-left: auto;
    margin-right: auto;
    padding-top: 6rem;

    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 62em) {
        padding-left: 5rem;
        padding-right: 5rem;
    }
`

const NavMenuIndex = styled.a<CurrentThemeProps>`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    font-size: 3rem;
    line-height: calc(1.5em + 0.5rem);
    letter-spacing: -0.025em;
    font-weight: 700;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? lightTheme.text : darkTheme.text};
    margin-bottom: 1.75rem;
`

const NavMenuSpan = styled.span`
    overflow: hidden;
    height: calc(1.5em + 0.5rem);
    display: inline-block;
    vertical-align: middle;
    color: inherit;
`

const NavBottomWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 0;
    right: 0;
`

const NavBottoms = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
    max-width: 90em;
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 62em) {
        padding-left: 5rem;
        padding-right: 5rem;
    }
`

const NavBottomsLink = styled.a<CurrentThemeProps>`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    font-size: 1.25rem;
    line-height: calc(1em + 0.5rem);
    font-weight: 500;
    letter-spacing: -0.025em;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? "#626B73" : "#CFCFCF"};
    margin-right: 2.5rem;

    @media screen and (min-width: 48em) {
        font-size: 1rem;
    }
`

const NavBottomIntro = styled.span<CurrentThemeProps>`
    font-size: 1rem;
    line-height: calc(1em + 0.5rem);
    font-weight: 500;
    letter-spacing: 0.025em;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? "#3C4E5A" : "#EDEDED"};
    margin-right: 2.5rem;
`

export default function NavBar(props: NavProps) {
    const { theme } = useContext(ThemeContext);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (props.visible) {
            setOpacity(1);
            document.body.style.height = "0";
            document.body.style.overflow = "hidden";
        }

        else {
            setOpacity(0);
            document.body.style.height = "auto";
            document.body.style.overflow = "visible";
        }
    }, [opacity, props.visible])

    return (
        <div>
            <NavContainer visible={props.visible} currentTheme={theme} style={{ opacity: opacity }}>
                <NavTop>
                    <NavCloseWrapper>
                        <NavCloseButton currentTheme={theme} type="button" name="navmenu" tabIndex={0} onClick={props.onClose}>
                            <NavCloseSvg viewBox="0 0 48 48" focusable={false} role="presentation">
                                <g fill="currentcolor">
                                    <path d="M11.965 8.283L40 36.476 36.496 40 8.46 11.807l3.505-3.524z" />
                                    <path d="M8 36.193L36.035 8l3.505 3.524-28.036 28.193L8 36.193z" />
                                </g>
                            </NavCloseSvg>
                        </NavCloseButton>
                    </NavCloseWrapper>
                    <NavLogoWrapper>
                        <NavLogoLink currentTheme={theme} tabIndex={0} href="/">
                            <NavLogoSvg viewBox="0 0 508 491"
                                preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,491.000000) scale(0.100000,-0.100000)"
                                    fill={theme === lightTheme ? 'black' : 'white'} stroke="none">
                                    <Logo />
                                </g>
                            </NavLogoSvg>
                        </NavLogoLink>
                    </NavLogoWrapper>
                </NavTop>
                <NavWrapper role="navigation" aria-label="navMain">
                    <NavMenuIndex currentTheme={theme} tabIndex={0} href="/">
                        <NavMenuSpan>
                            Home
                        </NavMenuSpan>
                    </NavMenuIndex>
                    <NavMenuIndex currentTheme={theme} tabIndex={0} href="/data">
                        <NavMenuSpan>
                            Data
                        </NavMenuSpan>
                    </NavMenuIndex>
                    <NavMenuIndex currentTheme={theme} tabIndex={0} href="/direction">
                        <NavMenuSpan>
                            Direction
                        </NavMenuSpan>
                    </NavMenuIndex>
                    <NavMenuIndex currentTheme={theme} tabIndex={0} href="/contribute">
                        <NavMenuSpan>
                            Contribute
                        </NavMenuSpan>
                    </NavMenuIndex>
                </NavWrapper>
                <NavBottomWrapper>
                    <NavBottoms>
                        <NavBottomsLink currentTheme={theme} href="https://github.com/newForinux">
                            Github (FE)
                        </NavBottomsLink>
                        <NavBottomsLink currentTheme={theme} href="https://github.com/ptrc8727">
                            Github (DV)
                        </NavBottomsLink>
                        <NavBottomsLink currentTheme={theme} href="https://www.notion.so/2cbc1aa1b4cc47e1a0a521efca81b99b">
                            Notion
                        </NavBottomsLink>
                    </NavBottoms>
                    <NavBottoms>
                        <NavBottomIntro currentTheme={theme}>
                            sample&#8482; in Handong Statistics &nbsp; &amp; &nbsp; Junior FE developer minwoo.
                        </NavBottomIntro>
                    </NavBottoms>
                </NavBottomWrapper>
            </NavContainer>
        </div>
    )
}