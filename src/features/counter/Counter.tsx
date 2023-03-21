import { useAppDispatch, useAppSelector } from 'app/hook'
import { increase, decrease, selectCount } from './counterSlice'

export default function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  function handleIncrease() {
    dispatch(increase())
  }

  function handleDecrease() {
    dispatch(decrease())
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  )
}
