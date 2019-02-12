// src/models/SomEnergiaData.js
import m from "mithril";
import jsyaml from "js-yaml";
import dateFormat from "dateformat";

const apiURL = "https://opendata.somenergia.coop/v0.2/";
const geoLevel = "by/ccaa/";
const now = new Date();
const yearAgo = new Date().setFullYear( now.getFullYear() - 1);
const time = `monthly/from/${dateFormat(yearAgo, "yyyy-mm-dd")}/to/${dateFormat(now, "yyyy-mm-dd")}?`;

const InesGarrotxa = [
    17010,17019,17021,17046,17098,17105,17109,17114,17133,17139
    ,17149,17154,17183,17161,17162,17165,17185,17184,17200,17207,17208
]; 

const filter = `city=${InesGarrotxa.join("&city=")}`;

var defaultMetric = "contracts";

// https://opendata.somenergia.coop/v0.2/contracts/by/ccaa/monthly/from/2018-01-01/to/2019-01-01?&city=17010&city=17019&city=17021&city=17046&city=17098&city=17105&city=17109&city=17114&city=17133&city=17139&city=17149&city=17154&city=17183&city=17161&city=17162&city=17165&city=17185&city=17184&city=17200&city=17207&city=17208

var SomEnergiaData = {
    data: [],
    metric: defaultMetric,
    loadData: (param = defaultMetric) => {
        const metricFilter = `${param}/`;
        SomEnergiaData.metric = param;

        console.log('SomEnergiaData :: loadData :: ' + param);

        return m.request({
            method: "GET",
            url: apiURL + metricFilter + geoLevel + time +  filter,
            deserialize: jsyaml.load,
            withCredentials: true,
        })
        .then(function(result) {
            SomEnergiaData.data = [];
            for( const [i, data] of result.dates.entries() ){
                const item = {
                    'date' : dateFormat(new Date(data), "mmm yy"),
                    'value' : result.values[i]
                };
                SomEnergiaData.data.push(item);
            }
        })
    }
}

export default SomEnergiaData;
