// const util = require('util')
// console.log(`analyzing request: ${util.inspect(req)}`)

export default function VanillaLayout ({ children }) {
  // console.log(`in VanillaLayout, observing children: ${util.inspect(children)}`)
  return (
    <div className='container'>
      <div className='main'>
        {children}
      </div>
      <style jsx global>
        {`
        .container {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          height: 94%;
          // padding: 0 10%;
          padding: 0% 5% 0;
          overflow: scroll;
          resize: both;
        }

        .container {
          // display: grid;
          // grid-template-areas:
            // "header header header"
            // "content content content"
            // "footer footer footer";
            // grid-template-columns: 1fr 2fr 1fr;
          // grid-template-rows: auto 1fr auto;
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
          height: 100%;
          // margin: 0% 5%;
          // padding: 0% 5%;
          // overflow: scroll;
          width: 100%;
        }
        .main a {
          color: #bd10e0;
        }
      `}
      </style>
    </div>
  )
}
