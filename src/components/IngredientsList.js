import React, { Component } from 'react';

import IngredientsForm from './IngredientsForm';
import * as IngredientActions from '../actions/IngredientActions';

import { Row, Col } from 'reactstrap';

/**
 * Display our ingredients list
 */
export default class IngredientsList extends Component {

  /**
   * Send the value to our deleteIngredient action
   * @param {string} name - Name of the ingredient we are removing
   * @private
   */
  deleteIngredient(name) {
    if (name)
      IngredientActions.deleteIngredient(name);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12">
            <h2>Your Ingredients</h2>
            <p>Add your ingredients to the list below. Then hit the search button to find recipes.</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <ul className="ingredients-list">
              {this.props.ingredients.map( (ingredient, i) => 
                <li key={i}>
                  {ingredient} 
                  <span onClick={this.deleteIngredient.bind(this,ingredient)}>
                    <button aria-label="Delete Ingredient" title="Delete Ingredient" className="no-button">
                      <i className="far fa-times-circle" style={{marginLeft:"0.8rem",color:"red",cursor:"pointer"}}></i>
                    </button>
                  </span>
                </li>
              )}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs="12"><IngredientsForm /></Col>
        </Row>
      </div>
    )
  }
}