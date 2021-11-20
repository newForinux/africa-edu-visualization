import React, { useState, useMemo, useContext } from "react";
import ReactMapGL, { InteractiveMapProps, Layer, LinearInterpolator, MapEvent, Source, WebMercatorViewport } from "react-map-gl";
import { CurrentThemeProps, ThemeContext } from "../../App";
import { lightTheme, darkTheme } from "../../theme";
import geojson from "./.data/africa.json";
import { countriesLayerDark, countriesLayerLight, countryBaseLayer, highlightLayerDark, highlightLayerLight } from "./map-style";
import styled, { keyframes } from "styled-components";
import { WebMercatorViewportOptions } from "@math.gl/web-mercator/src/web-mercator-viewport";
import { bbox } from "turf";
import mapboxgl from "mapbox-gl";
import COUNTRIES from "./.data/marker.json";
import MAPPED from "./.data/link.json";
import Pin from "./Pin";


const MAPBOX_TOKEN = "pk.eyJ1Ijoia2FkYWFkYWsiLCJhIjoiY2t3MjhjZXByMGQ1ejJxcGF4aW81dHVkMSJ9.u5LnaVXKaWV3P_Uu02fi_w";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const DataContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    height: 100%;
    max-width: 120em;
    align-content: center;
    column-gap: 1rem;
    row-gap: 3rem;
    justify-content: center;
    
    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 48em) {
        margin-top: 3rem;
        padding-bottom: 4rem;
    }

    @media screen and (min-width: 62em) {
        padding-left: 4rem;
        padding-right: 4rem;
        margin-top: 3rem;
        padding-bottom: 5rem;
        column-gap: 3rem;
    }

    @media screena and (min-width: 80em) {
        padding-left: 5rem;
        padding-right: 5rem;
        row-gap: 1rem;
        column-gap: 4rem;
    }
`

const DataMapContainer = styled.div`
    width: 100%;
    height: 25rem;

    @media screen and (min-width: 80em) {
        width: 34rem;
        height: 50rem;
    }

    @media screen and (min-width: 100em) {
        width: 45rem;
    }
`


const DataDetailContainer = styled.div`
    max-width: 70rem;
    max-height: 50rem;

    @media screen and (min-width: 80em) {
        width: 34rem;
    }

    @media screen and (min-width: 100em) {
        width: 40rem;
    }
`

const DataImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 80em) {
        max-width: 38rem;
        height: 60%;
    }
`

const CountryHeader = styled.h1`
    font-size: 3rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 1rem;


    @media screen and (min-width: 62em) {
        font-size: 3.5rem;
    }
`

const CountryHeaderKr = styled.h3`
    font-size: 1.5rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 600;
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    letter-spacing: 0.2rem;

    @media screen and (min-width: 48em) {
        font-size: 2.0rem;
    }

    @media screen and (min-width: 62em) {
        font-size: 2.5rem;
    }
`

const CountryPreSolution = styled.p`
    font-size: 1rem;
    line-height: calc(1em + 0.25rem);
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    font-weight: 600;
    color: #FF585D;
    display: inline-block;
    vertical-align: top;
    padding-top: 3.5rem;
    padding-bottom: 0.5rem;

    @media screen and (min-width: 80em) {
        padding-top: 2rem;
    }
`

const ResultAbstract = styled.p`
    font-size: 1.0rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 500;
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    letter-spacing: 0.05rem;
    word-break: keep-all;

    @media screen and (min-width: 62em) {
        font-size: 1.25rem;
    }

    @media screen and (min-width: 80em) {
        max-width: 25rem;
    }

    @media screen and (min-width: 100em) {
        max-width: 35rem;
    }
`

const CountryIntroCaption = styled.figcaption<CurrentThemeProps>`
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    margin-top: 0.75rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#96A0A6' : '#C8C8C8'};
    margin-left: auto;
    margin-right: auto;
    font-size: 1rem;
    line-height: calc(1em + 0.5rem);
    word-break: keep-all;
`

const ResultCaption = styled.figcaption<CurrentThemeProps>`
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    margin-top: 0.75rem;
    padding-bottom: 1rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#96A0A6' : '#C8C8C8'};
    margin-left: auto;
    margin-right: auto;
    font-size: 1rem;
    line-height: calc(1em + 0.5rem);
`

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    position: absolute;
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 4px solid black;

    background: transparent;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    z-index: 10000;
`

const RestContainer = styled.div`
    width: 90%;
    height: 100%;

    @media screen and (min-width: 80em) {
        max-width: 800px;
    }
