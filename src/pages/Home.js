import React, { Component } from 'react';

import RecipeList from '../components/RecipeList';
import IngredientsList from '../components/IngredientsList';
import Ingredients from '../store/Ingredients';

import { Container } from 'reactstrap';

/**
 * Display the home page
 */
export default class Home extends Component {
  constructor() {
    super();
    this.getIngredients = this.getIngredients.bind(this);
    this.state = {
      ingredients: Ingredients.getAll(),
    };
  }
  
  componentWillMount() {
    Ingredients.on('change', this.getIngredients);
  }

  componentWillUnmount() {
    Ingredients.removeListener('change', this.getIngredients);
  }

  /**
   * Get ingredients from store
   * @private
   */
  getIngredients() {
    this.setState({
      ingredients: Ingredients.getAll(),
    })
  }

  render() {
    return (
      <Container>
          <IngredientsList ingredients={this.state.ingredients} />
          <RecipeList ingredients={this.state.ingredients} />
      </Container>
    )
  }
}