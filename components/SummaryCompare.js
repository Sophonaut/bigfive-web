// import RadarChart from './RadarChart'
import { Radar } from 'react-chartjs-2'

const SummaryCompare = ({ title, data, header, vAxis, chartWidth }) => {
  /*
    The way that data is flowing into SummaryCompare differs pretty starkly different
    from the way that RadarChart handles data; we're splitting the data into arrays of
    ["label", user_1_data, user_2_data] rather than datasets with facets, counts, scores
    and additional metadata. This additional processing helps to unpack and format the
    compared user scores in the same way that RadarChart expects them, but skips passing
    them through RadarChart which adds some code reuse.
  */

  const options = {
    legend: {
      position: 'top',
      labels: {
        fontSize: 14
      }
    },
    title: {
      display: false,
      text: 'Big Five Personality'
    },
    scale: {
      reverse: false,
      gridLines: {
        circular: true
      },
      pointLabels: {
        fontSize: 14
      },
      ticks: {
        beginAtZero: true,
        max: 1
      }
    }
  }

  /*

  */
  const labels = data.map(array => array[0])

  /*
    label: String
    data: [Number]
    backgroundColor: rgba(0,0,0,0)
    borderColor: rgba(0,0,0,0)
    borderWidth: 1
  */
  const datasets = [
    // User 1 data
    {
      label: header[0].label,
      data: data.map(array => array[1] / (vAxis.minValue * 5)),
      backgroundColor: 'rgba(245, 43, 57, 0.25)',
      borderColor: 'rgba(245, 43, 57, 0.75)',
      borderWidth: 1
    },
    // User 2 data
    {
      label: header[1].label,
      data: data.map(array => array[2] / (vAxis.minValue * 5)),
      backgroundColor: 'rgba(12, 43, 199, 0.25)',
      borderColor: 'rgba(12, 43, 199, 0.75)',
      borderWidth: 1
    }
  ]

  datasets.forEach(dataset => { console.log(JSON.stringify(dataset)) })

  return (
    <>
      {/* {console.log(`
      title: ${title}
      data: ${JSON.stringify(data)}
      header: ${JSON.stringify(header)}
      vAxis: ${JSON.stringify(vAxis)}
      chartWidth: ${chartWidth}
      `)}
      <Chart
        chartType='ColumnChart'
        style={{ width: '90vw' }}
        data={[['domain', ...header], ...data]}
        options={{ vAxis }}
        width={chartWidth}
        height='500px'
        graph_id={title}
        legend_toggle
        loader={<Loading />}
      /> */}

      <div>
        <Radar
          width={15}
          height={15}
          data={{ datasets: datasets, labels: labels }}
          options={options}
          chartWidth={chartWidth}
        />
      </div>
    </>
  )
}

export default SummaryCompare
