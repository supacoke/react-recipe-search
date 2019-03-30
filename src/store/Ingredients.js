import { EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

/** 
 * Store our Ingredients states
*/
class Ingredients extends EventEmitter {
  constructor() {
    super();

    this.ingredients = ['onions'];
  }

  /**
   * Return ingredients array
   * @returns {array}
   * @public
   */
  getAll() {
    return this.ingredients;
  }

  /**
   * Add ingredient to the ingredients array
   * @param {string} ingredient
   * @private
   */
  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.emit('change');
  }

  /**
   * Remove ingredient from the ingredients array
   * @param {string} ingredient 
   * @private
   */
  deleteIngredient(ingredient) {
    let index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
    this.emit('change');
  }

  /**
   * Direct action to the correct method
   * @param {object} action 
   */
  handleActions(action) {
    switch(action.type) {
      case 'ADD_INGREDIENT':
        this.addIngredient(action.name);
        break;
      case 'DELETE_INGREDIENT':
        this.deleteIngredient(action.name);
        break;
      default:
        // do nothing
    }
  }
}

const ingredients = new Ingredients();
dispatcher.register(ingredients.handleActions.bind(ingredients));
window.dispatcher = dispatcher;
export default ingredients;