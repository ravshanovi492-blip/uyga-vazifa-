
const cars = [
    {
        name: "BMW M5 Competition",
        brand: "BMW",
        price: 115000,
        year: 2025,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"
    },
    {
        name: "Mercedes AMG GT",
        brand: "Mercedes",
        price: 145000,
        year: 2025,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"
    },
    {
        name: "Porsche 911",
        brand: "Porsche",
        price: 135000,
        year: 2025,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
    },
    {
        name: "BMW M4",
        brand: "BMW",
        price: 85000,
        year: 2024,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
    },
    {
        name: "Mercedes S-Class",
        brand: "Mercedes",
        price: 125000,
        year: 2025,
        image: "https://images.unsplash.com/photo-1618843479618-39b4f4a3f7e1?w=800"
    },
    {
        name: "Porsche 718",
        brand: "Porsche",
        price: 95000,
        year: 2024,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800"
    }
];

let cart = [];
let currentFilter = "all";

const grid = document.getElementById("carsGrid");

function renderCars() {
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = cars.filter(car => {
        const matchesBrand =
            currentFilter === "all" || car.brand === currentFilter;

        const matchesSearch =
            car.name.toLowerCase().includes(search);

        return matchesBrand && matchesSearch;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = "<h3>Avtomobil topilmadi!</h3>";
        return;
    }

    filtered.forEach(car => {
        const index = cars.indexOf(car);

        grid.innerHTML += `
            <div class="car-card">
                <img src="${car.image}" alt="${car.name}"
                     onerror="this.src='https://placehold.co/600x400/111d30/ffffff?text=IBROHIM+CARS'">
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p>🏁 Brend: ${car.brand}</p>
                    <p>📅 Yili: ${car.year}</p>
                    <p class="price">$${car.price.toLocaleString("en-US")}</p>
                    <button class="add-btn" onclick="addToCart(${index})">
                        🛒 Savatga qo‘shish
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCars(brand, button) {
    currentFilter = brand;

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    renderCars();
}

document.getElementById("search").addEventListener("input", renderCars);

function addToCart(index) {
    cart.push(cars[index]);
    updateCart();
    alert(cars[index].name + " savatga qo‘shildi!");
}

function updateCart() {
    document.getElementById("cartCount").textContent = cart.length;
}

function showCart() {
    document.getElementById("cartModal").style.display = "flex";

    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Savatingiz hozircha bo‘sh.</p>";
    }

    cart.forEach((car, index) => {
        total += car.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${car.name}</strong>
                    <p>$${car.price.toLocaleString("en-US")}</p>
                </div>
                <button class="remove-btn"
                    onclick="removeCar(${index})">O‘chirish</button>
            </div>
        `;
    });

    totalElement.textContent =
        "Jami: $" + total.toLocaleString("en-US");
}

function removeCar(index) {
    cart.splice(index, 1);
    updateCart();
    showCart();
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Avval savatga avtomobil qo‘shing!");
        return;
    }

    alert("Buyurtmangiz qabul qilindi! Tez orada siz bilan bog‘lanamiz.");

    cart = [];
    updateCart();
    closeCart();
}

renderCars();
