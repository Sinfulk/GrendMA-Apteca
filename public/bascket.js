const main = document.querySelector('.main');
main.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.name === 'toBusket') {
    const response = await fetch(
      `http://localhost:3000/product/${e.target.id}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log('>>>>>>', data);
      if (localStorage.busket) {
        localStorage.busket = JSON.stringify([
          ...JSON.parse(localStorage.busket),
          data,
        ]);
      } else localStorage.busket = JSON.stringify([data]);
    } else console.log('Понял запрос нет продукта ');
  }
});
