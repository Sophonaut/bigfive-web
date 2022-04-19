import { Component, Fragment } from 'react'
import Summary from '../components/SummaryCompare'
// import Summary from '../components/Summary'
import SocialShare from '../components/SocialShare'
import { ShortcutH1, Layout } from '../components/alheimsins'
import repackResults from '../lib/repack-results'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
import base64url from '../lib/base64url'
import http from '../config/axiosConfig'

import AlheimsinLayout from '../layouts/AlheimsinLayout'

/**
 * Right now, this takes the people array built up from compare.js and pushes it to this file,
 * obtaining the result one at a time and returning data objects for the comparison to be processed.
 * The processing function might work for us if we pass data the correct way, but it might be better
 * to rewrite the structure here for score processing.
 *
 * @param {*} id
 * @returns
 */
const getCompareFromId = async id => {
  // passes the people from compare to showCompare via { id }
  const people = base64url.decode(id)
  const formattedId = formatId(people.compareUser._id)
  if (!validMongoId(formattedId)) throw new Error('Invalid id')

  let { data } = await http.get(`/api/user/result/${formattedId}`)
  data = data.result

  // packing current user data with retrieved
  const compareUser = { name: people.compareUser.email, data }
  const scores = [people.currentUser, compareUser]
  console.log(scores)

  return repackResults(scores, scores[0].data.lang)
}

const Comparison = ({ data, chartWidth }) => {
  const header = data[0].scores.map(({ title }) => ({ label: title, type: 'number' }))
  const domainScores = data.map(result => ([result.title, ...result.scores.map(({ score }) => score)]))
  const domains = data.map(result => ({ title: result.title, description: result.description }))
  const facets = data.map(({ facets }) => ([...facets]))
  const getFacetScores = i => facets[i].map(({ title, scores }) => [title, ...scores.map(({ score }) => score)])
  return (
    <>
      <h1>Overview</h1>
      <Summary data={domainScores} header={header} vAxis={{ minValue: 24, maxValue: 120 }} chartWidth={chartWidth} title='domain' />
      {
        domains.map((domain, i) => (
          <Fragment key={i}>
            <ShortcutH1 name={domain.title} />
            <p>{domain.description}</p>
            <Summary data={getFacetScores(i)} header={header} vAxis={{ minValue: 4, maxValue: 20 }} chartWidth={chartWidth} title={domain.title} />
          </Fragment>
        ))
      }
    </>
  )
}

export default class showCompare extends Component {
  static async getInitialProps ({ query }) {
    if (query.id) {
      const comparison = await getCompareFromId(query.id)
      return { comparison }
    }
    return {}
  }

  constructor (props) {
    super(props)
    this.state = {
      chartWidth: 600
    }
    this.getWidth = this.getWidth.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.getWidth)
    if (this.props.comparison) {
      this.setState({ comparison: this.props.comparison })
    }
    this.getWidth()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  getWidth () {
    const chartWidth = window.innerWidth * 0.8
    this.setState({ chartWidth })
  }

  render () {
    const { comparison, chartWidth } = this.state
    const { id } = this.props.query
    const currentUrl = URL + '/compare/' + id
    return (
      <>
        <h2>Compare</h2>
        {
          comparison &&
            <>
              <SocialShare url={currentUrl} />
              <Comparison data={comparison} chartWidth={chartWidth} />
              <SocialShare url={currentUrl} />
            </>
        }
      </>
    )
  }
}

showCompare.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}
