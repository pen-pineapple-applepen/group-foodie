import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import RestaurantContainer from './RestaurantContainer';
import MenuPage from './MenuPage';

function App() {
  const { addName } = allActions;
  const name = useAppSelector((state) => state.names);

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
      <Button color="primary" onClick={handleClick}>add Erik</Button>
      <MenuPage/>
    </div>
  );
}

export default App;
