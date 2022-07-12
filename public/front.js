const container = document.querySelector('.container1');
getProducts = () => {
  const productLocalStorage = localStorage.getItem('busket');
  if (productLocalStorage !== null) {
    return JSON.parse(productLocalStorage);
  }
  return [];
};

const sum = () => getProducts().reduce((akb, el) => akb + el.price, 0);

const HTMLs = getProducts()
  .map((el) => `
  <div data-id="${el.id}" class="oneItem">
  <h5 class="name"> ${el.product_name}</h5>
  <div class="divImg">
  <img 
    class="img" 
    src="${el.picture}" 
    alt="...">
  </div>
  <div class="price">${el.price} ₽.</div>
  <a href="#" id="${el.id}" name ="toBusket" class="btn btn-primary "> Удалить </a>
  </div>
  `)
  .reduce((a, b) => a + b, '');

const divZakaz = `<div>
<a href="#" id="zakaz" name ="toBusket" class="btn btn-primary "> Оформить заказ </a>
Итого:<span class="sum">${sum()}</span>руб.
</div>`;

container.insertAdjacentHTML('afterbegin', HTMLs);
container.insertAdjacentHTML('afterend', divZakaz);

container.addEventListener('click', async (e) => {
  e.preventDefault();
  const id = +e.target.id;
  const card = document.querySelector(`[data-id="${id}"]`);

  const productLocalStorage = localStorage.getItem('busket');
  if (e.target.name === 'toBusket') {
    localStorage.setItem(
      'busket',
      JSON.stringify(
        JSON.parse(productLocalStorage).filter((el) => el.id !== id),
      ),
    );
    const summ = document.querySelector('.sum');
    summ.innerText = `${sum()}`;
    card.remove();
  }
});

const zakaz = document.querySelector('#zakaz');
zakaz.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.name === 'toBusket') {
    const response = await fetch('http://localhost:3000/order/', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: localStorage.getItem('busket'),
    });
    if (response.ok) {
      const order = getProducts()
        .map((el) => `<div class="name">${el.product_name} - ${el.price} ₽</div>`)
        .reduce((akb, el) => akb + el, '');
      container.insertAdjacentHTML('afterend', order);
      container.insertAdjacentHTML(
        'afterend',
        '<h5> Заказ Успешно оформлен</h5>',
      );
      container.remove();
      zakaz.remove();

      localStorage.clear();
    }
    // else {
    // window.location.replace('/entries/auth');
    // container.remove();
    // zakaz.remove();
    // }
  }
});
