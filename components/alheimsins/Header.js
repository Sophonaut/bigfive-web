import Link from './Link'
import Router from 'next/router'
import { authenticationService } from '../../lib/auth.service'
// import { useToken } from '../../hooks/token'
import { TokenContext } from '../../hooks/token'
import { useContext } from 'react'

const handleLogout = (setToken) => {
  authenticationService.logout()
  setToken('')
  Router.push('/buy')
}

const Header = ({ user, info }) => {
  const { token, setToken } = useContext(TokenContext)
  return (
    <>
      <header>
        <div className='nav-container'>
          <div className='links-container'>
            {user
              ? (
                <div>
                  <a href='https://sophonaut.com'>HOME</a>
                  <Link route='/test-prep' activeClassName='active'><a>TEST</a></Link>
                  <Link route='/result' activeClassName='active'><a>RESULT</a></Link>
                  <Link route='/compare' activeClassName='active'><a>COMPARE</a></Link>
                </div>
              )
              : (
                <div>
                  <a href='https://sophonaut.com'>HOME</a>
                  <Link route='/buy' activeClassName='active'><a>PURCHASE</a></Link>
                </div>
              )}
          </div>
          <div className='nav-right'>
            {user
              ? (
                <div>
                  <Link route='/profile' params={token} activeClassName='active'><a>PROFILE</a></Link>
                  <span onClick={() => handleLogout(setToken)} className='active'><a>LOGOUT</a></span>
                </div>
              )
              : (
                <div>
                  <Link route='/signup' activeClassName='active'><a>LOGIN</a></Link>
                </div>
              )}
          </div>
          {info && <div className='nav-info'>{info}</div>}
        </div>
        <style jsx>
          {`
            header {
              grid-area: header;
              justify-self: center;
              background: white;
              margin: auto;
              padding: 25px;
              max-width: 900px;
            }
            .nav-info {
              position: absolute;
              font-size: 12px;
              left: 10%;
            }
            .links-container, .nav-container {
              display: inline-block;
            }
            .nav-right {
              right: 20px;
              position: absolute;
              display: inline-block;
              font-size: 12px;
            }
            a {
              color: #999;
              padding: 10px;
              font-size: 12px;
            }
            a:hover {
              color: black;
            }
            .active {
              color: black !important;
            }
            @media screen and (max-width: 800px) {
              .nav-right {
                display: none;
              }
            }
          `}
        </style>
      </header>
    </>
  )
}

export default Header
