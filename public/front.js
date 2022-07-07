getProducts() {
    const productLocalStorage = localStorage.getItem('arr');
    if (productLocalStorage !== null) {
      return JSON.parse(productLocalStorage);
    }
    return [];
}

const products = getProducts();

const container = document.querySelector('.container1');

const HTMLs = products.map(el => {
    return `
<div class="oneItem">
<div class="name">${el.name}</div>
<div class="divImg">
  <img
    class="img"
    src=${el.picture}}
    alt=""
  />
</div>
<div class="price">{{this.price}}р.</div>
<button class="btnDelete">Удалить</button>
</div>
`
}).reduce((a,b) => a + b, '');

container.insertAdjacentHTML("beforebegin", HTMLs)