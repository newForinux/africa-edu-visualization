import { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentThemeProps, ThemeContext } from "../App";
import { lightTheme } from "../theme";
import Logo from "./Logo";
import NavBar from "./NavBar";

const Container = styled.div`
    display: grid;
    row-gap: 3rem;
    column-gap: 1rem;
    grid-template-columns: repeat(6, 1fr);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    align-items: start;
    position: relative;
    z-index: 1;
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
`;

const GridLogo = styled.div`
    grid-column: 1 / span 3;
`;

const HamBar = styled.div`
    display: block;
    grid-column: -3 / -1;
    align-self: center;
    text-align: right;

    @media screen and (min-width: 62em) {
        display: none;
    }
`;

const HamButton = styled.button`
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
    color: #051C2C;

    :hover {
        background-color: rgba(175, 175, 175, 0.075);
    }
`;

const HamButtonSvg = styled.svg`
    width: 3rem;
    height: 3rem;
    color: currentColor;
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    backface-visibility: hidden;
`

const GridLogoSvg = styled.svg`
    height: 5.5rem;
    color: inherit;
`;

const GridLogoLink = styled.a`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    color: #051C2C;
`;

const GridMenu = styled.div`
    display: none;
    grid-column: span 1;
    padding-top: 1.25rem;

    @media screen and (min-width: 62em) {
        display: block;
    }
`

const GridMenuSpan = styled.span`
    overflow: hidden;
    height: calc(1em + 0.25rem);
    display: inline-block;
    vertical-align: middle;
`

const GridMenuLink = styled.a<CurrentThemeProps>`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    font-size: 1.3rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 600;
    letter-spacing: -0.025rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#585858' : '#FFFFFF'}};
    display: inline - block;
    overflow: hidden;
    vertical - align: middle;
`


export default function Header() {
    const { theme } = useContext(ThemeContext);
    const [navOpen, setNavOpen] = useState(false);

    const handleNavOpen = () => {
        setNavOpen(true);
    }

    const handleNavClose = () => {
        setNavOpen(false);
    }



    return (
        <>
            <Container>
                <GridLogo>
                    <GridLogoLink href="/">
                        <GridLogoSvg viewBox="0 0 508 491"
                            preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,491.000000) scale(0.100000,-0.100000)"
                                fill={theme === lightTheme ? 'black' : 'white'} stroke="none">
                                <Logo />
                            </g>
                        </GridLogoSvg>
                    </GridLogoLink>
                </GridLogo>
                <HamBar>
                    <HamButton type="button" name="menu" onClick={handleNavOpen}>
                        <HamButtonSvg viewBox="0 0 48 48" focusable="false" role="presentation">
                            <g fill={theme === lightTheme ? 'black' : 'white'}>
                                <path d="M8 10H40V13H8z" />
                                <path d="M8 22H40V25H8z" />
                                <path d="M8 35H40V38H8z" />
                            </g>
                        </HamButtonSvg>
                    </HamButton>
                </HamBar>
                <GridMenu>
                    <GridMenuLink currentTheme={theme} href="/data">
                        <GridMenuSpan>
                            Data
                        </GridMenuSpan>
                    </GridMenuLink>
                </GridMenu>
                <GridMenu>
                    <GridMenuLink currentTheme={theme} href="/direction">
                        <GridMenuSpan>
                            Direction
                        </GridMenuSpan>

                    </GridMenuLink>
                </GridMenu>
                <GridMenu>
                    <GridMenuLink currentTheme={theme} href="/contribute">
                        <GridMenuSpan>
                            Contribute
                        </GridMenuSpan>
                    </GridMenuLink>
                </GridMenu>
            </Container>
            <NavBar visible={navOpen} onClose={handleNavClose} />
        </>
    )

}