console.log("i am end");
getProducts = () => {
  const productLocalStorage = localStorage.getItem("busket");
  if (productLocalStorage !== null) {
    return JSON.parse(productLocalStorage);
  }
  return [];
};

const products = getProducts();
console.log(products);
const container = document.querySelector(".container1");

const HTMLs = products
  .map((el) => {
    return `
    <div class="entries-list no-bullets no-padding" class="card" style="width: 18rem;">
    <img src="${el.picture}" width="200px" class="card-img-top" alt="...">
    <div class="card-body">
     <h5 class="card-title">${el.product_name}</h5>
     <p class="card-text">${el.price} руб.</p>
     <a href="#" id="${el.id}" name ="toBusket" class="btn btn-primary "> Удалить </a>
    </div>
   </div>
`;
  })
  .reduce((a, b) => a + b, "");

container.insertAdjacentHTML("afterbegin", HTMLs);
