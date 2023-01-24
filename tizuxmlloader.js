// (C) 2023 Minoru Akagi
// SPDX-License-Identifier: MIT
// https://github.com/minorua/TizuXMLConverter


const TZU_FEATURE_GROUPS = [
    {
        name: "基準点",
        geometryType: "Point"
    },
    {
        name: "筆界点",
        geometryType: "Point"
    },
    {
        name: "仮行政界線",
        geometryType: "LineString"
    },
    {
        name: "筆界線",
        geometryType: "LineString"
    },
    {
        name: "筆",
        geometryType: "Polygon"

    }
];

const TZU_GROUPNAME2GEOMTYPE = {};
for (let i of TZU_FEATURE_GROUPS) {

    TZU_GROUPNAME2GEOMTYPE[i.name] = i.geometryType;

}

if (typeof proj4 === undefined) {

    console.warn("proj4js module not found.");

}
else {

    proj4.defs("EPSG:6669", "+proj=tmerc +lat_0=33 +lon_0=129.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6670", "+proj=tmerc +lat_0=33 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6671", "+proj=tmerc +lat_0=36 +lon_0=132.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6672", "+proj=tmerc +lat_0=33 +lon_0=133.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6673", "+proj=tmerc +lat_0=36 +lon_0=134.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6674", "+proj=tmerc +lat_0=36 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6675", "+proj=tmerc +lat_0=36 +lon_0=137.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6676", "+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6677", "+proj=tmerc +lat_0=36 +lon_0=139.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6678", "+proj=tmerc +lat_0=40 +lon_0=140.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6679", "+proj=tmerc +lat_0=44 +lon_0=140.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6680", "+proj=tmerc +lat_0=44 +lon_0=142.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6681", "+proj=tmerc +lat_0=44 +lon_0=144.25 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6682", "+proj=tmerc +lat_0=26 +lon_0=142 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6683", "+proj=tmerc +lat_0=26 +lon_0=127.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6684", "+proj=tmerc +lat_0=26 +lon_0=124 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6685", "+proj=tmerc +lat_0=26 +lon_0=131 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6686", "+proj=tmerc +lat_0=20 +lon_0=136 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs("EPSG:6687", "+proj=tmerc +lat_0=26 +lon_0=154 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");

}


class LoadError {

    constructor(msg) {

        this.msg = msg;

    }

}


class TizuXMLLoader {

    constructor() {

        this.lastError = null;

    }

    load(xmlStr, print) {

        const entities = {}, stats = {}, data = {};

        TZU_FEATURE_GROUPS.forEach((group) => {
            data[group.name] = {
                type: "FeatureCollection",
                features: []
            };
        });

        const read = this.readTextContent;

        const readXY = (elem) => {

            return [parseFloat(read(elem, "Y")), parseFloat(read(elem, "X"))];

        };

        const joinCurves = (ringElement) => {

            let coordinates, c, pt;

            for (const g of ringElement.children) {

                c = entities[g.getAttribute("idref")];

                if (!coordinates) {

                    coordinates = [...c];

                }
                else {

                    pt = coordinates.pop();

                    if (pt[0] != c[0][0] || pt[1] != c[0][1]) {

                        print("<div>Ringを構成するCurveがつながっていません.</div>");

                    }

                    coordinates = coordinates.concat(c);

                }

            }

            return coordinates;

        };

        print = print || (() => {});


        const parser = new DOMParser();
        const dom = parser.parseFromString(xmlStr, "text/xml");

        const root = dom.documentElement;
        if (root.tagName != "地図") {

            this.lastError = new LoadError("法務省地図XMLファイルではありません.");
            return;

        }

        const mapName = read(root, ":scope > 地図名");
        const adminName = read(root, ":scope > 市区町村名");
        const coordinateSystem = read(root, ":scope > 座標系");
        const sokuchiHanbetsu = read(root, ":scope > 測地系判別");

        print("<div>地図名: " + mapName + "</div>");
        print("<div>市区町村名: " + adminName + "</div>");
        print("<div>座標系: " + (coordinateSystem || "不明") + "</div>");
        print("<div>測地系判別: " + (sokuchiHanbetsu || "不明") + "</div>");

        // 座標変換
        let transformXY;
        if (typeof proj4 !== undefined && coordinateSystem.startsWith("公共座標")) {

            const epsg = 6668 + parseInt(coordinateSystem.substr(4));
            const projStr = "EPSG:" + epsg;

            console.log(projStr);

            transformXY = (coords) => {

                return proj4(projStr).inverse(coords);      // to WGS84 lonlat
            };

        }
        else {

            transformXY = (coords) => { return coords; };

        }

        let elem, id, coordinates, column, e, i;

        // 空間属性
        for (elem of root.querySelector(":scope > 空間属性").children) {

            id = elem.getAttribute("id");

            if (elem.tagName == "zmn:GM_Point") {

                entities[id] = transformXY(readXY(elem));

            }
            else if (elem.tagName == "zmn:GM_Curve") {

                coordinates = [];

                for (column of elem.getElementsByTagName("zmn:GM_LineString.controlPoint")[0].children) {   // e: <GM_PointArray.column>
                    e = column.children[0];
                    if (e.tagName == "zmn:GM_Position.direct") {

                        coordinates.push(transformXY(readXY(e)));

                    }
                    else if (e.tagName == "zmn:GM_Position.indirect") {

                        i = e.children[0].getAttribute("idref");
                        coordinates.push(entities[i]);

                    }
                    else {
                        print("<div>GM_Curve: 構成点が見つかりません</div>");
                    }
                }

                entities[id] = coordinates;

            }
            else if (elem.tagName == "zmn:GM_OrientableCurve") {

                coordinates = entities[elem.getElementsByTagName("zmn:GM_OrientablePrimitive.primitive")[0].getAttribute("idref")];

                if (read(elem, "zmn:GM_OrientablePrimitive.orientation") == "-") {

                    coordinates = [...coordinates].reverse();

                }

                entities[id] = coordinates;

            }
            else if (elem.tagName == "zmn:GM_Surface") {

                e = elem.querySelector("GM_SurfaceBoundary").children;

                coordinates = [joinCurves(e[0].children[0])];

                for (i = 1; i < e.length; i++) {

                    coordinates.push(joinCurves(e[i].children[0]));

                }

                entities[id] = coordinates;

            }
            else {

                print("<div>予期しないタグがありました. タグ名: " + elem.tagName + "</div>")

            }

            stats[elem.tagName] = (stats[elem.tagName] || 0) + 1;

        }

        console.log("空間属性を読み込みました.");

        // 主題属性
        let geom, props;
        for (elem of root.querySelector(":scope > 主題属性").children) {

            geom = undefined;
            props = {};

            for (e of elem.children) {

                if (e.tagName == "形状") {

                    geom = entities[e.getAttribute("idref")];

                }
                else {

                    props[e.tagName] = e.textContent;       // TODO: 筆界未定構成筆

                }

            }

            data[elem.tagName].features.push({
                "type": "Feature",
                "geometry": {
                    "type": TZU_GROUPNAME2GEOMTYPE[elem.tagName],
                    "coordinates": geom
                },
                "properties": props
            });

            stats[elem.tagName] = (stats[elem.tagName] || 0) + 1;

        }

        console.log("主題属性を読み込みました.");
        console.log(stats);

        this.entities = entities;
        this.stats = stats;
        this.data = data;

        return data;
    }

    readTextContent(element, selectors) {

        return (element.querySelector(selectors) || {}).textContent;

    }

    loadFile(file) {

        let _this = this;

        return new Promise((resolve) => {

            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = (e) => {

                const xmlStr = e.target.result;
                const data = _this.load(xmlStr);

                _this.filename = file.name;

                resolve();

            };

        });

    }

}
