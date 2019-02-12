import m from "mithril";
import * as d3 from "d3";

const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const metricContractes = 'contracts';
const metricSocis = 'members';
var metricFilter = metricContractes;

var vchart = {};

const Chart = {
    oncreate: function(vnode) {
        vchart = d3.select(vnode.dom)
            .append("svg")
            .attr("width", width + margin*2)
            .attr("height", height + margin*2)
            .attr("preserveAspectRatio", "xMidYMin meet");
    },
    draw: function(vnode) {

        if( !(Object.keys(vchart).length === 0 && vchart.constructor === Object) ){

            const data = vnode.attrs.data;

            vchart.selectAll("*").remove();

            const chart = vchart.append("g")
            .attr("transform", `translate(${margin}, ${margin})`);   

            const yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data.map((d) => d.value))]);

            const xScale = d3.scaleBand()
                .range([0, width])
                .domain(data.map((d)=> d.date))
                .padding(0.4)

            chart.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

            const makeYLines = () => d3.axisLeft()
            .scale(yScale);

            chart.append('g')
                .attr('class', 'grid')
                .call(makeYLines()
                  .tickSize(-width, 0, 0)
                  .tickFormat('')
                );
          
            const barGroups = chart.selectAll()
                .data(data)
                .enter()
                .append('g')
          
            barGroups
                .append('rect')
                .attr('class', 'bar lime accent-3')
                .attr('x', (g) => xScale(g.date))
                .attr('y', (g) => yScale(g.value))
                .attr('height', (g) => height - yScale(g.value))
                .attr('width', xScale.bandwidth())
                .on('mouseenter', function (actual, i) {
                  d3.selectAll('.value')
                    .attr('opacity', 0)
          
                  d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a) => xScale(a.date) - 5)
                    .attr('width', xScale.bandwidth() + 10)
          
                  const y = yScale(actual.value)
          
                  const line = chart.append('line')
                    .attr('id', 'limit')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', width)
                    .attr('y2', y)
          
                  barGroups.append('text')
                    .attr('class', 'divergence')
                    .attr('x', (a) => xScale(a.date) + xScale.bandwidth() / 2)
                    .attr('y', (a) => yScale(a.value) + 30)
                    //.attr('fill', 'white')
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                      const divergence = (a.value - actual.value)
                      
                      let text = ''
                      if (divergence > 0) text += '+'
                      text += `${divergence}`
          
                      return idx !== i ? text : '';
                    })
          
                })
                .on('mouseleave', function () {
                  d3.selectAll('.value')
                    .attr('opacity', 1)
          
                  d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => xScale(a.date))
                    .attr('width', xScale.bandwidth())
          
                  chart.selectAll('#limit').remove()
                  chart.selectAll('.divergence').remove()
                });
          
            barGroups.append('text')
                .attr('class', 'value')
                .attr('x', (a) => xScale(a.date) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value) + 30)
                .attr('text-anchor', 'middle')
                .text((a) => `${a.value}`);
              
            chart.append('text')
                .attr('class', 'label')
                .attr('x', -(height / 2) - margin)
                .attr('y', -15)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text(`Num. de ${(vnode.attrs.metric === metricContractes ? "contractes" : "socis")}`);
        }
    },
    view: function(vnode) {
        return m("div.svg-container[id='chart']", Chart.draw(vnode));
    }
}

export default Chart;