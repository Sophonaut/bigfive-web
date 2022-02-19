import Resume from './Resume'

const ProfileContent = ({ results, chartWidth }) => {
  console.log(`logging results from ProfileContent: ${JSON.stringify(results)}`)
  return (
    <div className='main-content'>
      <Resume data={results} chartWidth={chartWidth} />
      <style jsx>
        {`
        .main-content {
          background: coral !important;
        }
        `}
      </style>
    </div>
  )
}

export default ProfileContent
