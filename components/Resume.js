import Summary from './Summary'
import Domain from './Domain'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const Resume = ({ data, chartWidth }) => {
  return (
    <Splide options={{
      width: '100vw',
      height: '90vh',
      perMove: 1,
      gap: '20rem',
      flickMaxPages: 1,
      keyboard: true
    }}
    >
      <SplideSlide style={{ overflow: 'scroll' }}>
        <div className='resume'>
          <div>
            <p>Congratulations on completing the test! Your results below are the first step towards understanding yourself so you can work with your personality (or work to change it) to grow yourself. This is meant to be used as a true mirror of how you present yourself in the world. There will be traits for which you are happy with the score and others you are not, the choice is yours to accept the results/who you are or put in the work to move the score in a direction that is more desirable for you.</p>
            <p>Interpreting results:  Your answers to the test resulted in total scores for each trait, which were then compared against the results of thousands of other individuals. The first figure displays a summary plot of your score for each of the five traits. The closer a given point is to the perimeter of the circle, the more that trait presents itself in your life as compared to others. Similarly, a point being closer to the center of the circle indicates that trait presents itself less in your life than the majority of the population.</p>
            <p>For each of the trait specific results, the figures present results in a similar fashion but with respect to each of the trait’s facets. Each figure can be viewed in as either a “Radar” or “Column” plot using the buttons in the top left of each figure, depending on your preference. In addition, your results are provided both as a raw score and as a percentage which is relative to others.</p>
          </div>
        </div>
        {data && <div className='domains'><Summary data={data} vAxis={{ minValue: 0, maxValue: 120 }} style={{ width: '100%', paddingRight: '10px' }} chartWidth={chartWidth} /></div>}
      </SplideSlide>
      {data && data.map((domain, index) => <SplideSlide key={`domain-${index}`} style={{ paddingTop: '30px' }}><Domain data={domain} key={index} chartWidth={chartWidth} /></SplideSlide>)}
      <style jsx>
        {`
          .resume {
            margin: auto;
            padding-top: 30px;
            // overflow: scroll;
            width: 90vw;
          }
          .resume-swiper .swiper-pagination {
            top: 10px;
          }
          .domains {
            box-shadow: 0 5px 5px 0 rgba(0,0,0,.16), 0 0 5px 0 rgba(0,0,0,.12);
            padding: 10px;
            text-align: left;
            margin: 20px auto;
            width: 90%;
            position: relative;
            min-width: 500px;
          }

          @media (max-width: 800px), screen and (orientation: landscape) {
            .domains {
              width: 50%;
              min-width: 300px;
              margin: 0 10px 0 0;
              padding: 0;
            }
          }

          @media (max-width: 800px), screen and (orientation: portrait) {
            .domains {
              width: 100%;
              min-width: 300px;
              margin: 0 10px 0 0;
              padding: 0;
            }
          }
          `}
      </style>
    </Splide>
  )
}

export default Resume
