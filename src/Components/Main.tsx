import { useContext } from "react";
import styled from "styled-components"
import { CurrentThemeProps, ThemeContext } from "../App";
import sampleImg from "../images/sample.jpg";
import { lightTheme } from "../theme";
import FadeIn from "./FadeIn";
import "./Main.scss";


const AuthorWrapper = styled.div`
    line-height: calc(1em + 0.25rem);
    margin-bottom: 0.5rem;
`

const AuthorLink = styled.div`
    transition: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    font-size: 1rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 600;
    color: #FF585D;
    display: inline-block;
    vertical-align: top;
`

const MainHeader = styled.header`
    display: flex;
    flex-direction: column;
    max-width: 44.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 4rem;
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 30em) {
        max-width: 46.5rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
`

const MainTitle = styled.h1`
    font-size: 2.2rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 2.5rem;

    @media screen and (min-width: 48em) {
        font-size: 3rem;
    }
`

const SubTitle = styled.p`
    font-family: 'Steradian', system-ui, sans-serif;
    font-size: 1.25rem;
    line-height: calc(1em + 0.75rem);
    letter-spacing: -0.0125em;
    margin-bottom: 2.5rem;

    @media screen and (min-width: 48em) {
        font-size: 1.5rem;
    }
`

const Caption = styled.figcaption<CurrentThemeProps>`
    font-family: 'Steradian', system-ui, sans-serif;
    margin-top: 1.25rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#96A0A6' : '#C8C8C8'};
    max-width: 42.5rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 1rem;
    line-height:  calc(1em + 0.5rem);
`

export default function Main() {
    const { theme } = useContext(ThemeContext);

    return (
        <FadeIn delay={300}>
            <article >
                <MainHeader>
                    <AuthorWrapper>
                        <AuthorLink>
                            sample&#8482; : visualization
                        </AuthorLink>
                    </AuthorWrapper>
                    <MainTitle>
                        Africa Education Analysis: From a Socio-Economical Perspectives.
                    </MainTitle>
                    <SubTitle>
                        In the perspective of Socio-Economical Perspectives.
                    </SubTitle>
                </MainHeader>
                <div className="main-content">
                    <div className="medium-image">
                        <div className="medium-image-wrapper">
                            <figure className="md-figure">
                                <span className="md-figure-wrapper"
                                    style={{
                                        position: "relative",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        maxWidth: "800px",
                                    }}>
                                    <a className="md-figure-link" href={sampleImg} rel="noopener" style={{ display: "block" }}>
                                        <img alt="banner"
                                            title="banner"
                                            src={sampleImg}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                margin: "0px",
                                                verticalAlign: "middle",
                                                position: "relative",
                                                top: "0px",
                                                left: "0px",
                                            }}
                                        />
                                    </a>
                                </span>
                                <Caption currentTheme={theme}>
                                    The result of PCA which labels centroids.
                                </Caption>
                            </figure>
                        </div>
                    </div>
                </div>
            </article>
        </FadeIn>
    )
}