import Sidebar from '../components/Sidebar'
import ProfileContent from '../components/ProfileContent'

const Profile = ({ props }) => {
  return (
    <>
      <h2>Profile</h2>
      <div className='profile-container'>
        {/* <div className="main"> */}
        <Sidebar className='sidebar' />
        <ProfileContent className='main' />
        {/* </div> */}
        <style jsx>
          {`
          .profile-container {
            display: grid;
            grid-template-columns: 0.5fr 2.5fr;
            min-height: 100vh;
            gap: 10px;
          }

          .sidebar {
            grid-column: 1;
          }

          .main {
            grid-column: 2;
          }
          `}
        </style>
      </div>
    </>
  )
}

export default Profile
