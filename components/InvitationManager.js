import InviteShare from './InviteShare'
import InviteList from './InviteList'

const InvitationManager = () => {
  return (
    <div className='container'>
      <InviteShare />
      <hr />
      <InviteList />
      <style jsx>
        {`
        .container {
          display: flex;
          flex-flow: column;
        }

        hr {
          width: 100%;
          color: #000;
          border-top: #333;
          border-left: #fff;
        }

        hr:after {
          background: #999;
        }
      `}
      </style>
    </div>
  )
}

export default InvitationManager
