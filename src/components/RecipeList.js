import React, { Component } from 'react';

import RecipeCard from './RecipeCard';
import { Row, Col } from 'reactstrap';

import * as RecipeSearchActions from '../actions/RecipeSearchActions';
import RecipeSearchResults from '../store/RecipeSearchResults';
import SearchRecipesForm from './SearchRecipesForm';

/**
 * Display the list of Recipes from our search
 */
export default class RecipeList extends Component {
  constructor() {
    super();
    this.getSearchResults = this.getSearchResults.bind(this);
    this.state = {
      recipes: RecipeSearchResults.getAll(),
      moreResults: RecipeSearchResults.hasMoreResults(),
      currentPage: RecipeSearchResults.getCurrentPage(),
      query: RecipeSearchResults.getQuery(),
    };
  }

  componentWillMount() {
    RecipeSearchResults.on('change', this.getSearchResults);
  }

  componentWillUnmount() {
    RecipeSearchResults.removeListener('change', this.getSearchResults);
  }

  /**
   * Get our recipes and moreResult value from store
   * @private
   */
  getSearchResults() {
    this.setState({
      recipes: RecipeSearchResults.getAll(),
      moreResults: RecipeSearchResults.hasMoreResults(),
    })
  }

  /**
   * Fire the getNextPageResults action
   * @private
   */
  getMoreResults() {
    RecipeSearchActions.getNextPageResults();
  }

  render() {
    let moreButton;
    if (this.state.moreResults)
      moreButton = <Row><Col xs="12" style={{textAlign:"center",marginBottom:"2rem"}}><button aria-label="Load more results" title="Load more results" onClick={this.getMoreResults.bind(this)}>More</button></Col></Row>;

    return (
      <div>
        <Row>
          <Col xs="12">
            <SearchRecipesForm ingredients={this.props.ingredients} />
          </Col>
          {this.state.recipes.map(recipe => <RecipeCard 
            key={recipe.recipe_id}
            recipe_id={recipe.recipe_id}
            title={recipe.title} 
            image_url={recipe.image_url}
            />
          )}
        </Row>
        {moreButton}
      </div>
    )
  }
}