import React from 'react'
import {ApolloClient,InMemoryCache, ApolloProvider, HttpLink, from,  } from '@apollo/client'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import ProductList from './Components/GetData'
import ProductDetails from './Components/ProductDetails'
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
          <Switch>
            <Route exact path="/" component={ProductList} />
            
            <Route path='/product-details/:id' component={ProductDetails} />
            
          </Switch>
          </div>
      </ApolloProvider>
      </Router>
     )
 }
  
}

export default App    
