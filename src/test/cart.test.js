// fetch test to backend API
const BACKEND_API = 'http://localhost:8080/api/carts';

// router.post("/", controller.addCart);
const addCart = async () => {
    const response = await fetch(BACKEND_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return response.json();
}

// router.post("/:cid/product/:pid", controller.addProduct);
const addProductToCart = async (cid, pid) => {
    const response = await fetch(`${BACKEND_API}/${cid}/product/${pid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}


// router.delete("/:cid/product/:pid", controller.deleteProduct);
const deleteProductFromCart = async (cid, pid) => {
    const response = await fetch(`${BACKEND_API}/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

// router.put("/:cid", controller.updateCartProducts);
const updateCartProducts = async (cid, products) => {
    const response = await fetch(`${BACKEND_API}/${cid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products })
    });
    return response.json();
}

// router.put("/:cid/product/:pid", controller.updateProductQuantity);
const updateProductQuantity = async (cid, pid, quantity) => {
    const response = await fetch(`${BACKEND_API}/${cid}/product/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    });
    return response.json();
}

// router.delete("/:cid", controller.clearCart);
const clearCart = async (cid) => {
    const response = await fetch(`${BACKEND_API}/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}