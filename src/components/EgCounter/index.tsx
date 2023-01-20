import { useAppSelector, useAppDispatch } from 'hooks/useRedux';

import { increment, decrement } from 'storeFeature/EgCounter';
import { fetchUsers } from 'storeFeature/EgUserThunk';

function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(fetchUsers({ name: 'ASL', id: 1 }))}
        >
          Get Users
        </button>
      </div>
    </div>
  );
}

export default Counter;
