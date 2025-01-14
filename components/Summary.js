import { Component } from 'react'
import { Chart } from 'react-google-charts'
import RadarChart from './RadarChart'
import { Loading } from './alheimsins'

const COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC'
]

const prepareData = data =>
  data.map((item, i) => {
    return [item.title, item.score, COLORS[i]]
  })

const ColumnChart = ({ title, data, vAxis, chartWidth }) => (
  <Chart
    chartType='ColumnChart'
    style={{ width: '100%', paddingTop: '10px', minWidth: '300px' }}
    data={[
      [{ type: 'string' }, { type: 'number' }, { role: 'style' }],
      ...prepareData(data)
    ]}
    options={{ vAxis, legend: 'none' }}
    width={chartWidth}
    height='500px'
    graph_id={title}
    loader={<Loading />}
  />
)

const renderCharts = (chartType, props) => {
  switch (chartType) {
    case 'ColumnChart': return <ColumnChart {...props} />
    case 'RadarChart': return <RadarChart {...props} />
    default: return <RadarChart {...props} />
  }
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: 'RadarChart'
    }
  }

  render () {
    const { chart } = this.state
    return (
      <div className='chart-container'>
        <div className='pick-chart'>
          <span onClick={() => this.setState({ chart: 'RadarChart' })} className={chart === 'RadarChart' ? 'chart selected' : 'chart'}>Radar</span>
          <span onClick={() => this.setState({ chart: 'ColumnChart' })} className={chart === 'ColumnChart' ? 'chart selected' : 'chart'}>Column</span>
        </div>
        {
          renderCharts(chart, this.props)
        }
        <style jsx>
          {`
            .pick-chart {
              z-index: 99999;
              min-width: 60vw;
            }
            .chart {
              cursor: pointer;
              margin-left: 4px;
              padding: 5px;
            }
            .selected {
              background-color: rgb(230, 230, 230);
              border-radius: 10px;
            } 

            
            @media (max-width: 500px) {
              .chart-container {
                width: 90% !important;
                min-width: 90% !important;
                height: 100%;
                padding: 0;
              }
            }

            @media (max-width: 400px)  {
              .chart-container {
                width: 90% !important;
                min-width: 90% !important;
                height: 100%;
                padding: 0;
              }
            }
          `}
        </style>
      </div>
    )
  }
}
