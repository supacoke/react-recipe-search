import { EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

import Fork2ForkApi from '../api/Fork2Fork';

/** 
 * Store our Search Results states
*/
class RecipeSearchResults extends EventEmitter {
  constructor() {
    super();
    this.recipes = [];
    this.moreResults = false;
    this.currentPage = 1;
    this.query = '';
  }

  /**
   * Return the recipe array
   * @returns {array}
   * @public
   */
  getAll() {
    return this.recipes;
  }

  /**
   * Return boolean value, whether the search has more results
   * @returns {boolean}
   * @public
   */
  hasMoreResults() {
    return this.moreResults;
  }
  
  /**
   * Return the current page of the search
   * @returns {int}
   * @public
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Return the current query string
   * @returns {string}
   * @public
   */
  getQuery() {
    return this.query;
  }

  /**
   * Set our recipes, current page and more results states
   * @private
   */
  searchRecipes(query) {
    this.query = query;

    new Promise( (resolve, reject) => {
      Fork2ForkApi.searchRecipes(query, resolve);
    }).then( (data) => {
      this.recipes = data.recipes;
      this.currentPage = 1;

      if (data.count === 30 ) {
        this.moreResults = true;
      } else {
        this.moreResults = false;
      }

      this.emit('change');
    });
  }

  /**
   * Update our query, current page and more results state, concat our search results
   * @private
   */
  getNextPage() {
    let query = this.query + '&page=' + parseInt(this.currentPage+1, 10);

    new Promise( (resolve, reject) => {
      Fork2ForkApi.searchRecipes(query, resolve);
    }).then( (data) => {
      this.recipes = this.recipes.concat(data.recipes);
      this.currentPage++;

      if (data.count < 30 )
        this.moreResults = false;

      this.emit('change');
    });
  }

  /**
   * Direct action to the correct method
   * @param {object} action 
   */
  handleActions(action) {
    switch(action.type) {
      case 'SEARCH_RECIPES':
        this.searchRecipes(action.query);
        break;
      case 'NEXT_RESULTS':
        this.getNextPage();
        break;
      default:
        // do nothing
    }
  }
}

const recipeSearchResults = new RecipeSearchResults();
dispatcher.register(recipeSearchResults.handleActions.bind(recipeSearchResults));
window.dispatcher = dispatcher;
export default recipeSearchResults;