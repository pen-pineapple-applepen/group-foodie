import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';

function App() {
  const { addName } = allActions;
  const name = useAppSelector(state => state.names)

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addName('Erik'))
  }

  return (
    <div className="App">
      <p>
        my name is
        {name || ''}
      </p>
      <button type="button" onClick={handleClick}>add Erik</button>
    </div>
  );
}

export default App;