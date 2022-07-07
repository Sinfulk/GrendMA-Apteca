class LocalStorageUtil {
  constructor() {
    this.keyName = 'products';
  }

  getProducts() {
    const productLocalStorage = localStorage.getItem(this.keyName);
    if (productLocalStorage !== null) {
      return JSON.parse(productLocalStorage);
    }
    return [];
  }
}

const localStorageUtil = new LocalStorageUtil();

const a = localStorageUtil.getProducts();
console.log(a);
