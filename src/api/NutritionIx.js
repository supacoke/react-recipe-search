class NutritionIxApi {
  /**
   * API Key
   * @private
   */
  apiKey = 'c24cc1953590488b8f3647ee0223c732';

  /**
   * API URL
   * @private
   */
  apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

  /**
   * Returns a data object containing nutrition data for each ingredient
   * @param {string} query - string of ingredients and amount separated by AND
   * @param {promise} resolve 
   * @public
   */
  getNutritionData(query, resolve) {
    fetch( this.apiUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'fdd80c5e', 
        'x-app-key': this.apiKey
      },
      body: JSON.stringify({
        'query': query,
      })
    } )
    .then( 
      response => response.json() 
    )
    .then( data => {
        resolve(data);
    })
    .catch(
      error => console.log(error)
    );
  }  
}
const nutritionIxApi = new NutritionIxApi();
export default nutritionIxApi;