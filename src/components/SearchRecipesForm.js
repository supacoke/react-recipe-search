import React, { Component } from 'react';

import * as RecipeSearchActions from '../actions/RecipeSearchActions';

/**
 * Display the Search button and handle the search
 */
export default class SearchRecipesForm extends Component {

  /**
   * Send query to the searchRecipes action
   * @param {object} e - Reference to button that was clicked
   * @private
   */
  searchQuery(e) {
    let ingredients = this.props.ingredients;
    let ingredientsStr = ingredients.join(',');

    e.target.value = '';

    if (ingredientsStr)
      RecipeSearchActions.searchRecipes(ingredientsStr);
  }

  render() {
    return (
      <div style={{marginBottom:"2rem"}}>
          <button aria-label="Search recipes with your ingredients" title="Search recipes with your ingredients" onClick={this.searchQuery.bind(this)}>Search</button>
      </div>
    )
  }
}