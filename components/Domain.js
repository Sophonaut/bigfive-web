import { Component } from 'react'
import Summary from './Summary'
import { ShortcutH2, ShortcutH1 } from './alheimsins'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

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
      <>
        <Swiper
          autoHeight
          className='domain-swiper'
          direction='vertical'
          loopFillGroupWithBlank
          modules={[Pagination]}
          pagination
          slidesPerView={1}
          spaceBetween={0}
        >
          <SwiperSlide key={data.title} className='domain-wrapper'>
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
          </SwiperSlide>
          <SwiperSlide key={`${data.title}-chart`} className='domain-slide'>
            {data && data.facets && <div className='wrapper'><Summary data={data.facets} vAxis={{ minValue: 0, maxValue: 20 }} title={data.title} chartWidth={chartWidth} /></div>}
          </SwiperSlide>
          <SwiperSlide key={`${data.title}-facets`}>
            {data && data.facets && data.facets.map((facet, index) => <Facet data={facet} key={index} />)}
          </SwiperSlide>
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
              }
            `}
          </style>
        </Swiper>
      </>
    )
  }
}
