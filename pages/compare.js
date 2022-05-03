import { useState, useEffect, useContext } from 'react'
import { Code, Layout } from '../components/alheimsins'
import CompareMenu from '../components/CompareMenu'
import { UserContext } from '../hooks/user'
import { TokenContext } from '../hooks/token'
import AlheimsinLayout from '../layouts/AlheimsinLayout'
import { Router } from '../routes'
import base64url from '../lib/base64url'
import { safetyNet } from '../lib/safety-net'

/*
  Compare has now been converted into a functional component with removed state.
  There does persist a problem with refreshing while on the compare page. We need to do an initial
  fetch of data after login while redirecting to either the profile or the results page and
  stash UserContext in LocalStorage once we finish loading user data correctly.
*/

// export default class Compare extends Component {
// constructor (props) {
//   super(props)
//   this.state = {
//     people: []
//   }
//   this.handleAdd = this.handleAdd.bind(this)
//   this.handleChange = this.handleChange.bind(this)
//   this.handleDelete = this.handleDelete.bind(this)
//   this.handleCompare = this.handleCompare.bind(this)
// }

// handleChange ({ target }) {
//   const id = target.value
//   const error = id && target.name === 'id' && !validMongoId(formatId(id)) ? 'Not a valid ID' : false
//   this.setState({ [target.name]: id, error })
// }

// handleDelete (num) {
//   const people = this.state.people
//   people.splice(num, 1)
//   this.setState({ people: [...people] })
// }

// handleAdd (e) {
//   e.preventDefault()
//   const name = this.state.name
//   const id = formatId(this.state.id)
//   this.setState({ name: '', id: '', people: [...this.state.people, { name, id }] })
// }

// handleCompare () {
//   const people = JSON.stringify(this.state.people)
//   const id = base64url.encode(people)
//   Router.pushRoute('showCompare', { id })
// }

const Compare = () => {
  const [user] = useContext(UserContext)
  const [token] = useContext(TokenContext)
  const [loading, setLoading] = useState(true)

  /**
   * handleClick needs to run the comparison for the user selected in the dropdown menu upstream
   */
  const handleUserClick = (e) => {
    handleCompare(e.target.getAttribute('index'))
  }

  const handleCompare = (index) => {
    console.log()
    const compareUser = user.whitelist[index]

    let people = {
      currentUser: {
        name: user.email,
        data: user.results.slice(-1).pop()
      },
      compareUser: compareUser
    }

    // Sanity check people prior to sending to showCompare
    console.log(JSON.stringify(people))

    people = JSON.stringify(people)
    const id = base64url.encode(people)
    Router.pushRoute('showCompare', { id })
  }

  useEffect(() => {
    const safetyCheck = safetyNet(token)
    if (!safetyCheck) {
      console.log('safety check failed, redirecting to /signup')
      window.location = '/signup'
    } else {
      setLoading(false)
    }
  }, [])

  return loading ? <p>Loading...</p> : (
    <Layout>
      <AlheimsinLayout>
        <div>
          <h2>Compare</h2>
          <CompareMenu handleUserClick={handleUserClick} whitelist={user.whitelist} />
          <p>Compare results from the bigfive personality test with multiple people.</p>
          <p>Type in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
          {/* <div style={{ textAlign: 'left' }}>
            {people && people.length > 0 && people.map((person, i) =>
              <div key={i} className='persons'>
                <a title='Delete' onClick={() => this.handleDelete(i)}>
                  <MdDelete style={{ cursor: 'pointer', marginRight: '10px' }} />
                </a>
                <b>{person.name}</b> - <i>{person.id}</i>
              </div>
            )}
            {people && people.length >= 2 && <Button value='Compare people' onClick={this.handleCompare} />}
            <form onSubmit={this.handleAdd} style={{ marginTop: '40px' }}>
              <Field name='Name'>
                <InputText name='name' value={name} onChange={this.handleChange} placeholder='Name for comparison' autoComplete='off' autoFocus />
              </Field>
              <Field name='ID' style={{ marginBottom: 0 }}>
                <InputText name='id' value={id} onChange={this.handleChange} placeholder='URL or id for comparison' autoComplete='off' />
              </Field>
              {error && <p style={{ fontSize: '10px', color: '#ff0033' }}>{error}</p>}
              <Button value='Add' type='submit' disabled={!validMongoId(formattedId) || !id || !name} />
            </form>
          </div> */}
          <style jsx>
            {`
          .persons {
            padding: 8px;
            font-size: 14px;
          }
          .persons a {
            font-size: 18px;
          }
          .persons:nth-of-type(even) {
            background: rgb(234, 234, 234);
          }
        `}
          </style>
        </div>
      </AlheimsinLayout>
    </Layout>

  )
}

export default Compare
