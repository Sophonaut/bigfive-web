import { Component } from 'react'
import Summary from './Summary'
import { ShortcutH2, ShortcutH1 } from './alheimsins'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const Facet = ({ data }) => (
  <>
    <ShortcutH2 name={data.title} />
    <p>Score: {data.score}/20 - {data.scoreText}</p>
    <p><span dangerouslySetInnerHTML={{ __html: data.text }} /></p>
  </>
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleReadMore = this.handleReadMore.bind(this)
  }

  handleReadMore (e) {
    const name = e.currentTarget.getAttribute('name')
    const action = !this.state[name] || this.state[name] === 'none'
    this.setState({ [name]: action })
  }

  cleanUpAverage (average) {
    return Number(average.toPrecision(3))
  }

  render () {
    const { data, chartWidth } = this.props
    return (
      <Splide
        options={{
          direction: 'ttb',
          height: '85vh',
          gap: '30rem',
          autoWidth: true,
          hasSliderWrapper: true,
          perMove: 1,
          flickMaxPages: 1,
          keyboard: true,
          drag: false
        }}
        style={{ paddingTop: '30px' }}
      >
        {/* <div className='splide__slider'> */}
        <SplideSlide style={{ overflow: 'scroll' }}>
          <div className='domain-description'>
            <ShortcutH1 name={data.title} />
            <p><em>{data.shortDescription}</em></p>
            <p>Score: {data.score}/120 - {data.scoreText} with and average score for {data.title} of {this.cleanUpAverage(data.average)}</p>
            <p>You are express {data.title} more than {data.percentile[0]} percent of the population</p>
            <p><strong>{data.text}</strong></p>
            <p>
              {
                this.state[data.domain]
                  ? <><span dangerouslySetInnerHTML={{ __html: data.description }} /><br /><br /><span name={data.domain} onClick={this.handleReadMore} style={{ cursor: 'pointer' }}><a>read less</a></span></>
                  : <><span dangerouslySetInnerHTML={{ __html: data.description.substring(0, 100) }} /><span name={data.domain} onClick={this.handleReadMore} style={{ cursor: 'pointer' }}>... <a>read more</a> ({data.description.split(' ').length} words)</span></>
              }
            </p>
          </div>
        </SplideSlide>
        <SplideSlide style={{ overflow: 'scroll', paddingTop: '20px' }}>
          {data && data.facets && <div className='wrapper'><Summary data={data.facets} vAxis={{ minValue: 0, maxValue: 20 }} title={data.title} chartWidth={chartWidth} /></div>}
        </SplideSlide>
        <SplideSlide style={{ overflow: 'scroll', paddingTop: '20px', paddingBottom: '70px', height: '100%' }}>
          <div className='facet-list'>
            {data && data.facets && data.facets.map((facet, index) => <Facet data={facet} key={index} />)}
          </div>
        </SplideSlide>
        {/* </div> */}
        <style jsx>
          {`
              span {
                margin-right: 10px;
              }
              .wrapper {
                box-shadow: 0 5px 5px 0 rgba(0,0,0,.16), 0 0 5px 0 rgba(0,0,0,.12);
                margin-top: 20px;
                padding: 10px;
                text-align: left;
                margin: auto;
                width: 90%;
                position: relative;
                padding-bottom: 100px;
                overflow: scroll;
              }
              .vertical-splide-wrapper {
                padding-top: 30px;
              }
              .domain-description, .facet-list {
                width: 100%;
                margin: auto;
              }
              `}

        </style>
      </Splide>
    )
  }
}
