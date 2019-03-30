import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Col } from 'reactstrap';
import * as SharedFunctions from '../sharedFunctions';

/**
 * Display the single recipe card from our search results
 */
export default class RecipeCard extends Component {

  render() {
    const title = SharedFunctions.decodeHTMLEntities(this.props.title);
    return (
      <Col xs="12" sm="6" md="4">
        <Card>
          <NavLink to={"recipe/" + this.props.recipe_id}>
            <div style={{width:"100%",maxHeight:"139px",overflow:"hidden"}}>
              <img src={this.props.image_url} alt={title} style={{width:"100%"}} />
            </div>
            <div className="content-container">
              <div className="recipe-title">{title}</div>
              <div className="view-btn">View Recipe</div>
            </div>
          </NavLink>
        </Card>
      </Col>
    )
  }
}