`

const Divider = styled.div`
    width: 90%;
    text-align: center;
    padding-top: 2rem;
    border-bottom: 1px solid #979faf;
    line-height: 0.1em;

    @media screen and (min-width: 80em) {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
`

const DividerSpan = styled.span<CurrentThemeProps>`
    padding: 0 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    background: ${({ currentTheme }) => currentTheme === lightTheme ? lightTheme.body : darkTheme.body};
    transition: background 0.25s ease;
`

const ResultImage = styled.img`
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
`

const ResultSolution = styled.p`
    font-size: 1.5rem;
    line-height: calc(1.5em + 0.25rem);
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    font-weight: 500;
    display: inline-block;
    vertical-align: top;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    letter-spacing: 0.05rem;
    word-break: keep-all;
`

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default function Data() {
    const { theme } = useContext(ThemeContext);
    const [countryName, setCountryName] = useState(null);
    const [load, setLoad] = useState(false);
    const [restLoad, setRestLoad] = useState(false);

    const [viewport, setViewport] = useState<InteractiveMapProps>({
        latitude: 1.188056,
        longitude: 20.4389,
        zoom: window.innerWidth <= 400 ? 1.6 : 2.5
    });


    const handleLoad = () => {
        setLoad(true);
    }

    const handleRestLoad = () => {
        setRestLoad(true);
    }


    const onClick = (event: MapEvent) => {
        const feature = event.features && event.features[0];

        if (feature) {
            const [minLng, minLat, maxLng, maxLat] = bbox(feature);
            const vp = new WebMercatorViewport(viewport as WebMercatorViewportOptions);
            const { longitude, latitude, zoom } = vp.fitBounds(
                [
                    [minLng, minLat],
                    [maxLng, maxLat]
                ],
                {
                    padding: 40
                }
            );

            setCountryName(feature && feature.properties.name);
            setLoad(false);
            setRestLoad(false);

            setViewport({
                ...viewport,
                longitude,
                latitude,
                zoom,
                transitionInterpolator: new LinearInterpolator({
                    around: [event.offsetCenter.x, event.offsetCenter.y]
                }),
                transitionDuration: 600
            });

        }
    };

    const selectedCountry = (countryName) || 'Not Selected.';
    const filter = useMemo(() => ['in', 'name', selectedCountry], [selectedCountry]);
    const lineStyle = theme === lightTheme ? countriesLayerLight : countriesLayerDark;
    const highlightLayer = theme === lightTheme ? highlightLayerLight : highlightLayerDark;

    const selectedData = useMemo(() => MAPPED.filter(function (value) { return value.name === selectedCountry })[0], [selectedCountry]);

    return (
        <DataContainer>
            <DataMapContainer>
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={onClick}
                    mapStyle={theme === lightTheme ? "mapbox://styles/mapbox/light-v9" : "mapbox://styles/mapbox/dark-v9"}
                    onViewportChange={(v: InteractiveMapProps) => setViewport(v)}
                >
                    <Source id="countries" type="geojson" data={geojson as GeoJSON.FeatureCollection<GeoJSON.Geometry>}>
                        <Layer {...countryBaseLayer} />
                        <Layer {...highlightLayer} filter={filter} />
                        <Layer {...lineStyle} />
                    </Source>
                    <Pin data={COUNTRIES} />
                </ReactMapGL>
            </DataMapContainer>
            <DataDetailContainer>
                <CountryHeader>
                    {selectedCountry}
                </CountryHeader>
                {selectedCountry !== "Not Selected." && selectedData &&
                    <>
                        <CountryHeaderKr>
                            {selectedData.name_kr}
                        </CountryHeaderKr>
                        <DataImageContainer>
                            {!load && <Spinner />}
                            <img alt="country_result"
                                title="country_result"
                                src={`./.result/${selectedData.main_img}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    margin: "0px",
                                    verticalAlign: "middle",
                                    position: "relative",
                                    top: "0px",
                                    left: "0px",
                                    objectFit: "contain",
                                    objectPosition: "left"
                                }}
                                onLoad={handleLoad}
                            />

                        </DataImageContainer>
                        <CountryIntroCaption currentTheme={theme}>
                            {selectedData.main_intro}
                        </CountryIntroCaption>
                        <CountryPreSolution>
                            요약:
                        </CountryPreSolution>
                        <ResultAbstract>
                            {selectedData.summary}
                        </ResultAbstract>
                    </>
                }
            </DataDetailContainer>
            <Divider>
                <DividerSpan currentTheme={theme}>
                    RESULT
                </DividerSpan>
            </Divider>
            <RestContainer>
                {selectedCountry !== "Not Selected." && selectedData &&
                    selectedData.other_img.map((element, index) => {
                        return (
                            <>
                                {!restLoad && <Spinner />}
                                <ResultImage src={`./.result/${element.img}`} alt={`c${index}`} onLoad={handleRestLoad} />
                                <ResultCaption currentTheme={theme}>
                                    {`그림 ${index + 1} : ${element.caption}`}
                                </ResultCaption>
                            </>
                        )
                    })
                }

                {selectedCountry !== "Not Selected." && selectedData && selectedData.solution !== "" &&
                    <ResultWrapper>
                        <CountryPreSolution>
                            솔루션:
                        </CountryPreSolution>
                        <ResultSolution>
                            {selectedData.solution}
                        </ResultSolution>
                    </ResultWrapper>
                }
            </RestContainer>
        </DataContainer>
    );
}