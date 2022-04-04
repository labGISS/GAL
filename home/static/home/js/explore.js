PALETTE_COLORS = [
    ["#f12711", "#f5af19"],
    ["#00416a", "#799f0c", "#ffe000"],
    ["#0575e6", "#00f260"],
    ["#000046", "#1cb5e0"],
    ["#b00500", "#0075fd"],
    ["#493240", "#ff0099"],
    ["#0ad060", "#ffffff"],
]

function initPage() {
    setListeners();
    loadMap();


    $("#findbox").toggleClass("hidden");

    // let topOfDiv = $('.side-controls-footer').offset().top;
    // let bottomOfVisibleWindow = $(window).height();
    $('#mapSelection').multiSelect({
        containerHTML: '<div class="multi-select-container theme-select">',
        menuItemHTML: '<label class="multi-select-menuitem checkbox-container">',
        noneText: 'Mappe',
        listSelected: false,
        // viewportBottomGutter: bottomOfVisibleWindow - topOfDiv + 25,  // TODO: Uncomment this when the side footer will be completed
    });

    $('#searchBtn').on('click', (e) => {
        $(e.target).closest("button").toggleClass("hidden");
        $("#findbox").toggleClass("hidden");
        $(".search-input").focus();
    });

    $(window).on('load', function() {
        $('#navigation-button-vis').addClass("selected");
    });
}

function addCoverageLayer(covData, map) {
    function getRandomPalette() {
        let randomInt = Math.floor(Math.random() * PALETTE_COLORS.length);
        return PALETTE_COLORS[randomInt];
    }

    return new Promise((resolve, reject) => {
        CovJSON.read(covData).then(function (cov) {
            const parameterName = "null"; // TODO: modify this when pygeoapi will support parameters
            console.log(cov["_covjson"]['ranges']['null']['values']);
            // let valuesRange = cov["_covjson"]["ranges"]["null"]["valuesrange"]
            let paletteData = {
                "colors": getRandomPalette(),
                "interpolation": "linear",
                // "steps": valuesRange[1] - valuesRange[0]
            }
            let layer = C.dataLayer(cov, {
                parameter: parameterName,
                paletteExtent: "subset",
                palette: C.paletteFromObject(paletteData)
            }).on('afterAdd', function (e) {
                if (layer.palette) {
                    C.legend(layer).addTo(map);
                }

                if (layer.timeSlices) {
                    new C.TimeAxis(layer).addTo(map);
                }

                // the promise is resolved only if the layer is successfully added to the map
                console.log("afterAdd", layer);
                layer.setOpacity(0.9);
                resolve({leafletLayer: layer, layerType: "coverage"});
            }).addTo(map);
        }).catch(function (error) {
            reject(error);
        });
    });

    // Use this to load a tiff format
    // let url_to_geotiff_file = "http://localhost:5000/collections/altitudine_rec/coverage?f=GTiff";
    // fetch(url_to_geotiff_file)
    //     .then(response => response.arrayBuffer())
    //     .then(arrayBuffer => {
    //         parseGeoraster(arrayBuffer).then(georaster => {
    //             console.log("georaster:", georaster);
    //
    //             /*
    //                 GeoRasterLayer is an extension of GridLayer,
    //                 which means can use GridLayer options like opacity.
    //
    //                 Just make sure to include the georaster option!
    //
    //                 Optionally set the pixelValuesToColorFn function option to customize
    //                 how values for a pixel are translated to a color.
    //
    //                 http://leafletjs.com/reference-1.2.0.html#gridlayer
    //             */
    //             var layer = new GeoRasterLayer({
    //                 georaster: georaster,
    //                 opacity: 1,
    //                 // pixelValuesToColorFn: values => values[0] === 42 ? '#ffffff' : '#000000',
    //                 resolution: 128 // optional parameter for adjusting display resolution
    //             });
    //             layer.addTo(window.map);
    //
    //             window.map.fitBounds(layer.getBounds());
    //         });
    //     });
}

function addFeatureLayer(featData, map) {
    return new Promise((resolve, reject) => {
        let layer = L.geoJSON(featData, {
            onEachFeature: function (feature, layer) {
                let str = "";
                let searchIndex = "";
                Object.keys(feature.properties).forEach((key) => {
                    if (feature.properties[key]) {  // don't add if property is null
                        str = `${str} <b>${key}</b>: ${feature.properties[key]} <br>`

                        searchIndex = `${searchIndex}${feature.properties[key]} | `
                    }
                });

                feature.properties["searchIndex"] = searchIndex.substr(0, searchIndex.length - 3);
                layer.bindPopup(str);
            }
        }).addTo(map);

        resolve({leafletLayer: layer, layerType: "feature"});
    });
}

