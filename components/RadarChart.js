import { Radar } from 'react-chartjs-2'

const options = {
  legend: {
    position: 'top',
    labels: {
      fontSize: 14
    }
  },
  title: {
    display: true,
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
  },
  layout: {
    padding: {
      left: 10
    }
  },
  maintainAspectRatio: true
}
// const data = {
//   labels: [
//     "Openness",
//     "Conscientiousness",
//     "Extraversion",
//     "Agreeableness",
//     "Neuroticism"
//   ],
//   datasets: [
//     {
//       label: 'My Personality',
//       backgroundColor: "rgba(139,0,213,0.4)",
//       pointBackgroundColor: "rgba(220,220,220,1)",
//       data: [
//         0.5,
//         0.8,
//         0.3,
//         0.5,
//         0.3
//       ]
//     }
//   ]
// }

const setColor = title => {
  const darkBlue = 'rgba(24,41,118,0.8)'
  const red = 'rgba(255,5,50,0.8)'
  const green = 'rgba(46,173,86,0.8)'
  const blue = 'rgba(34,118,220,0.8)'
  const brown = 'rgba(118,19,19,0.8)'
  const yellow = 'rgba(250,255,45,0.8)'

  switch (title) {
    case 'Openness To Experience':
      return blue
    case 'Agreeableness':
      return green
    case 'Neuroticism':
      return red
    case 'Conscientiousness':
      return brown
    case 'Extraversion':
      return yellow
    default:
      return darkBlue
  }
}

const processData = props => {
  const title = props.title ? props.title : 'Personality Traits'
  const color = setColor(title)
  const facetDataCopy = props.data
  const labels = facetDataCopy.map(facet => {
    let facetTitleCopy = facet.title
    console.log(`${JSON.stringify(facet)}`)
    if (window.innerWidth < 400) {
      facetTitleCopy = facet.facet || facet.title
      console.log(facetTitleCopy)
    } else if (window.innerWidth < 800) {
      if (!facetTitleCopy.includes('Openness To Experience')) {
        if (facetTitleCopy.includes('Openness ')) {
          facetTitleCopy = facetTitleCopy.split(' ')[2]
        }
        if (facetTitleCopy.includes('ness')) {
          facetTitleCopy = facetTitleCopy.split('').slice(0, -4).join('')
        }
      }
    }
    return facetTitleCopy
  })
  const dataset = props.data.map(facet => {
    return facet.score / (5 * facet.count)
  })

  // var r = () => Math.random() * 256 >> 0
  // var color = `rgb(${r()}, ${r()}, ${r()})`

  return {
    labels: labels,
    datasets: [
      {
        label: title,
        backgroundColor: color,
        pointBackgroundColor: color,
        borderColor: color,
        data: dataset
      }
    ]
  }
}

const RadarChart = (props) => {
  return (
    <div>
      <Radar
        width={20}
        height={20}
        data={processData(props)}
        options={options}
      />
    </div>
  )
}
export default RadarChart
