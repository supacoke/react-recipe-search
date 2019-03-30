import dispatcher from '../Dispatcher';

/**
 * Send the dispatcher the ADD_INGREDIENT event and value
 * @param {string} name - Name of new ingredendient
 * @public
 */
export function addIngredient(name) {
  dispatcher.dispatch({
    type: 'ADD_INGREDIENT',
    name,
  });
}

/**
 * Send the dispatcher the DELETE_INGREDIENT event and value
 * @param {string} name - Name of ingredendient to remove
 * @public
 */
export function deleteIngredient(name) {
  dispatcher.dispatch({
    type: 'DELETE_INGREDIENT',
    name,
  });
}