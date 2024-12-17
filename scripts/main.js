import { products } from "./global.js";

const productList = document.querySelector("[data-products]");
const form = document.querySelector("[data-form]");

function createCard(id, name, price, image) {
    console.log("Creating card for product", { id, name, price, image });
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <figure class="item">
        <img class="image-products" src="${image}" alt="${name}">
        <figcaption>${name}</figcaption>
        <div class="description__container">
            <div class="item__value">
                <img class="item__icons" src="./assets/money.png" alt="Price">
            </div>
            <div class="item__value">
                <p class="item__price">
                    ${price}
                </p>
            </div>
            <div class="item__delete__container">
                <button class="item__delete">
                    <img src="./assets/delete.png" alt="Delete" class="item__delete">
                </button>
            </div>
        </div>
    </figure>`;

    // Adiciona um event listener para deletar o produto.
    const deleteBtn = card.querySelector(".item__delete");
    deleteBtn.addEventListener("click", async () => {
        try {
            const result = await products.deleteProduct(id);
            if (result.success) {
                card.remove();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    });

    return card;
}

async function loadProductCards() {
    try {
        const apiList = await products.fetchProductList();
        apiList.forEach(item =>
            productList.appendChild(createCard(item.id, item.name, item.price, item.image))
        );
    } catch (error) {
        console.error("Error loading product cards:", error);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newProduct = await products.createProduct(name, price, image);
        const newCard = createCard(newProduct.id, newProduct.name, newProduct.price, newProduct.image);
        productList.appendChild(newCard);
    } catch (error) {
        console.error("Error creating product:", error);
    }
});

loadProductCards();