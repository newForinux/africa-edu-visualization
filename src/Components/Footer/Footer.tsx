import { useContext } from "react";
import styled from "styled-components"
import { CurrentThemeProps, ThemeContext } from "../../App";
import { darkTheme, lightTheme } from "../../theme";
import Logo from "../Logo";


const FooterContainer = styled.div`
    display: grid;
    row-gap: 4rem;
    column-gap: 1rem;
    grid-template-columns: repeat(8, 1fr);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 4rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    max-width: 90rem;
    width: 100%;
    align-content: center;
    
    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 48em) {
        row-gap: 6rem;
        column-gap: 1.25rem;
        margin-top: 6rem;
        padding-bottom: 4rem;
    }

    @media screen and (min-width: 62em) {
        column-gap: 1.5rem;
        padding-left:  5rem;
        padding-right: 5rem;
        margin-top: 8rem;
        padding-bottom: 5rem;
    }

    @media screena and (min-width: 80em) {
        column-gap: 2.5rem;
    }
`

const FooterDetail = styled.div`
    display: grid;
    row-gap: 1rem;
    column-gap: 2.5rem;
    grid-column: 1 / -1;
    grid-template-columns: repeat(8, 1fr);
    max-width: 90rem;
    width: 100%;

    @media screen and (min-width: 48em) {
        row-gap: 2.5rem;
    }
`

const FooterLogo = styled.div`
    grid-column: span 8;
    background-color: transparent;
    padding-top: 0.5rem;

    @media screen and (min-width: 48em) {
        grid-column: span 1;
    }
`

const FooterLogoSvg = styled.svg`
    height: 6rem;
    color: inherit;
`;

const FooterCompDetail = styled.div`
    grid-column: span 8;
    margin-top: 2rem;

    @media screen and (min-width: 48em) {
        grid-column: 2 / span 3;
        margin-top: 0;
    }
`

const FooterLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-column: span 8;
    background-color: transparent;
    margin-top: 2rem;

    @media screen and (min-width: 48em) {
        grid-column: 5 / span 2;
        margin-top: 0;
    }
`

const FooterMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-column: span 8;
    background-color: transparent;
    margin-top: 2rem;

    @media screen and (min-width: 48em) {
        grid-column: 7 / span 2;
        margin-top: 0;
    }
`

const FooterLink = styled.a`
    transition: none 0s ease 0s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    font-size: 1rem;
    line-height: calc(1em + 0.5rem);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: rgb(122, 132, 141);
    margin-bottom: 1.25rem;
`

const FooterCompParg = styled.p<CurrentThemeProps>`
    font-family: Steradian, system-ui, sans-serif;
    font-size: 1rem;
    line-height: calc(1rem + 0.75rem);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? "#626B73" : "#CFCFCF"};
`

const FooterCopyright = styled.div<CurrentThemeProps>`
    font-family: Steradian, system-ui, sans-serif;
    grid-column: 1 / -1;
    margin: 0;
    font-size: 1rem;
    line-height: calc(1em + 0.5rem);
    font-weight: 500;
    letter-spacing: -0.025rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? "#3C4E5A" : "#EDEDED"};

    @media screen and (min-width: 48em) {
        margin: 0 auto;
    }
`


export default function Footer() {
    const { theme } = useContext(ThemeContext);
    const bgColor = theme === lightTheme ? lightTheme.navBar : darkTheme.navBar;

    return (
        <div style={{ backgroundColor: bgColor }}>
            <FooterContainer>
                <FooterDetail>
                    <FooterLogo>
                        <FooterLogoSvg viewBox="0 0 508 491"
                            preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,491.000000) scale(0.100000,-0.100000)"
                                fill={theme === lightTheme ? 'black' : 'white'} stroke="none">
                                <Logo />
                            </g>
                        </FooterLogoSvg>
                    </FooterLogo>
                    <FooterCompDetail>
                        <FooterCompParg currentTheme={theme}>
                            sample : Society of Statistics
                            <br /><br />
                            Handong Global University Pohang Gyeongbuk 37554
                            <br />
                            Republic of Korea
                        </FooterCompParg>
                    </FooterCompDetail>
                    <FooterLinkWrapper>
                        <FooterLink href="https://github.com/newForinux">
                            Github (Front-end)
                        </FooterLink>
                        <FooterLink href="https://github.com/ptrc8727">
                            Github (Visualization)
                        </FooterLink>
                        <FooterLink href="https://www.notion.so/2cbc1aa1b4cc47e1a0a521efca81b99b">
                            Notion
                        </FooterLink>
                        <FooterLink href="mailto:21600065@handong.edu">
                            Email
                        </FooterLink>
                    </FooterLinkWrapper>
                    <FooterMenuWrapper>
                        <FooterLink href="/">
                            Home
                        </FooterLink>
                        <FooterLink href="/data">
                            Data
                        </FooterLink>
                        <FooterLink href="/direction">
                            Direction
                        </FooterLink>
                        <FooterLink href="/contribute">
                            Contribute
                        </FooterLink>
                    </FooterMenuWrapper>
                </FooterDetail>
                <FooterCopyright currentTheme={theme}>
                    © 2021 sample&#8482; &amp; minwoo
                </FooterCopyright>
            </FooterContainer>
        </div>
    )
}