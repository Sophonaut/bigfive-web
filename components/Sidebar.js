const Sidebar = ({ props, setActive, setTitle }) => {
  function handleClick (event) {
    event.preventDefault()
    setActive(event.target.className.split(' ').slice(-1)[0])
    setTitle(event.target.innerText)
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
        min-width: 150px;
        padding: 22px 0px 0px 22px;
        display: flex;
        flex-flow: column;
        align-items: center;
      }

      .sidebar > * {
        text-align: center;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      
      li {
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;
      }

      li:hover {
        background-color: #ddd;
        animation: ease-in 0.5s;
      }

      p {
        margin: 0;
        text-align: left;
        padding-bottom: 5px;
      }
      `}
      </style>
    </div>
  )
}

export default Sidebar
