import React, { useState, useMemo, useContext } from "react";
import ReactMapGL, { InteractiveMapProps, Layer, LinearInterpolator, MapEvent, Source, WebMercatorViewport } from "react-map-gl";
import { ThemeContext } from "../App";
import { lightTheme } from "../theme";
import geojson from "./.data/africa.json";
import { countriesLayerDark, countriesLayerLight, countryBaseLayer, highlightLayerDark, highlightLayerLight } from "./map-style";
import styled from "styled-components";
import { WebMercatorViewportOptions } from "@math.gl/web-mercator/src/web-mercator-viewport";
import { bbox } from "turf";
import mapboxgl from "mapbox-gl";
import COUNTRIES from "./.data/marker.json";
import Pin from "./Pin";

const MAPBOX_TOKEN = "pk.eyJ1Ijoia2FkYWFkYWsiLCJhIjoiY2t3MjhjZXByMGQ1ejJxcGF4aW81dHVkMSJ9.u5LnaVXKaWV3P_Uu02fi_w";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const DataBlockContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 4rem;
    column-gap: 1rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    max-width: 110rem;
    width: 100%;
    align-content: center;
    
    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 48em) {
        row-gap: 6rem;
        column-gap: 1.25rem;
        margin-top: 3rem;
        padding-bottom: 4rem;
    }

    @media screen and (min-width: 62em) {
        column-gap: 1.5rem;
        padding-left:  5rem;
        padding-right: 5rem;
        margin-top: 3rem;
        padding-bottom: 5rem;
    }

    @media screena and (min-width: 80em) {
        column-gap: 2.5rem;
    }
`

const DataMapContainer = styled.div`
    grid-column: span 1;
    row-gap: 1rem;
    column-gap: 2.5rem;
    max-width: 55rem;
    width: 100%;

    @media screen and (min-width: 62em) {
        row-gap: 2.5rem;
    }
`

const DataWrapper = styled.div`
    display: grid;
    row-gap: 1rem;
    column-gap: 2.5rem;
    grid-column: 1 / -1;
    grid-template-columns: repeat(8, 1fr);
    max-width: 110rem;
    width: 100%;

    @media screen and (min-width: 48em) {
        row-gap: 2.5rem;
    }
`

const DataDetail = styled.div`
    grid-column: 1;
    max-width: 50rem;
    padding-left: 1.2rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 48em) {
        grid-column: 2 / span 5;
        row-gap: 2.5rem;
    }
`

const CountryHeader = styled.h1`
    font-size: 3rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 2.5rem;

    @media screen and (min-width: 62em) {
        font-size: 4rem;
    }
`

export default function Data() {
    const { theme } = useContext(ThemeContext);
    const [countryName, setCountryName] = useState(null);

    const [viewport, setViewport] = useState<InteractiveMapProps>({
        latitude: 1.188056,
        longitude: 20.4389,
        zoom: window.innerWidth <= 400 ? 1.6 : 2.5
    });


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

    return (
        <DataBlockContainer>
            <DataWrapper>
                <DataMapContainer>
                    <ReactMapGL
                        {...viewport}
                        width="42vmax"
                        height="50vmax"
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
                <DataDetail>
                    <CountryHeader>
                        {selectedCountry}
                    </CountryHeader>
                </DataDetail>
            </DataWrapper>
        </DataBlockContainer>
    );
}
