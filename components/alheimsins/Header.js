import Link from 'next/link'
import Router from 'next/router'
import { authenticationService } from '../../lib/auth.service'
import { TokenContext } from '../../hooks/token'
import { useContext } from 'react'
import { clearItems } from '../../lib/localStorageStore'

const handleLogout = (setToken) => {
  authenticationService.logout()
  setToken('')
  clearItems()
  Router.push('/buy')
}

const Header = ({ info }) => {
  const { token, setToken } = useContext(TokenContext)
  return (
    <>
      <header>
        <div className='nav-container'>
          <div className='links-container'>
            {token
              ? (
                <div>
                  <a href='https://sophonaut.com'>HOME</a>
                  {token && Object.keys(token).length > 0
                    ? (
                      <>
                        <Link href='/test-prep' activeClassName='active'><a>TEST</a></Link>
                        <Link href='/result' activeClassName='active'><a>RESULT</a></Link>
                        <Link href='/compare' activeClassName='active'><a>COMPARE</a></Link>
                      </>
                    )
                    : (<></>)}
                </div>
              )
              : (
                <div>
                  <a href='https://sophonaut.com'>HOME</a>
                  <Link href='/buy' activeClassName='active'><a>PURCHASE</a></Link>
                </div>
              )}
          </div>
          <div className='nav-right'>
            {token && Object.keys(token).length > 0
              ? (
                <div>
                  <Link href='/profile' params={token} activeClassName='active'><a>PROFILE</a></Link>
                  <span onClick={() => handleLogout(setToken)} className='active'><a>LOGOUT</a></span>
                </div>
              )
              : (
                <div>
                  <Link href='/signup' activeClassName='active'><a>LOGIN</a></Link>
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
              padding: 25px 0;
              max-width: 100%;
              width: 100%;
            }

            .nav-info {
              font-size: 12px;
              left: 10%;
            }

            .nav-container {
              display: flex;
              flex-flow: row;
              justify-content: space-between;
              align-items: baseline;
              width: 100%;
              min-width: 100%;
              max-width: 100%;
            }

            .links-container {
              justify-self: flex-start;
            }

            .links-container, .nav-right {
              display: flex;
              padding-left: 20px;
            }

            .nav-right {
              padding-right: 20px;
              display: flex;
              font-size: 12px;
              align-items: baseline;
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
                // display: none;
              }
            }
          `}
        </style>
      </header>
    </>
  )
}

export default Header
