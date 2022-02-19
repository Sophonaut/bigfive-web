import Summary from './Summary'
import Domain from './Domain'

const Resume = ({ data, chartWidth }) => {
  return (
    <div>
      {data && <div className='domains'><Summary data={data} vAxis={{ minValue: 0, maxValue: 120 }} chartWidth={chartWidth} /></div>}
      {data && data.map((domain, index) => <Domain data={domain} key={index} chartWidth={chartWidth} />)}
      <style jsx>
        {`
          .domains {
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
            margin-top: 10px;
            padding: 10px;
            text-align: left;
          }
        `}
      </style>
    </div>
  )
}

export default Resume
