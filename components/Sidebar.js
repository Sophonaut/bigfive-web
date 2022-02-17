const Sidebar = ({ props }) => {
  return (
    <div className='sidebar'>
      <p><b><u>Profile Options</u></b></p>
      <ul>
        <li>Dashboard</li>
        <li>Invitations</li>
        <li>User Settings</li>
      </ul>
      <style jsx>
        {`
      .sidebar {
        background: cyan !important;
        min-width: 150px;
        padding: 22px 0px 0px 22px;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      li {
        text-align: left;
        padding-top: 10px;
      }

      p {
        margin: 0;
        text-align: left;
      }
      `}
      </style>
    </div>
  )
}

export default Sidebar
