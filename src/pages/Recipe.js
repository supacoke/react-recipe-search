import React, { Component } from 'react';
import Fork2ForkApi from '../api/Fork2Fork';
import NutritionIxApi from '../api/NutritionIx';
import { NavLink } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import CalorieChart from '../components/CalorieChart';
import * as SharedFunctions from '../sharedFunctions';

/** 
 * Display our Recipe page
*/
export default class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      imageUrl: '',
      ingredients: [],
      calories: 0,
      chartData: [{
        label: 'Protein',
        color: '#239cd3'
      },
      {
        label: 'Fat',
        color: '#fc910d',
      },
      {
        label: 'Carbohydrates',
        color: '#ed6d50',
      }]
    }
  }

  componentDidMount() {
    // load recipe
    const recipeId = this.props.match.params.recipeId;
    if (recipeId) {
      new Promise( (resolve, reject) => {
        Fork2ForkApi.getRecipeById(recipeId, resolve);
      }).then( (data) => {
        let recipe = data.recipe;
        this.setState({
          title: SharedFunctions.decodeHTMLEntities(recipe.title),
          imageUrl: recipe.image_url,
          ingredients: recipe.ingredients
        });

        this.getNutritionInfo();
      });
    }
  }

  /**
   * Fetch the nutrition data from the API
   * @private
   */
  getNutritionInfo() {
    let ingredients = this.state.ingredients;
    let query = this.buildIngredientsQuery(ingredients);

    new Promise( (resolve, reject) => {
      NutritionIxApi.getNutritionData(query, resolve);
    }).then( (data) => {
      this.calculateNutritionData(data.foods);
    });
  }

  /**
   * Use the food in the arry to calculate calories and breakdown
   * @param {array} foodArr - List of food and nutrition data of each 
   * @private
   */
  calculateNutritionData(foodArr) {
    let foodLength = foodArr.length;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    for( let i=0; i<foodLength; i++ ) {
      let food = foodArr[i];

      calories += parseInt(food.nf_calories, 10);
      protein += parseInt(food.nf_protein, 10);
      fat += parseInt(food.nf_total_fat, 10);
      carbs += parseInt(food.nf_total_carbohydrate, 10);
    }

    let stateChartCopy = Object.assign({}, this.state.chartData);
    stateChartCopy[0].value = protein;
    stateChartCopy[1].value = fat;
    stateChartCopy[2].value = carbs;
    this.setState(stateChartCopy);
 
    this.setState({calories: calories + ' g' });
  }

  /**
   * Build a new string that is formatted to be used as a query for the Nutrition API
   * @param {array} ingredientsArr - Ingredients list from our fetched recipe
   * @returns {string}
   * @private
   */
  buildIngredientsQuery(ingredientsArr) {
    let basicIngredientStr = this.removeExtraIngredientInfo(ingredientsArr);
    return basicIngredientStr.join(' and ');
  }

  /**
   * Return a new array with a list of ingredients with simple instructions
   * @param {array} ingredientsArr - Ingredients list from our fetched recipe
   * @returns {array}
   * @private
   */
  removeExtraIngredientInfo(ingredientsArr) {
    let ingredientsLength = ingredientsArr.length;
    let basicIngredientArr = [];
    for( let i=0; i<ingredientsLength; i++ )
      basicIngredientArr.push(this.removeExtraInstructions(ingredientsArr[i]));

    return basicIngredientArr;
  }

  /**
   * Remove the text string after the comma, including the comma
   * @param {string} textStr 
   * @returns {string}
   * @private
   */
  removeExtraInstructions(textStr) {
    return textStr.replace(/,.*/, '');
  }

  /**
   * Return the ingredients in a HTML li element
   * @returns {JSX}
   * @private
   */
  renderIngredients() {
    return (
      this.state.ingredients.map( (ingredient, i) => 
        <li key={i}>{ingredient}</li>
      )
    )
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" sm="3">
            <button aria-label="Back to Search Results" title="Back to Search Results" style={{marginBottom:"2rem"}}>
              <NavLink to="/" >Back</NavLink>
              </button>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="4" className="recipe-detail-thumb" style={{overflow:"hidden"}}>
            <img src={this.state.imageUrl} alt={this.state.title} style={{width:"100%"}} />
          </Col>
          <Col xs="12" md="8" className="recipe-detail">
            <h1 style={{lineHeight:"1",marginBottom:"1.2rem"}}>{this.state.title}</h1>
            <ul>
              {this.renderIngredients()}
            </ul>
            <hr />
            <Row>
              <Col xs="12" lg="6">
                <div className="text-header">Calories</div>
                <div style={{fontSize:"3rem"}}>{this.state.calories}</div>
              </Col>
              <Col xs="12" lg="6">
                <CalorieChart chartData={this.state.chartData} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}