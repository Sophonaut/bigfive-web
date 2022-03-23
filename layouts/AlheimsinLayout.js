import Header from '../components/alheimsins/Header'
import Footer from '../components/alheimsins/Footer'
const util = require('util')
// console.log(`analyzing request: ${util.inspect(req)}`)

export default function AlheimsinLayout ({ children }) {
  console.log(`in AlheimsinLayout, observing children: ${util.inspect(children)}`)
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
          display: grid;
          grid-template-areas:
            "header header header"
            "content content content"
            "footer footer footer";
            grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
          // margin: 0% 5%;
          // padding: 0% 5%;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: 3% 1fr 3%;
          }
        }
        .main {
          grid-area: content;
          width: 80%;
          height: 100%;
          margin: auto;
          // overflow: scroll;
        }
        .main a {
          color: #bd10e0;
        }
      `}
      </style>
    </div>
  )
}
