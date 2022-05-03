import { useState, useEffect, useContext } from 'react'
import { Code, Layout } from '../components/alheimsins'
import CompareMenu from '../components/CompareMenu'
import { UserContext } from '../hooks/user'
import { TokenContext } from '../hooks/token'
import AlheimsinLayout from '../layouts/AlheimsinLayout'
import { Router } from '../routes'
import base64url from '../lib/base64url'
import { safetyNet } from '../lib/safety-net'

const Compare = () => {
  const [user] = useContext(UserContext)
  const { token } = useContext(TokenContext)
  const [loading, setLoading] = useState(true)

  console.log(`sanity check user.whitelist: ${JSON.stringify(user.whitelist)}`)

  /**
   * handleClick needs to run the comparison for the user selected in the dropdown menu upstream
   */
  const handleUserClick = (e) => {
    handleCompare(e.target.getAttribute('index'))
  }

  const handleCompare = (index) => {
    const compareUser = user.whitelist[index]

    let people = {
      currentUser: {
        name: user.email,
        data: user.currentResult
      },
      compareUser: compareUser
    }

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
