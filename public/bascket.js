const { json } = require("sequelize/types");

const main = document.querySelector(".main");

main.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.name === "toBusket") {
    const response = await fetch(
      `http://127.0.0.1:3000/product/${e.target.id}`
    );
    if (response.ok) {
      const data = await response.json();
      if (localStorage.busket) {
        localStorage.busket = JSON.stringify([
          ...JSON.parse(localStorage.busket),
          data,
        ]);
      } else localStorage.busket = JSON.stringify([data]);
    } else console.log("Понял запрос нет продукта ");
  }
});
