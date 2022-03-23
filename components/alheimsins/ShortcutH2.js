import { Link } from '../../routes'
import { FaLink } from 'react-icons/fa'

const ShortcutH2 = ({ name }) =>
  <h2>
    <Link route={'#' + name.toLowerCase()}>
      <a id={name.toLowerCase()}>{name}<i className='shortcut'> <FaLink size={10} /></i></a>
    </Link>
    <style jsx>
      {`
      h2 {
        margin-top: 0;
      }
      h2 a {
        color: unset;
        text-transform: capitalize;
      }
      h2 a:hover {
        color: black;
      }
      .shortcut {
        visibility: hidden;
        color: #909090;
      }
      h2 a:hover .shortcut {
        visibility: visible;
      }
    `}
    </style>
  </h2>

export default ShortcutH2
