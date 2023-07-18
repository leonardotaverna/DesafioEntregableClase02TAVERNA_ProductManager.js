const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.error('Todos los campos son obligatorios');
                return;
            }

            const products = await this.getProducts()

            const id = products.length === 0 ? 1 : products[products.length - 1].id + 1

            const existingProduct = products.find(product => product.code === code);
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

            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))

            console.log('Producto agregado:', product);

        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === id);
            if (product) {
                return product;
            } else {
                console.error('Not found');
            }

        } catch (error) {
            return error
        }
    }

    async updateProduct(id, product) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex ((p) => p.id === id)
            if (productIndex === -1){
                return 'No existe un producto con ese id'
            }
            const prod = products [productIndex]
            products [productIndex] = {...prod,...product}

            await fs.promises.writeFile(this.path, JSON.stringify(products))
            
        } catch (error) {
            return error
        } 
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const newProductsArray = products.filter ((p) => p.id !== id)
            if (newProductsArray === -1){
                return 'No existe un producto con ese id'
            }

            await fs.promises.writeFile(this.path,JSON.stringify(newProductsArray))

        } catch (error) {
            return error
        }
    }
}



// Testing de Product Manager:
async function testing() {
    const productManager = new ProductManager('Products.json');

    const allProducts = await productManager.getProducts();
    console.log('Listado de productos', allProducts);

    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25);

    const allProducts1 = await productManager.getProducts();
    console.log('Listado de productos', allProducts1);

    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25);

    await productManager.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'sin imagen', 'abc124', 25);

    const allProducts2 = await productManager.getProducts();
    console.log('Listado de productos', allProducts2);

    productById = await productManager.getProductById(1);
    console.log('Producto ID 1:', productById);

    const nonExistingProduct = await productManager.getProductById(3);

    await productManager.updateProduct(2, {title:'updated product'})

    const allProducts3 = await productManager.getProducts();
    console.log('Listado de productos', allProducts3);

    await productManager.deleteProduct(2)

    const allProducts4 = await productManager.getProducts();
    console.log('Listado de productos', allProducts4);
}

testing ();