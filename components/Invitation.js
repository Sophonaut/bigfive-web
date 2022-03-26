import { Button } from './alheimsins'

const Invitation = ({ createdBy, handleSubmit, setIndex, setBool, index }) => {
  return (
    <>
      <form index={index} className='invitation' onSubmit={(e) => { handleSubmit(e) }}>
        <p>{createdBy}</p>
        <div className='buttons'>
          <Button type='button' value='Share' width='80px' onClick={() => { setIndex(index); setBool(true) }} />
          <Button type='button' value='Decline' width='80px' onClick={() => { setIndex(index); setBool(false) }} />
        </div>
      </form>
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
