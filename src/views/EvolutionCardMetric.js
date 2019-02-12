import m from "mithril";

const EvolutionCardMetric = {
    view: (vnode) => {
        return m("div.col.m6.s12", 
        m("div.card.horizontal",
          [
            m("div.card-stacked", 
              m("div.card-metrics", 
                m("div.card-metric",
                  [
                    m("div.card-metric-title", 
                      "Número de " + vnode.attrs.metric
                    ),
                    m("div.card-metric-value", 
                        vnode.attrs.value
                    ),
                    m("div.card-metric-change",
                      [
                        m("i.material-icons.left", 
                          "keyboard_arrow_up"
                        ),
                        vnode.attrs.perc + "%"
                      ]
                    )
                  ]
                )
              )
            ),
            m("div.card-content", 
            )
          ]
        )
      );        
    }
}

export default EvolutionCardMetric;