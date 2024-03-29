import React, { Component } from 'react'
import SHOP_DATA from './shop.data.js'
import CollectionPreview from "../../components/collection-preview/collection-preview.component.jsx"

class ShopPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collections: SHOP_DATA
    }
    
  }
  
  render() {
    return (
      <div className="shop-page">
        {
            this.state.collections.map(({id, ...otherProps}) => (
            <CollectionPreview key={id} {...otherProps} />
          ))
        }
      </div>
    )
  }
}

export default ShopPage