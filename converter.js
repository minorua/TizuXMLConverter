// (C) 2023 Minoru Akagi
// SPDX-License-Identifier: MIT
// https://github.com/minorua/TizuXMLConverter

// initialize
(function() {
    const dz = document.getElementById("dropzone");

    dz.addEventListener("click", () => {
        let btn = document.createElement("input");
        btn.type = "file";
        btn.onchange = (e) => {
            dz.style.display = "none";
            loadFiles(e.target.files);
        };
        btn.click();
    });

    dz.addEventListener("dragover", (e) => {
        e.preventDefault();
        dz.classList.add("dropready");
    });

    dz.addEventListener("dragleave", (e) => {
        dz.classList.remove("dropready");
    });

    dz.addEventListener("drop", (e) => {
        e.preventDefault();
        dz.style.display = "none";
        loadFiles(e.dataTransfer.files);
    });

    const closeBtn = document.getElementById("close");
    closeBtn.addEventListener("click", () => {
        document.getElementById("map").classList.remove("open");
        closeBtn.style.display = "none";
    });

})();

function loadFiles(files) {

    const output = document.getElementById("output");
    const progress = document.getElementById("progress"),
          progressBar = progress.getElementsByTagName("progress")[0];
    progress.style.display = "block";

    const setProgress = (p) => {
        progressBar.setAttribute("value", p);
    };

    const status = document.getElementById("status");
    const setStatusText = (text) => {

        status.innerHTML = text;

    };

    let result = Promise.resolve();

    const fileList = [];
    for (const file of files) {

        fileList.push(file);

    }

    fileList.forEach((file) => {

        const loader = new TizuXMLLoader();

        result = result.then(() => {

            setStatusText("Parsing " + file.name + "...");
            return loader.loadFile(file);

        }).then(() => {

            const p = document.createElement("p");
            p.innerHTML = file.name + " を読み込みました.";
            output.appendChild(p);

            const table = document.createElement("table");
            table.innerHTML = "<tr><th>種類</th><th>地物数</th><th>操作</th></tr>";
            output.appendChild(table);

            TZU_FEATURE_GROUPS.forEach((group) => {

                const tr = document.createElement("tr");
                tr.innerHTML = "<td>" + group.name + "</td><td>" + (loader.stats[group.name] || 0) + "</td>";
                table.appendChild(tr);

                const td = document.createElement("td");
                tr.appendChild(td);

                if (loader.stats[group.name]) {

                    let button = document.createElement("button");
                    button.innerHTML = "保存";
                    button.addEventListener("click", () => {

                        const json = JSON.stringify(loader.data[group.name], null, 2)
                        const blob = new Blob([json], {type: "application/json"});

                        const e = document.createElement("a");
                        document.body.appendChild(e);

                        e.href = window.URL.createObjectURL(blob);
                        e.download = file.name.split(".")[0] + "_" + group.name + ".json";
                        e.click();

                        document.body.removeChild(e);

                    });

                    td.appendChild(button);

                    if (typeof ol !== undefined) {

                        button = document.createElement("button");
                        button.innerHTML = "地図表示";
                        button.addEventListener("click", () => {

                            const jsonObject = loader.data[group.name];
                            showMap(jsonObject);

                        });

                        td.appendChild(button);

                    }

                }

            });

        });

    });

    result = result.then(() => {

        setStatusText("Completed!");
        setProgress(1);
        setTimeout(() => {

            progress.style.display = "none";

        }, 2000);

    });

}


let map, currentJSONLayer;

function showMap(jsonObject) {

    if (!map) {

        ol.proj.useGeographic();

        map = new ol.Map({

            layers: [
                new ol.layer.Tile({source: new ol.source.OSM()})
            ],
            view: new ol.View(),
            target: "map"

        });

    }
    else {
        map.removeLayer(currentJSONLayer);
    }

    const source = new ol.source.Vector({

        features: new ol.format.GeoJSON().readFeatures(jsonObject)

    });

    currentJSONLayer = new ol.layer.Vector({source: source});
    map.addLayer(currentJSONLayer);

    const mapElem = document.getElementById("map");
    mapElem.classList.add("open");

    const closeBtn = document.getElementById("close");
    closeBtn.style.display = "block";

    const extent = source.getExtent();
    map.getView().fit(extent, map.getSize());

}