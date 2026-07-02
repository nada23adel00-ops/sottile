// =======================
// تغيير اللون والصورة
// =======================

const colorButtons = document.querySelectorAll(".color");
const mainImage = document.getElementById("main-image");
const productCode = document.getElementById("product-code");

if (colorButtons.length && mainImage && productCode) {

    colorButtons.forEach(button => {

        button.addEventListener("click", () => {

            colorButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            mainImage.src = button.dataset.image;
            productCode.textContent = button.dataset.code;

        });

    });

}

// =======================
// اختيار المقاس
// =======================

const sizeButtons = document.querySelectorAll(".size-btn");

if (sizeButtons.length) {

    sizeButtons.forEach(button => {

        button.addEventListener("click", () => {

            sizeButtons.forEach(btn => btn.classList.remove("active-size"));

            button.classList.add("active-size");

        });

    });

}

// =======================
// الكمية
// =======================

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qty = document.getElementById("qty");

let quantity = 1;

if (minusBtn && plusBtn && qty) {

    plusBtn.addEventListener("click", () => {

        quantity++;
        qty.textContent = quantity;

    });

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;
            qty.textContent = quantity;

        }

    });

}

// =======================
// إضافة إلى السلة
// =======================

const addCartBtn = document.querySelector(".add-cart");

if (addCartBtn) {

    addCartBtn.addEventListener("click", () => {

        const selectedSize = document.querySelector(".size-btn.active-size");

        if (!selectedSize) {

            alert("من فضلك اختاري المقاس أولاً");
            return;

        }

        const product = {

            name: addCartBtn.dataset.name,
            price: Number(addCartBtn.dataset.price),
            code: productCode.textContent,
            image: mainImage.src,
            size: selectedSize.textContent,
            quantity: quantity

        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("✅ تمت إضافة المنتج إلى السلة");

    });

}

// =======================
// تحديث عداد السلة
// =======================

const cartCount = document.getElementById("cart-count");

function updateCartCount() {

    if (!cartCount) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.textContent = totalItems;

}

updateCartCount();

// =======================
// صفحة السلة
// =======================

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if (cartItems && totalPrice) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h2>السلة فارغة 🛒</h2>";

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>Code: ${item.code}</p>

                    <p>Size: ${item.size}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <p>${item.price} LE</p>

                </div>

                <button onclick="removeItem(${index})">
                    🗑️
                </button>

            </div>
            `;

        });

    }

    totalPrice.textContent = total;

}

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}
// =======================
// Checkout Page
// =======================

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    const SHIPPING = 85;

    const subtotalPrice = document.getElementById("subtotal-price");
    const shippingPrice = document.getElementById("shipping-price");
    const finalTotal = document.getElementById("final-total");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    subtotalPrice.textContent = subtotal + " جنيه";

    shippingPrice.textContent = SHIPPING + " جنيه";

    finalTotal.textContent = (subtotal + SHIPPING) + " جنيه";

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (cart.length === 0) {

            alert("السلة فارغة");

            return;

        }

        const name = document.getElementById("customer-name").value.trim();

        const phone = document.getElementById("customer-phone").value.trim();

        const city = document.getElementById("customer-city").value;

        const area = document.getElementById("customer-area").value.trim();

        const address = document.getElementById("customer-address").value.trim();

        const note = document.getElementById("customer-note").value.trim();

        if (name === "") {

            alert("من فضلك ادخل الاسم");

            return;

        }

        if (!/^01[0125][0-9]{8}$/.test(phone)) {

            alert("رقم الهاتف غير صحيح");

            return;

        }

        if (city === "") {

            alert("اختر المحافظة");

            return;

        }

        if (area === "") {

            alert("ادخل المنطقة");

            return;

        }

        if (address === "") {

            alert("ادخل العنوان");

            return;

        }

        let message = "🛍️ *طلب جديد - Sottile Store*%0A%0A";

        message += "👤 الاسم: " + name + "%0A";

        message += "📞 الهاتف: " + phone + "%0A";

        message += "📍 المحافظة: " + city + "%0A";

        message += "📌 المنطقة: " + area + "%0A";

        message += "🏠 العنوان: " + address + "%0A%0A";

        message += "━━━━━━━━━━━━━━%0A";

        message += "🛒 *المنتجات*%0A%0A";cart.forEach(item => {

            message += "👟 " + item.name + "%0A";

            message += "🔖 الكود: " + item.code + "%0A";

            message += "📏 المقاس: " + item.size + "%0A";

            message += "🔢 الكمية: " + item.quantity + "%0A";

            message += "💰 السعر: " + item.price + " جنيه%0A";

            message += "━━━━━━━━━━━━━━%0A";

        });

        message += "%0A";

        message += "💵 إجمالي المنتجات: " + subtotal + " جنيه%0A";

        message += "🚚 الشحن: " + SHIPPING + " جنيه%0A";

        message += "💳 الإجمالي النهائي: " + (subtotal + SHIPPING) + " جنيه%0A";

        if (note !== "") {

            message += "%0A📝 ملاحظات:%0A" + note + "%0A";

        }

        const whatsappNumber = "201098183723";

        window.open(

            "https://wa.me/" + whatsappNumber + "?text=" + message,

            "_blank"

        );

        localStorage.removeItem("cart");

    });

}
// =======================
// Checkout Button
// =======================

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            alert("🛒 السلة فارغة");

            return;

        }

        window.location.href = "checkout.html";

    });

}