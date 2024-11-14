import 'core-js/stable';
console.log('aaaaaa');

const state = {
  cart: [],
  quantity: 0,
};

function addRandomItemToCart() {
  state.cart.push(Math.random());
}

function increaseQT() {
  state.quantity++;
}
increaseQT();
addRandomItemToCart();

console.log(state);
