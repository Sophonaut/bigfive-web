import { Button } from './alheimsins'

const Invitation = ({ createdBy, handleSubmit, idx }) => {
  return (
    <>
      <div className='invitation'>
        <p>{createdBy}</p>
        <div className='buttons'>
          <Button idx={idx} type='submit' value='Share' width='80px' onClick={() => handleSubmit(idx, true)} />
          <Button idx={idx} type='submit' value='Decline' width='80px' onClick={() => handleSubmit(idx, false)} />
        </div>
      </div>
      <style jsx>
        {`
        .invitation {
          display: flex !important;
          flex-flow: row;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }

        .buttons {
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          align-items: center;
          width: 25%;
          min-width: 170px;
        }
      `}
      </style>
    </>
  )
}

export default Invitation
