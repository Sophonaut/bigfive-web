import Header from '../components/alheimsins/Header'
import Footer from '../components/alheimsins/Footer'

export default function VanillaLayout ({ children }) {
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
          height: 100%;
          min-height: 100vh;
          min-width: 100%;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: 3% 1fr 3%;
          }
        }
        .main {
          height: 100%;
          margin: auto;
          min-height: 80vh;
          width: 80%;
        }
        .main a {
          color: #bd10e0;
        }
      `}
      </style>
    </div>
  )
}
