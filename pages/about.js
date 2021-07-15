const sopho = [
  {
    avatar: '/static/zrrrzzt.png',
    name: 'Peter DePaulo',
    nick: {
      name: 'potatodepaulo',
      link: 'https://twitter.com/potatodepaulo/'
    },
    description: 'behavior obsessed for 12 years',
    dev: true
  },
  {
    avatar: '/static/zrrrzzt.png',
    name: 'Tyler Capps',
    nick: {
      name: 'tyler-capps',
      link: 'https://www.linkedin.com/in/tyler-capps/'
    },
    description: 'sustainability is a mindset',
    dev: false
  }
]
const users = [
  {
    avatar: '/static/maccyber.png',
    name: 'Jonas Maccyber Enge',
    nick: {
      name: 'maccyber',
      link: 'https://github.com/maccyber'
    },
    description: 'generally a nice guy',
    dev: true
  },
  {
    avatar: '/static/zrrrzzt.png',
    name: 'Geir Gåsodden',
    nick: {
      name: 'zrrrzzt',
      link: 'https://github.com/zrrrzzt/'
    },
    description: 'generally a nice guy',
    dev: true
  },
  {
    avatar: '/static/elimg.png',
    name: 'Eli Marianne Huseby',
    nick: {
      name: 'elimh',
      link: 'http://blekksprutene.no/'
    },
    description: 'generally a nice woman'
  },
  {
    avatar: '/static/person.png',
    name: 'Eduardo Calle',
    nick: {
      name: 'nieled',
      link: 'https://riseup.net/'
    },
    description: 'generally a nice guy'
  }
]

const Users = ({ users }) => (
  <div className='about'>
    {users.map(user => (
      <div key={user.nick.name} className='info'>
        <div />
        <div className='text'>
          <div className='name'>
            {user.name}
          </div>
          <div className='nick'>
            <a href={user.nick.link}>@{user.nick.name}</a>
          </div>
          <div className='description'>
            <i>{user.description}</i>
          </div>
        </div>
      </div>
    ))}
    <style jsx>
      {`
        .about {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .info {
          display: flex;
          flex-direction: row;
          padding: 10px 0px;
          align-items: center;
          justify-content: center;
        }
        .text {
          text-align: left;
          padding-left: 20px;
        }
        .avatar {
          border-radius: 100%;
          display: inline-block;
          overflow: hidden;
          border: 1px solid #eee;
          line-height: 0;
          vertical-align: top;
        }
        .nick a {
          color: #FF6E14
        }
        .name {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
        }
      `}
    </style>
  </div>
)

export default () => {
  const dev = users.filter(user => user.dev)
  const trans = users.filter(user => !user.dev)
  return (
    <>
      <h2>Founders of Sophonaut</h2>
      <Users users={sopho} />
      <h2>Previous Developers</h2>
      <p>
        The core logic of this personality assessment was forked from <a href='https://github.com/Alheimsins/bigfive-web'>alheimsins big five web project</a>. Sophonaut has changed UI components and the method by which the results display. Please see the original development team of the core software below. Thank you Alheimsins!
      </p>
      <Users users={dev} />
      <h2>Translators</h2>
      <Users users={trans} />
    </>
  )
}
