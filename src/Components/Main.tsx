import { useContext } from "react";
import styled from "styled-components"
import { ThemeContext } from "../App";
import { lightTheme } from "../theme";
import sampleImg from "../images/sample.jpg";
import "./Main.scss";


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
    font-size: 3rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 2.5rem;
`

const SubTitle = styled.p`
    font-family: 'Steradian', system-ui, sans-serif;
    font-size: 1.5rem;
    line-height: calc(1em + 0.75rem);
    letter-spacing: -0.0125em;
    margin-bottom: 2.5rem;
`


const ImageWrapper = styled.span`
    grid-column: 1 / -1;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 1280px;
`

export default function Main() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <article>
                <MainHeader>
                    <MainTitle>
                        Africa Education Analysis:
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
                                        maxWidth: "1280px",
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
                            </figure>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}