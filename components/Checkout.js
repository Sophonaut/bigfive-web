import React, { useEffect, useReducer } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../components/alheimsins'

const fetchCheckoutSession = async ({ quantity }) => {
  return fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quantity
    })
  }).then((res) => res.json())
}

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100
  const total = (quantity * amount).toFixed(2)
  return numberFormat.format(total)
}

function reducer (state, action) {
  switch (action.type) {
    case 'useEffectUpdate':
      return {
        ...state,
        ...action.payload,
        price: formatPrice({
          amount: action.payload.unitAmount,
          currency: action.payload.currency,
          quantity: state.quantity
        })
      }
    case 'increment':
      return {
        ...state,
        quantity: state.quantity + 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity + 1
        })
      }
    case 'decrement':
      return {
        ...state,
        quantity: state.quantity - 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity - 1
        })
      }
    case 'setLoading':
      return { ...state, loading: action.payload.loading }
    case 'setError':
      return { ...state, error: action.payload.error }
    default:
      throw new Error()
  }
}

const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    price: null,
    loading: false,
    error: null,
    stripe: null
  })

  useEffect(() => {
    async function fetchConfig () {
      // Fetch config from our backend.
      const { publicKey, unitAmount, currency } = await fetch(
        '/api/config'
      ).then((res) => res.json())
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      dispatch({
        type: 'useEffectUpdate',
        payload: { unitAmount, currency, stripe: await loadStripe(publicKey) }
      })
    }
    fetchConfig()
  }, [])

  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    dispatch({ type: 'setLoading', payload: { loading: true } })
    const { sessionId } = await fetchCheckoutSession({
      quantity: state.quantity
    })
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await state.stripe.redirectToCheckout({
      sessionId
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      dispatch({ type: 'setError', payload: { error } })
      dispatch({ type: 'setLoading', payload: { loading: false } })
    }
  }

  const buttonText = () => {
    return(state.loading || !state.price
    ? 'Loading...'
    : `Buy for ${state.price}`)
  }

  return (
    <div>
      <div className="card">
        <section >
          <div>
            <h1>YOUniverse</h1>
            <h4>Purchase a pass to take the Big Five Personality test, the most rigorous personality test there is!</h4>
            <div className='pasha-image'>
              <img
                alt='Random asset from Picsum'
                src='https://picsum.photos/280/320?random=4'
              />
            </div>
          </div>

          <Button
            role='link'
            onClick={handleClick}
            disabled={!state.stripe || state.loading}
            value={buttonText()}
          />
          <div> {state.error?.message}</div>
        </section>
      </div>
      <style jsx>
        {`
        .card {
          display: flex;
          align-items: center;
          justify-content:center;
        }
        section {
          display:flex;
          flex-direction: column;
          width:50%;
          border: 2px solid black;
        }
          `}
      </style>
    </div>
  )
}

export default Checkout
