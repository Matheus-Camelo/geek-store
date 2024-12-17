const url = "http://localhost:3000/products";

// Pega a lista de produtos.
async function fetchProductList() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the product list:", error);
    }
}

// Cria um produto novo.
async function createProduct(name, price, image) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                price: price,
                image: image,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error creating the product:", error);
    }
}

// Deleta um produto pelo ID.
async function deleteProduct(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });

        console.log(`Product with ID ${id} successfully deleted.`);
        return { success: true };
    } catch (error) {
        console.error("Error deleting the product:", error);
        alert("Unable to delete the product. Please try again.");
        return { success: false, error: error };
    }
}

// Exporta as funções do produto.
export const products = {
    fetchProductList,
    createProduct,
    deleteProduct,
};