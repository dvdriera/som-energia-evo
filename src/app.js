import m from "mithril";

import './app.scss';

import SomEnergiaData from "./models/SomEnergiaData";
import EvolutionCardMetric from "./views/EvolutionCardMetric";
import Chart from "./views/Chart"

const metricContractes = 'contracts';
const metricSocis = 'members';
var metricFilter = metricContractes;

const EvolutionChart = {
    view: (vnode) => {
        return m("div.col.s12", 
        m("div.card", 
          m("div.card-content",
            [
              m("div.card-title",
                [
                  m("div.col.m6.s12", 
                    "Gràfic evolució del número de " + (vnode.attrs.metric === metricContractes ? "contractes" : "socis")
                  ),
                  m("div.col.m6.s12.right-align",
                    [
                      m("label",
                        [
                          m(`input[name='metric'][type='radio'][value='${metricContractes}']${vnode.attrs.metric === metricContractes ? '[checked]':''}`,
                            { onchange: (ev) => { SomEnergiaData.loadData(ev.target.value); } }),
                          m("span", 
                            "Contractes"
                          )
                        ]
                      ),
                      m("label",
                        [
                            m(`input[name='metric'][type='radio'][value='${metricSocis}']${vnode.attrs.metric === metricSocis ? '[checked]':''}`,
                            { onchange: (ev) => { SomEnergiaData.loadData(ev.target.value); } }),
                          m("span", 
                            "Socis"
                          )
                        ]
                      )
                    ]
                  )
                ]
              ),
              m("div.chart-wrapper", 
                m(Chart, vnode.attrs 
                )
              )
            ]
          )
        )
      )
    }
}

const Evolution = {
    oninit: SomEnergiaData.loadData(metricFilter),
    view: () => {
        return m("div.row",
            [
                m("div.col.s12", 
                    m("h4", "Evolució dels socis i contractes de la Garrotxa")
                ),
                m(EvolutionCardMetric, { metric: "contractes", value: "373", perc: "7" }),
                m(EvolutionCardMetric, { metric: "socis", value: "259", perc: "3" }),
                m(EvolutionChart, SomEnergiaData)
            ]
        )
    }
}   
 
m.mount(document.getElementById('app'), Evolution);
