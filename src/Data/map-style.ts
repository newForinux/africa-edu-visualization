import { LayerProps } from "react-map-gl";

export const countryBaseLayer : LayerProps = {
    id: 'countries',
    type: 'fill',
    source: 'countries',
    paint: {
      'fill-outline-color': 'rgba(0,0,0,0)',
      'fill-color': 'rgba(0,0,0,0)'
    }
};

export const countriesLayerLight : LayerProps = {
    id: 'countries-line',
    source: 'countries',
    type: 'line',
    paint: {
      'line-width': 2,
      'line-color': '#A8C8F9'
    }
};

export const countriesLayerDark : LayerProps = {
    id: 'countries-line',
    source: 'countries',
    type: 'line',
    paint: {
      'line-width': 1,
      'line-color': '#FFF'
    }
};


export const highlightLayerLight : LayerProps = {
    id: 'counties-highlighted',
    type: 'fill',
    source: 'countries',
    paint: {
        'fill-outline-color': '#7ac2a0',
        'fill-color': '#9bd0b7',
        'fill-opacity': 0.8
    }
};

export const highlightLayerDark : LayerProps = {
    id: 'counties-highlighted',
    type: 'fill',
    source: 'countries',
    paint: {
        'fill-outline-color': '#f7926f',
        'fill-color': '#B266B2',
        'fill-opacity': 0.8
    }
};