import dispatcher from '../Dispatcher';

/**
 * Send the dispatcher the SEARCH_RECIPES event and value
 * @param {string} query - Comma separated string containing the ingredients
 * @public
 */
export function searchRecipes(query) {
  dispatcher.dispatch({
    type: 'SEARCH_RECIPES',
    query,
  });
}

/**
 * Send the dispatcher the NEXT_RESULTS event
 * @public
 */
export function getNextPageResults() {
  dispatcher.dispatch({
    type: 'NEXT_RESULTS'
  });
}