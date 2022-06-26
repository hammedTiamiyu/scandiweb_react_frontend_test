  export const initialState = {
    loading : false,
    basket: [],
    categoryList : "",
    setCategory : "",
    currencyLabel: "USD",
    products: {},
    currencyList: "",
    amount: 0,
    total: 0
  };
  
  // Selector
  // export const getBasketTotal = (basket) => 
  //   basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading : action.item
        }
      case "CATEGORY_LIST":
        return {
          ...state,
          categoryList: action.item
        }
      case "CURRENCY_LIST":
        return {
          ...state,
          currencyList: action.item
        }
      case "SET_CATEGORY":
        return {
          ...state,
          setCategory : action.item
        }
      case "SET_CURRENCY":
        return {
          ...state,
          currencyLabel: action.item
        }
      case "GET_PRODUCTS":
        return {
          ...state,
          products: action.item
        }
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      
      case 'EMPTY_BASKET':
        return {
          ...state,
          basket: []
        }

      case "TOGGLE_AMOUNT"  :
          let tempCart = state.basket
        .map((cartItem) => {
          if (cartItem.id === action.item.id) {
            if (action.item.type === 'inc') {
              return { ...cartItem, amount: cartItem.amount + 1 }
            }
            if (action.item.type === 'dec') {
              return { ...cartItem, amount: cartItem.amount - 1 }
            }
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.amount !== 0)
        return { ...state, basket: tempCart }

      case "GET_TOTALS":
        let { total, amount } = state.basket.reduce(
          (cartTotal, cartItem) => {
            const {  currencyAmount, amount } = cartItem
            const itemTotal = currencyAmount * amount
    
            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
          },
          {
            total: 0,
            amount: 0,
          }
        )
        total = parseFloat(total.toFixed(2))
    
        return { ...state, total, amount }

      case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          )
        }
  
        return {
          ...state,
          basket: newBasket
        }
      
     
  
      default:
        return state;
    }
  };
  
  export default reducer;
  