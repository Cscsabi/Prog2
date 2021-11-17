import { createStoreon } from "storeon";
import { storeonDevtools, storeonLogger } from "storeon/devtools";
import { axiosInstance } from "../axios";

const initialState = {
  books: [],
  cart: {
    /*
    
    Object.keys(cart) => [1, 2, 3...].map((idOfBook) => <ReactComp book={cart[idOfBook]} />)
    Object.values(cart) => [book1, book2, book3...].map((book) => <ReactComp book={book} />)



    [idOfBook]: {
      quantity: 2, 
      book: { ... }
    }
    */
  },
  filtered: "",
};

export const AppEvents = {
  LoadBooks: "LoadBooks",
  LoadBooksEnd: "LoadBooksEnd",
  LoadCart: "LoadCart",
  AddToCart: "AddToCart",
  RemoveFromCart: "RemoveFromCart",
  ClearCart: "ClearCart",
  Register: "Register",
  Login: "Login",
  FilterData: "FilterData",
  GetFilteredData: "GetFilteredData",
};

const appModule = (store) => {
  store.on("@init", () => initialState);

  store.on(AppEvents.LoadBooks, async (_) => {
    try {
      const response = await axiosInstance({
        url: "/books/all",
      });
      store.dispatch(AppEvents.LoadBooksEnd, response.data);
    } catch (e) {
      console.log(e.message);
    }
  });

  store.on(AppEvents.LoadBooksEnd, (state, book) => ({
    ...state,
    //books: Array.from(Array(12).keys()).map(() => book),
    books: [...book],
  }));

  store.on(AppEvents.LoadCart, (state, book) => ({
    ...state,
    cart: [...book],
  }));

  store.on(AppEvents.AddToCart, (state, book) => ({
    ...state,
    cart: {
      ...state.cart,
      [book.id]: {
        ...book,
        quantity: (state.cart[book.id]?.quantity || 0) + 1,
      },
    },
  }));

  store.on(AppEvents.RemoveFromCart, (state, book) => {
    return state.cart.filter((x) => x.id !== book.id);
  });

  store.on(AppEvents.ClearCart, () => ({
    cart: {},
  }));

  store.on(AppEvents.FilterData, (state, strSearch) => ({
    filtered: strSearch,
  }));

  store.on(AppEvents.GetFilteredData, (state) => ({
    filtered: state.filtered,
    // filtered
    //filtered: strSearch, // FU?!
  }));
};

export const store = createStoreon([storeonDevtools, storeonLogger, appModule]);