function setListeners() {
    $('.header-button').on('click', function (e) {
        $(e.target).addClass('selected');
        $(e.target).parent().siblings().children().removeClass('selected');
    });

    $('#mapSelection').on('change', function(e) {
        let option = $(e.target);
        let dataUrl = option.closest("select").attr("data-url");
        let mapId = option.attr("value");
        let mapName = option.text();
        let selected = option.prop("selected");

        if (selected) {
            // add new layer
            loadLayer(dataUrl, mapId, mapName)
        } else {
            // remove existing layer
            unloadLayer(mapId);
        }
    });

    $(".theme-icon").on("click", function(e) {
        let target = $(e.target);
        let dataUrl = target.attr("data-url");
        let mapName = target.attr("data-mapname");
        let mapId = target.attr("data-mapid");

        let isActive = target.hasClass("active")
        if (!isActive) {
            target.addClass("active");
            loadLayer(dataUrl, mapId, mapName);
        } else {
            unloadLayer(mapId);
            target.removeClass("active");
        }
    })
}

function loadLayer(dataUrl, mapId, mapName) {
    let overlay = $(".loading-overlay");
    overlay.addClass("active");

    // get layer json data from server endpoint
    ajax(dataUrl, {
        dataType: 'json',
        type: "get", //send it through get method
        data: { m: mapId },
    }).then((data) => {
        // transform the json data to a leaflet layer (feature layer or coverage layer)
        let p;
        if (data['type'] === "Coverage") {
            p = addCoverageLayer(data, window.leaflet.map);
        } else {
            // One of features types
            p = addFeatureLayer(data, window.leaflet.featuresLayerGroup);
        }
        return p;
    }).then((result) => {
        // now the leafletLayer layer is successfully added to the map
        let leafletLayer = result.leafletLayer;

        window.leaflet.mapLayersControls.addOverlay(leafletLayer, mapName);
        window.leaflet.mapLayers[mapId] = leafletLayer;
        window.leaflet.map.fitBounds(leafletLayer.getBounds());

        if (result.layerType === "coverage") {
            window.leaflet.coveragePopup.addCoverageLayer(leafletLayer);
        }
        overlay.removeClass("active");
    }).catch((error) => {
        // in case of error
        console.log(error);
    });
}

function unloadLayer(mapId) {
    let layer = window.leaflet.mapLayers[mapId];

    if (layer) {
        window.leaflet.featuresLayerGroup.removeLayer(layer); // eventually remove (if present) also from the group
        window.leaflet.map.removeLayer(layer);
        window.leaflet.mapLayersControls.removeLayer(layer);
    }

    delete window.leaflet.mapLayers[mapId];
}

function loadMap() {
    const map = L.map('map').setView([40.715029, 14.942076], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    let controls = L.control.layers(null, null, {collapsed: true}).addTo(map);
    let coveragePopup = new C.DraggableValuePopup();
    map.on('click', function (e) {
        window.leaflet.coveragePopup.setLatLng(e.latlng).openOn(window.leaflet.map);
    });

    var markersLayer = new L.LayerGroup();	//layer contain searched elements
    map.addLayer(markersLayer);

    map.addControl( new L.Control.Search({
        container: 'findbox',
        layer: markersLayer,
        initial: false,
        collapsed: false,
        firstTipSubmit: true,
        propertyName: "searchIndex",
        formatData: function (json) {	//adds coordinates to name.
            var propName = this.options.propertyName,
                propLoc = this.options.propertyLoc,
                i, jsonret = {};
            if (L.Util.isArray(propLoc))
                for (i in json) {
                    if (!this._getPath(json[i], propName)) continue;
                    jsonret[this._getPath(json[i], propName) + " (" + json[i][propLoc[0]] + "," + json[i][propLoc[1]] + ")"] = L.latLng(json[i][propLoc[0]], json[i][propLoc[1]]);
                }
            else
                for (i in json) {
                    if (!this._getPath(json[i], propName)) continue;
                    jsonret[this._getPath(json[i], propName) + " (" + json[i][propLoc][0] + "," + json[i][propLoc][1] + ")"] = L.latLng(this._getPath(json[i], propLoc));
                }
            return jsonret;
        }
    }) );
    //inizialize search control


    window.leaflet = {
        map: map,
        mapLayers: {}, // we'll save there layers added to the map
        featuresLayerGroup: markersLayer,
        mapLayersControls: controls,
        coveragePopup: coveragePopup,
    }
}
