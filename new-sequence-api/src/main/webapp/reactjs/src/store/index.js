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
};

export const AppEvents = {
  LoadBooks: "LoadBooks",
  LoadBooksEnd: "LoadBooksEnd",
  AddToCart: "AddToCart",
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

  store.on(AppEvents.LoadBooksEnd, (state, [book]) => ({
    ...state,
    books: Array.from(Array(12).keys()).map(() => book),
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
};

export const store = createStoreon([storeonDevtools, storeonLogger, appModule]);
