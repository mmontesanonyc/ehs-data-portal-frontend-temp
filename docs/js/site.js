(() => {
  // ns-params:@params
  var devpath = "/ehs-data-portal-frontend-temp";

  // <stdin>
  var indicatorDataPath = `${devpath}/visualizations/csv/`;
  var indicatorMapPath = `${devpath}/visualizations/json/`;
  var summarySpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": "container",
    "height": "container",
    "autosize": "fit",
    "data": { "url": "visualizations/csv/bikeLanP.csv" },
    "mark": { "type": "bar", "tooltip": true },
    "encoding": {
      "x": {
        "field": "Neighborhood",
        "type": "nominal",
        "sort": { "op": "mean", "field": "Data Value" },
        "axis": null
      },
      "y": {
        "field": "Data Value",
        "type": "quantitative",
        "axis": { "title": null }
      },
      "color": {
        "condition": {
          "test": "datum.Neighborhood=='Canarsie - Flatlands'",
          "value": "#1CA970"
        },
        "value": "#D8D8D8"
      }
    }
  };
  window.buildSummarySpec = function(neighborhood, dataSlug) {
    const temp = JSON.parse(JSON.stringify(summarySpec));
    temp.encoding.color.condition.test = "datum.Neighborhood=='" + neighborhood + "'";
    temp.data.url = indicatorDataPath + dataSlug + ".csv";
    return temp;
  };
  var trendSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": "container",
    "height": "container",
    "autosize": "fit",
    "data": { "url": "visualizations/csv/poveACSP_trend.csv" },
    "layer": [{
      "mark": { "type": "line", "point": false, "tooltip": true },
      "encoding": {
        "x": {
          "field": "Time",
          "type": "ordinal",
          "axis": { "title": null, "labelAngle": 45 }
        },
        "y": {
          "field": "Data Value",
          "type": "quantitative",
          "axis": { "title": null }
        },
        "detail": {
          "field": "Neighborhood",
          "type": "nominal"
        },
        "color": {
          "value": "lightgrey"
        }
      }
    }, {
      "mark": { "type": "line", "point": true, "tooltip": true },
      "encoding": {
        "x": {
          "field": "Time",
          "type": "ordinal",
          "axis": { "title": null, "labelAngle": 45 }
        },
        "y": {
          "field": "Data Value",
          "type": "quantitative",
          "axis": { "title": null }
        },
        "detail": {
          "field": "Neighborhood",
          "type": "nominal"
        },
        "color": {
          "condition": {
            "test": "datum.Neighborhood=='Canarsie - Flatlands'",
            "value": "#1CA970"
          },
          "value": null
        }
      }
    }]
  };
  window.buildTrendSpec = function(neighborhood, dataSlug) {
    const temp = JSON.parse(JSON.stringify(trendSpec));
    temp.layer[1].encoding.color.condition.test = "datum.Neighborhood=='" + neighborhood + "'";
    temp.data.url = indicatorDataPath + dataSlug + "_trend.csv";
    return temp;
  };
  var mapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": "container",
    "height": "container",
    "autosize": "fit",
    "data": {
      "url": "/visualizations/json/UHF42.topo.json",
      "format": { "type": "topojson", "feature": "collection" }
    },
    "transform": [
      {
        "lookup": "id",
        "from": {
          "data": { "url": "visualizations/csv/bikeLanP.csv" },
          "key": "geo_join_id",
          "fields": ["Data Value", "Neighborhood", "message"]
        }
      }
    ],
    "layer": [
      {
        "mark": { "type": "geoshape", "tooltip": true },
        "encoding": {
          "color": {
            "field": "Data Value",
            "type": "quantitative",
            "scale": { "scheme": "greens" },
            "legend": { "orient": "top-left", "title": null }
          },
          "stroke": { "value": "white" },
          "strokeWidth": { "value": 1 },
          "tooltip": [
            { "field": "Neighborhood", "type": "nominal" },
            { "field": "Data Value", "type": "quantitative" }
          ]
        }
      },
      {
        "mark": { "type": "geoshape" },
        "encoding": {
          "color": { "value": null },
          "stroke": {
            "condition": {
              "test": "datum.properties.GEONAME=='Bedford Stuyvesant - Crown Heights'",
              "value": "#000000"
            }
          },
          "strokeWidth": { "value": 3 }
        }
      }
    ]
  };
  window.buildMapSpec = function(neighborhood, dataSlug) {
    const temp = JSON.parse(JSON.stringify(mapSpec));
    temp.layer[1].encoding.stroke.condition.test = "datum.Neighborhood=='" + neighborhood + "'";
    temp.transform[0].from.data.url = indicatorDataPath + dataSlug + ".csv";
    temp.data.url = indicatorMapPath + "UHF42.topo.json";
    return temp;
  };
})();
