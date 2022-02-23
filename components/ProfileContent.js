import Summary from './Summary'

const ProfileContent = ({ results, chartWidth }) => {
  return (
    <div className='main-content'>
      {results && <div className='domains' style={{ width: (chartWidth * 0.667) - (window.innerWidth * 0.1) }}><Summary data={results} vAxis={{ minValue: 0, maxValue: 120 }} chartWidth={chartWidth} /></div>}
      <style jsx>
        {`
        .main-content {
          background: coral !important;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .domains {
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          margin-top: 10px;
          padding: 10px;
          text-align: left;
          justify-self: center;
        }
        `}
      </style>
    </div>
  )
}

export default ProfileContent
