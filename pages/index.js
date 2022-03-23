import { Router } from '../routes'
import { Button, Layout } from '../components/alheimsins'

import AlheimsinLayout from '../layouts/AlheimsinLayout'

const startTest = e => {
  e.preventDefault()
  Router.pushRoute('/test/')
}

export default function Home () {
  return (
    <div>
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgb(234, 234, 234)' }}>
        <h1>YOUniverse: Big Five Personality Quiz</h1>
      </div>
      <div style={{ textAlign: 'left', fontSize: '14px' }}>
        <form onSubmit={startTest}>
          <p>PLEASE READ ALL OF THE INSTRUCTIONS BEFORE TAKING THE TEST. This will ensure you get the greatest value from it possible.</p>
          <p>The goal of this test isn’t to make you feel good, or only highlight your best qualities so you leave feeling positive about your unique way of shining in this world. If you reply honestly and that is the result, that is wonderful. However, the goal of this test is to allow you to see yourself as you truly are so that you have solid footing upon which to leverage your existing strengths and knowledge of your vulnerabilities so you can improve upon them if desired. </p>
          <p>We know at this point you are likely excited to take the test and get your results as soon as possible, but it is important to first make sure you are in a state that will allow you to answer the questions with the least bias possible. Read the following instructions and if you are not able to meet these criteria at the moment, we urge you to wait until you can or schedule a time where you know that you’ll be in a more ideal state for providing honest and uninfluenced answers.</p>
          <ol>
            <li>Make sure you are NOT in a heightened level of stress, and that you can think/reflect clearly. Have a snack, a glass of water, and take five deep breaths to clear your mind before diving in. This will make a world of difference in allowing you to HONESTLY assess yourself and reduce local environment biases.</li>
            <li>Go to a place void of distractions where you can maintain this focus for at least 20min</li>
            <li>For each question, respond how you typically behave, NOT how you wish you could or think people should behave. You will only be doing yourself [and those you compare results with] a disservice if you are dishonest. Trying to come up with a tangible example (or a few) will help you clarify if your answer is “wishful thinking” or accurate.</li>
          </ol>
          <p>
            <label for='mindset'>
              <input type='checkbox' id='mindset' name='mindset' value='Mindset' />
              I'm in a solid state of mind
            </label>
          </p>
          <p>
            <label for='terms'>
              <input type='checkbox' id='terms' name='terms' value='Termos' />
              I agree to the Terms of Service
            </label>
          </p>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button value='Start Test' type='submit' background='rgb(255, 0, 128)' border='1px solid rgb(255, 0, 128)' />
          </div>
        </form>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout (page) {
  return (
    <Layout>
      <AlheimsinLayout>{page}</AlheimsinLayout>
    </Layout>
  )
}

// export default Home
