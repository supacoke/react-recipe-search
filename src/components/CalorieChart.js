import React, { Component } from 'react';
import { Pie } from 'react-chartjs'

/**
 * Display the calorie chart
 */
export default class CalorieChart extends Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        percentageInnerCutout : 20,
        animationSteps : 80,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>",
      }
    }
  }

  componentDidMount() {
    var legend = this.refs.chart.getChart().generateLegend();
    this.setState({
      legend: legend
    });
  }

  render() {
    var legend = this.props.chartData.map( (data, i) => 
      <li key={i}><span className="legend-color-box" style={{ backgroundColor:data.color,width:"20px",height:"20px",display:"inline-block" }}></span> { data.label }</li>
    );

    return (
      <div>
          <div className="text-header">Calorie Breakdown</div>
          <Pie ref="chart" data={this.props.chartData} options={this.state.chartOptions} />
          <ul style={{listStyle:"none",padding:"0"}}>
            {legend}
          </ul>
      </div>
    )
  }
}