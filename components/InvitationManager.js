import { Button } from './alheimsins'
import InviteShare from './InviteShare'

const InvitationManager = () => {
  return (
    <div className='container'>
      <InviteShare />

      <h2>Manage Results Sharing</h2>
      <div className='invitation'>
        <p>test@gmail.com</p>
        <div className='buttons'>
          <Button type='submit' value='Share' width='80px' />
          <Button type='submit' value='Decline' width='80px' />
        </div>
      </div>
      <style jsx>
        {`
        .container {
          display: flex;
          flex-flow: column;
        }

        .invitation {
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          align-items: center;
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
    </div>
  )
}

export default InvitationManager
