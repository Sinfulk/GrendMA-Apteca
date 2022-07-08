console.log('i am end');
getProducts = () => {
  const productLocalStorage = localStorage.getItem('busket');
  if (productLocalStorage !== null) {
    return JSON.parse(productLocalStorage);
  }
  return [];
};

const products = getProducts();
console.log(products);
const container = document.querySelector('.main');

const HTMLs = products
  .map(
    (el) => `
   <div class="main">
    <div class="oneItem">
      <div class="name">${el.product_name}</div>
      <div class="divImg">
        <img
          class="img"
          src=${el.picture}
          alt=""
        />
      </div>
      <div class="price">${el.price} ₽.</div>
      <a href="#" id="${el.id}" name ="toBusket" class="btn btn-primary";">В корзину </a>
    </div>
  </div>
`,
  )
  .reduce((a, b) => a + b, '');

container.insertAdjacentHTML('afterbegin', HTMLs);

