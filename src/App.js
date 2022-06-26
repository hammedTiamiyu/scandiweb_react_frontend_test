import React from 'react'
import {ApolloClient,InMemoryCache, ApolloProvider, HttpLink, from,  } from '@apollo/client'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import ProductHome from './Components/GetData'
import ProductCategory from './Components/ProductCategory'
import Header from './Components/Header'
import ProductDetails from './Components/ProductDetails'
import CartItem from './Components/CartItem'
// import ProductDetails from './Details'
// import Products from './Components/Products'
import{onError} from '@apollo/client/link/error'
const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:4000/graphql"})
])        

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
}) 

class App extends React.Component {
  constructor() {
      super()
      this.state= {
          displayItems : []
      }
  }

 render() {
  //  console.log(this.props)
     return(
      <Router>
      <ApolloProvider client={client}>
          <div>
            < Header />
            <Switch>              
              <Route exact path="/" component={ProductHome } />
              
              <Route path='/category/:category' component={ProductCategory} />

              <Route path='/product-details/:id' component={ProductDetails} />

              <Route path='/view_bag' component={CartItem} />
              
              <Route path='/check_out' />              
            </Switch>
          </div>
      </ApolloProvider>
      </Router>
     )
 }
  
}

export default App    
