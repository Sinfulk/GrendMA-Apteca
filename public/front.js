const container = document.querySelector(".container1");
const zakaz = document.querySelector(".zakaz");
getProducts = () => {
  const productLocalStorage = localStorage.getItem("busket");
  if (productLocalStorage !== null) {
    return JSON.parse(productLocalStorage);
  }
  return [];
};

let sum = () => getProducts().reduce((akb, el) => akb + el.price, 0);

const HTMLs = getProducts()
  .map((el) => {
    return `
  <div data-id="${el.id}" class="entries-list no-bullets no-padding" class="card" style="width: 18rem;">
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

const divZakaz = `<div>
  <a href="#" id="zakaz" name ="toBusket" class="btn btn-primary "> Оформить заказ </a>
  Итого:<span class="sum">${sum()}</span>руб.
  </div>`;

container.insertAdjacentHTML("afterbegin", HTMLs);
container.insertAdjacentHTML("beforeend", divZakaz);

container.addEventListener("click", async (e) => {
  e.preventDefault();
  const id = +e.target.id;
  const card = document.querySelector(`[data-id="${id}"]`);
  console.log(id);
  const productLocalStorage = localStorage.getItem("busket");
  console.log();
  if (e.target.name === "toBusket") {
    localStorage.setItem(
      "busket",
      JSON.stringify(
        JSON.parse(productLocalStorage).filter((el) => el.id !== id)
      )
    );
    const summ = document.querySelector(".sum");
    summ.innerText = `${sum()}`;
    card.remove();
  }
});

zakaz.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.name === "toBusket") {
    const response = await fetch(
      `http://localhost:3000/product/${e.target.id}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: localStorage.getItem("busket"),
      }
    );
  }
});
