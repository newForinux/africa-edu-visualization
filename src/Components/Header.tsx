import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";
import { lightTheme } from "../theme";

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

    @media screen and (min-width: 48em) {
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

const GridLogoLink = styled.a`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    color: #051C2C;
`;

const GridLogoSvg = styled.svg`
    height: 4rem;
    color: inherit;
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

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const GridMenuLink = styled.a`
        transition: none;
        cursor: pointer;
        text-decoration: none;
        outline: none;
        font-size: 1.3rem;
        line-height: calc(1em + 0.25rem);
        font-weight: 700;
        letter-spacing: -0.025rem;
        color: ${theme === lightTheme ? '#585858' : '#FFFFFF'};
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
    `

    return (
        <>
            <Container>
                <GridLogo>
                    <GridLogoLink href="/">
                        <GridLogoSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 440">
                            <g fill={theme === lightTheme ? 'black' : 'white'} fillRule="evenodd" stroke="none">
                                <path fillRule="nonzero" d="M348.8 289.261L400 289.261 400 440 0 440 0 0 399.361 0 399.361 148.372 348.161 148.372 348.161 51.1628 51.2001 51.1628 51.2001 388.837 348.8 388.837z" />
                                <path d="M107.93 168.426L107.93 113.989 288.974 113.989 288.974 162.696 185.754 278.119 289.793 278.119 289.793 332.557 104.653 332.557 104.653 283.031 206.644 168.426z" />
                            </g>
                        </GridLogoSvg>
                    </GridLogoLink>
                </GridLogo>
                <HamBar>
                    <HamButton type="button" name="menu">
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
                    <GridMenuLink href="/">
                        <GridMenuSpan>
                            Data
                        </GridMenuSpan>
                    </GridMenuLink>
                </GridMenu>
                <GridMenu>
                    <GridMenuLink href="/">
                        <GridMenuSpan>
                            Direction
                        </GridMenuSpan>

                    </GridMenuLink>
                </GridMenu>
                <GridMenu>
                    <GridMenuLink href="/">
                        <GridMenuSpan>
                            Contribute
                        </GridMenuSpan>
                    </GridMenuLink>
                </GridMenu>
            </Container>
        </>
    )

}