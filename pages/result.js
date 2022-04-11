import { Component } from 'react'
import getConfig from 'next/config'
import { Router } from '../routes'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
import { Code, Field, InputTextUncontrolled, Button } from '../components/alheimsins'
import { getItem, clearItems } from '../lib/localStorageStore'
import { MdDelete } from 'react-icons/md'
const { publicRuntimeConfig: { URL } } = getConfig()

/*
  this class is essentially unused because we're routing directly to showResult
  but still does display for a second. Not sure if we're getting the redirect from
  componentDidMount still even though we've eliminated the route but could be worth looking at
*/

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    const token = JSON.parse(getItem('currentUser')).token || false
    Router.pushRoute('showResult', { token })
    // const resultId = getItem('result') || false
    // this.setState({ resultId })
  }

  handleInputSubmit (e) {
    e.preventDefault()
    const id = formatId(this.state.id)
    Router.pushRoute('showResult', { id }, { shallow: true })
  }

  handleInputChange ({ target }) {
    const id = target.value
    const error = id && !validMongoId(formatId(id)) ? 'Not a valid ID' : false
    this.setState({ id, error })
  }

  render () {
    const { handleInputSubmit, handleInputChange } = this
    const { error, id, resultId } = this.state
    const disabledButton = !validMongoId(formatId(id))
    return (
      <>
        <h2>Result</h2>
        <p>If you have taken the test and saved your ID, you can see the results here by
          typing in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.
        </p>
        {
          resultId &&
            <p>
              Your last test ID: <Code>{resultId}</Code>
              <a title='Delete' onClick={() => { clearItems(); window.location.reload(true) }}>
                <MdDelete style={{ cursor: 'pointer', marginRight: '10px' }} />
              </a>
            </p>
        }
        <div style={{ textAlign: 'left' }}>
          <form onSubmit={handleInputSubmit}>
            <Field name='ID' style={{ marginBottom: 0 }}>
              <InputTextUncontrolled name='id' onChange={handleInputChange} placeholder='URL or id for result' autoFocus />
            </Field>
            {error && <p style={{ fontSize: '10px', color: '#ff0033' }}>{error}</p>}
            <Button value='Get results' type='submit' disabled={disabledButton} />
          </form>
        </div>
      </>
    )
  }
}
