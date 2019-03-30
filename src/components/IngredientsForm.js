import React, { Component } from 'react';
import * as IngredientActions from '../actions/IngredientActions';

/**
 * Display our ingredients form to add new ingredients
 */
export default class IngredientsForm extends Component {
  
  /**
   * Send the value to our addIngredient action
   * @private
   */
  addIngredient() {
    const value = this.refs.ingredientName.value;
    if ( value ) {
      IngredientActions.addIngredient(value);
      this.refs.ingredientName.value = '';
    }
  }

  render() {
    return (
      <div style={{marginTop:"2rem"}}>
          <label htmlFor="ingredient" style={{fontSize:"1.2rem"}}>Add Ingredient</label><br />
          <input type="text" name="ingredient" ref="ingredientName" />
          <button aria-label="Add Ingredient" title="Add Ingredient" onClick={this.addIngredient.bind(this)}>Add</button>
      </div>
    )
  }
}