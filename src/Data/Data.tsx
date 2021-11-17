import React, { useState, useMemo, useContext } from "react";
import ReactMapGL, { InteractiveMapProps, Layer, LinearInterpolator, MapEvent, Source, WebMercatorViewport } from "react-map-gl";
import { ThemeContext } from "../App";
import { lightTheme } from "../theme";
import geojson from "./africa.json";
import { countriesLayerDark, countriesLayerLight, countryBaseLayer, highlightLayerDark, highlightLayerLight } from "./map-style";
import styled from "styled-components";
import { WebMercatorViewportOptions } from "@math.gl/web-mercator/src/web-mercator-viewport";
import { bbox } from "turf";

const MAPBOX_TOKEN = "pk.eyJ1Ijoia2FkYWFkYWsiLCJhIjoiY2t3MjhjZXByMGQ1ejJxcGF4aW81dHVkMSJ9.u5LnaVXKaWV3P_Uu02fi_w";


const DataBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    align-items: start;
    position: relative;
    z-index: 1;
    max-width: 110rem;
    width: 100%;

    @media screen and (min-width: 30em) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-top: 2.5rem;
    }
    @media screen and (min-width: 62em) {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 4rem;
    }
`

const DataMapContainer = styled.div`
    display: inline-flex;
`

const DataDetail = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 44.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 30em) {
        max-width: 46.5rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 60em) {
        max-width: 50.5rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }


    @media screen and (min-width: 80em) {
        max-width: 50.5rem;
        padding-left: 4rem;
        padding-right: 4rem;
    }
`

const CountryHeader = styled.h1`
    font-size: 2.5rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 2.5rem;

    @media screen and (min-width: 48em) {
        font-size: 3rem;
    }

    @media screen and (min-width: 60em) {
        font-size: 4rem;
    }
`

export default function Data() {
    const { theme } = useContext(ThemeContext);
    const [countryName, setCountryName] = useState(null);

    const [viewport, setViewport] = useState<InteractiveMapProps>({
        latitude: 1.188056,
        longitude: 17.4389,
        zoom: 2.2
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
            <DataMapContainer>
                <ReactMapGL
                    {...viewport}
                    width="45vw"
                    height="80vh"
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
                </ReactMapGL>
                <DataDetail>
                    <CountryHeader>
                        {selectedCountry}
                    </CountryHeader>
                </DataDetail>
            </DataMapContainer>
        </DataBlockContainer>
    );
}
