import React from 'react'
import { withGlobalState } from 'react-globally'

const CounterInfo = ({ globalState }) => {
  return (
    <div>
      The counter value: {globalState.counter}
    </div>
  )
}

export default withGlobalState(CounterInfo)
