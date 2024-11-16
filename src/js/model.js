import JustValidate from 'just-validate';

export const state = {
  cart: [],
  quantity: 0,
};

export function addRandomItemToCart() {
  state.cart.push(Math.random());
}

export function increaseQT() {
  state.cart.push(Math.random());
  console.log(state);
}
