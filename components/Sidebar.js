const Sidebar = ({ props, setActive }) => {
  function handleClick (event) {
    event.preventDefault()
    setActive(event.target.className.split(' ').slice(-1)[0])
  }

  return (
    <div className='sidebar'>
      <p><b><u>Profile Options</u></b></p>
      <ul>
        <li className='dashboard' onClick={handleClick}>Dashboard</li>
        <li className='invitations' onClick={handleClick}>Invitations</li>
        <li className='settings' onClick={handleClick}>User Settings</li>
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
