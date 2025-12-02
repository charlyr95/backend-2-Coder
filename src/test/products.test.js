// fetch test to backend API
const BACKEND_API = 'http://localhost:8080/api/products';

const sampleProduct1 = { title: "Test Product", description: "This is a test product", price: 9.99, thumbnail: "http://example.com/image.png", code: "TEST123", stock: 100, category: "test-category" }; 
const sampleProduct2 = { title: "Test Product", description: "This is a test product", price: 9.99, thumbnail: "http://example.com/image.png", code: "TEST124", stock: 100, category: "test-category" }; 
const sampleProduct3 = { title: "Test Product", description: "This is a test product", price: 9.99, thumbnail: "http://example.com/image.png", code: "TEST125", stock: 100, category: "test-category" };

// router.post("/", controller.addProduct);
const addProduct = async (product) => {
    const response = await fetch(BACKEND_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
}

// router.put("/:pid", controller.updateProduct);
const updateProduct = async (pid) => {
    const response = await fetch(`${BACKEND_API}/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: 12345 })
    });
    const data = await response.json();
    return data;
}

// router.delete("/:pid", controller.deleteProduct);
const deleteProduct = async (pid) => {
    const response = await fetch(`${BACKEND_API}/${pid}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

await addProduct(sampleProduct1);
await addProduct(sampleProduct2);
await addProduct(sampleProduct3);

