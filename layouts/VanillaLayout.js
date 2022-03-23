import Header from '../components/alheimsins/Header'
import Footer from '../components/alheimsins/Footer'
// const util = require('util')
// console.log(`analyzing request: ${util.inspect(req)}`)

export default function VanillaLayout ({ children }) {
  // console.log(`in VanillaLayout, observing children: ${util.inspect(children)}`)
  return (
    <div className='layout-container'>
      <Header />
      <div className='main'>
        {children}
      </div>
      <Footer />
      <style jsx global>
        {`
        .layout-container {
          // display: grid;
          // grid-template-areas:
            // "header header header"
            // "content content content"
            // "footer footer footer";
            // grid-template-columns: 1fr 2fr 1fr;
          // grid-template-rows: auto 1fr auto;
          height: 100%;
          min-height: 100vh;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: 3% 1fr 3%;
          }
        }
        .main {
          // display: flex;
          // flex-flow: column;
          // justify-content: center;
          // align-items: space-between;
          // grid-area: content;
          // margin: 0% 5%;
          // padding: 0% 5%;
          // overflow: scroll;
          height: 100%;
          width: 80%;
          margin: auto;
        }
        .main a {
          color: #bd10e0;
        }
      `}
      </style>
    </div>
  )
}
