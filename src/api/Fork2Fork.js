
class Fork2ForkApi {
  /**
   * API Key
   * @private
   */
  apiKey = '925d848d8798797d2b0cd4109f24bbae';

  /**
   * Search URL
   * @private
   */
  apiUrlSearch = 'http://food2fork.com/api/search?key=' + this.apiKey;

  /**
   * Get URL
   * @private
   */
  apiUrlGet = 'http://food2fork.com/api/get?key=' + this.apiKey;

  /**
   * Returns API data object containing an array of recipes and count
   * @param {string} query - String of ingredients separated by commas
   * @param {promise} resolve
   * @public
   */
  searchRecipes(query, resolve) {
    let url = this.apiUrlSearch + '&q=' + query;
    fetch( url )
      .then( response => response.json() )
      .then( data => {
        resolve( data );
      })
      .catch( error => console.log(error) 
    )
  }

  /**
   * Returns API data object containing a recipe
   * @param {int} recipeId
   * @param {promise} resolve 
   * @public
   */
  getRecipeById(recipeId, resolve) {
    let url = this.apiUrlGet + '&rId=' + recipeId;
    fetch( url )
      .then( response => response.json() )
      .then( data => {
        resolve( data );
      })
      .catch( error => console.log(error) 
    )
  }
}

const fork2ForkApi = new Fork2ForkApi();
export default fork2ForkApi;