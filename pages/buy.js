import Checkout from '../components/Checkout'
import { Layout } from '../components/alheimsins'
import AlheimsinLayout from '../layouts/AlheimsinLayout'

export default function Buy () {
  return (
    <>
      <Checkout />
    </>
  )
}

Buy.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}
