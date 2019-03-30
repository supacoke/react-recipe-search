import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './pages/Home';
import IngredientsList from './components/IngredientsList';
import IngredientsForm from './components/IngredientsForm';
import RecipeList from './components/RecipeList';
import SearchRecipesForm from './components/SearchRecipesForm';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('should have a <IngredientsList /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(IngredientsList)).toHaveLength(1);
  })

  it('should have a <RecipeList /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(RecipeList)).toHaveLength(1);
  })
});

describe('<IngredientsList />', () => {
    const ingredients = ['onions', 'mushrooms'];
  it('should have a .ingredients-list class', () => {
    let home = new Home;
    const wrapper = shallow(<IngredientsList ingredients={ingredients} />);
    expect(wrapper.find('.ingredients-list')).toHaveLength(1);
  })

  it('should have a 2 ingredients', () => {
    const wrapper = shallow(<IngredientsList ingredients={ingredients} />);
    expect(wrapper.find('.ingredients-list li')).toHaveLength(2);
  })

  it('should have an onion ingredient as the first ingredient', () => {
    const wrapper = shallow(<IngredientsList ingredients={ingredients} />);
    const firstIngredientWrapper = shallow(wrapper.find('.ingredients-list li').get(0));
    expect(firstIngredientWrapper.text()).toEqual('onions');
  })
});
