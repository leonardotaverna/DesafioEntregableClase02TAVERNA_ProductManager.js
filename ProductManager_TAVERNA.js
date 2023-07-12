class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const id = this.products.length === 0 ? 1 : this.products [this.products.length - 1].id + 1

        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.error('Ya existe un producto con el mismo código');
            return;
        }

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(product);
        console.log('Producto agregado:', product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Not found');
        }
    }
}


// Testing de Product Manager:
const productManager = new ProductManager;

const allProducts = productManager.getProducts();
console.log('Listado de productos', allProducts);

productManager.addProduct('producto prueba', 'Este es un producto prueba',200,'sin imagen', 'abc123',25);

const allProducts1 = productManager.getProducts();
console.log('Listado de productos', allProducts);

productManager.addProduct('producto prueba', 'Este es un producto prueba',200,'sin imagen', 'abc123',25);

const productById = productManager.getProductById(1);
console.log('Producto ID 1:', productById);

const nonExistingProduct = productManager.getProductById(2);
