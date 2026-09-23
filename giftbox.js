// ==========================================
// BLUEBELLS - GIFT BOX
// ==========================================

// Data comes from Admin Panel.
// Nothing is hard-coded here.

let jewelry = [];
let giftBoxes = [];
let ribbons = [];
let cards = [];

let selectedJewelry = null;
let selectedBox = null;
let selectedRibbon = null;
let selectedCard = null;


// ==========================================
// HTML ELEMENTS
// ==========================================

const jewelryContainer =
    document.getElementById("jewelryContainer");

const boxContainer =
    document.getElementById("boxContainer");

const ribbonContainer =
    document.getElementById("ribbonContainer");

const cardContainer =
    document.getElementById("cardContainer");

const giftMessage =
    document.getElementById("giftMessage");

const messageCounter =
    document.getElementById("messageCounter");

const totalPrice =
    document.getElementById("totalPrice");

const previewTitle =
    document.getElementById("previewTitle");

const previewDetails =
    document.getElementById("previewDetails");

const previewMessage =
    document.getElementById("previewMessage");

const previewRibbon =
    document.getElementById("previewRibbon");

const previewJewelry =
    document.getElementById("previewJewelry");

const addGiftBoxBtn =
    document.getElementById("addGiftBoxBtn");

const giftMessageStatus =
    document.getElementById("giftMessageStatus");


// ==========================================
// LOAD DATA
// ==========================================

function loadGiftBoxData() {

    // Existing normal products
    jewelry =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];


    // Data that will be created from Admin
    giftBoxes =
        JSON.parse(
            localStorage.getItem("bluebellsGiftBoxes")
        ) || [];


    ribbons =
        JSON.parse(
            localStorage.getItem("bluebellsGiftRibbons")
        ) || [];


    cards =
        JSON.parse(
            localStorage.getItem("bluebellsGiftCards")
        ) || [];


    // Only active options

    giftBoxes =
        giftBoxes.filter(
            item => item.active !== false
        );


    ribbons =
        ribbons.filter(
            item => item.active !== false
        );


    cards =
        cards.filter(
            item => item.active !== false
        );


    displayJewelry();

    displayGiftBoxes();

    displayRibbons();

    displayCards();

    calculateTotal();

    updateCartCount();

}


// ==========================================
// DISPLAY JEWELRY
// ==========================================

function displayJewelry() {

    if (!jewelryContainer) return;


    jewelryContainer.innerHTML = "";


    if (jewelry.length === 0) {

        jewelryContainer.innerHTML = `
            <p class="empty-message">
                No jewelry available yet.
            </p>
        `;

        return;
    }


    jewelry.forEach(product => {

        const label =
            document.createElement("label");

        label.className =
            "jewelry-option";


        label.innerHTML = `

            <input
                type="radio"
                name="giftJewelry"
                value="${product.id}"
            >

            <div class="jewelry-card">

                <img
                    src="${product.image || ""}"
                    alt="${escapeHTML(product.name)}"
                >

                <span class="option-name">
                    ${escapeHTML(product.name)}
                </span>

                <span class="option-price">
                    ${Number(product.price) || 0} EGP
                </span>

            </div>
        `;


        const radio =
            label.querySelector("input");


        radio.addEventListener(
            "change",
            function () {

                selectedJewelry =
                    product;

                updatePreview();

                calculateTotal();

            }
        );


        jewelryContainer.appendChild(label);

    });
}


// ==========================================
// DISPLAY BOXES
// ==========================================

function displayGiftBoxes() {

    renderOptionList(
        boxContainer,
        giftBoxes,
        "giftBox"
    );

}


// ==========================================
// DISPLAY RIBBONS
// ==========================================

function displayRibbons() {

    renderOptionList(
        ribbonContainer,
        ribbons,
        "ribbon"
    );

}


// ==========================================
// DISPLAY CARDS
// ==========================================

function displayCards() {

    renderOptionList(
        cardContainer,
        cards,
        "card"
    );

}


// ==========================================
// GENERIC OPTION DISPLAY
// ==========================================

function renderOptionList(
    container,
    items,
    type
) {

    if (!container) return;


    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No options available yet.
            </p>
        `;

        return;
    }


    items.forEach(item => {

        const label =
            document.createElement("label");

        label.className =
            "gift-option";


        const price =
            getOptionPrice(item, type);


        label.innerHTML = `

            <input
                type="radio"
                name="gift-${type}"
                value="${item.id}"
            >

            <div class="gift-option-card">

                ${
                    item.image
                    ?
                    `
                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                    >
                    `
                    :
                    ""
                }

                <span class="option-name">
                    ${escapeHTML(item.name)}
                </span>

                <span class="option-price">
                    ${
                        price > 0
                        ? `+ ${price} EGP`
                        : "Included"
                    }
                </span>

            </div>
        `;


        const radio =
            label.querySelector("input");


        radio.addEventListener(
            "change",
            function () {

                if (type === "giftBox") {

                    selectedBox = item;

                }


                if (type === "ribbon") {

                    selectedRibbon = item;

                }


                if (type === "card") {

                    selectedCard = item;

                }


                updatePreview();

                calculateTotal();

            }
        );


        container.appendChild(label);

    });
}


// ==========================================
// GET PRICE
// ==========================================

function getOptionPrice(item, type) {

    if (type === "ribbon") {

        return Number(
            item.extraPrice ??
            item.price ??
            0
        );

    }


    return Number(
        item.price ??
        item.extraPrice ??
        0
    );

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {

    let total = 0;


    if (selectedJewelry) {

        total +=
            Number(selectedJewelry.price) || 0;

    }


    if (selectedBox) {

        total +=
            getOptionPrice(
                selectedBox,
                "giftBox"
            );

    }


    if (selectedRibbon) {

        total +=
            getOptionPrice(
                selectedRibbon,
                "ribbon"
            );

    }


    if (selectedCard) {

        total +=
            getOptionPrice(
                selectedCard,
                "card"
            );

    }


    if (totalPrice) {

        totalPrice.textContent =
            `${total} EGP`;

    }

}


// ==========================================
// PREVIEW
// ==========================================

function updatePreview() {

    let details = [];


    if (selectedJewelry) {

        details.push(
            selectedJewelry.name
        );

        previewJewelry.textContent = "✨";

    } else {

        previewJewelry.textContent = "✨";

    }


    if (selectedBox) {

        details.push(
            selectedBox.name
        );

    }


    if (selectedRibbon) {

        details.push(
            selectedRibbon.name
        );


        if (selectedRibbon.color) {

            previewRibbon.style.background =
                selectedRibbon.color;

        }

    }


    if (selectedCard) {

        details.push(
            selectedCard.name
        );

    }


    previewTitle.textContent =
        selectedJewelry
        ? `Gift for ${selectedJewelry.name}`
        : "Your Gift Box";


    previewDetails.textContent =
        details.length > 0
        ? details.join(" • ")
        : "Start choosing your gift options.";


    const message =
        giftMessage
        ? giftMessage.value.trim()
        : "";


    previewMessage.textContent =
        message;

}


// ==========================================
// MESSAGE COUNTER
// ==========================================

if (giftMessage) {

    giftMessage.addEventListener(
        "input",
        function () {

            messageCounter.textContent =
                `${this.value.length} / 200`;

            updatePreview();

        }
    );

}


// ==========================================
// ADD TO CART
// ==========================================

function addGiftBoxToCart() {

    if (!selectedJewelry) {

        showStatus(
            "Please choose your jewelry first.",
            "error"
        );

        return;
    }


    if (!selectedBox) {

        showStatus(
            "Please choose a gift box.",
            "error"
        );

        return;
    }


    const jewelryPrice =
        Number(selectedJewelry.price) || 0;


    const boxPrice =
        selectedBox
        ? getOptionPrice(
            selectedBox,
            "giftBox"
        )
        : 0;


    const ribbonPrice =
        selectedRibbon
        ? getOptionPrice(
            selectedRibbon,
            "ribbon"
        )
        : 0;


    const cardPrice =
        selectedCard
        ? getOptionPrice(
            selectedCard,
            "card"
        )
        : 0;


    const total =
        jewelryPrice +
        boxPrice +
        ribbonPrice +
        cardPrice;


    const customizedGiftBox = {

        id:
            `giftbox-${Date.now()}`,

        name:
            `Gift Box - ${selectedJewelry.name}`,

        price:
            total,

        quantity:
            1,

        qty:
            1,

        image:
            selectedJewelry.image || "",


        customization: {

            jewelry: {

                id:
                    selectedJewelry.id,

                name:
                    selectedJewelry.name,

                price:
                    jewelryPrice,

                image:
                    selectedJewelry.image || ""

            },


            giftBox:
                selectedBox
                ? {
                    id:
                        selectedBox.id,

                    name:
                        selectedBox.name,

                    price:
                        boxPrice,

                    image:
                        selectedBox.image || ""
                }
                : null,


            ribbon:
                selectedRibbon
                ? {
                    id:
                        selectedRibbon.id,

                    name:
                        selectedRibbon.name,

                    price:
                        ribbonPrice,

                    color:
                        selectedRibbon.color || ""

                }
                : null,


            card:
                selectedCard
                ? {
                    id:
                        selectedCard.id,

                    name:
                        selectedCard.name,

                    price:
                        cardPrice,

                    image:
                        selectedCard.image || ""

                }
                : null,


            message:
                giftMessage
                ? giftMessage.value.trim()
                : "",


            jewelryPrice:
                jewelryPrice,

            boxPrice:
                boxPrice,

            ribbonPrice:
                ribbonPrice,

            cardPrice:
                cardPrice,

            totalPrice:
                total

        }

    };


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push(
        customizedGiftBox
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showStatus(
        "Your Gift Box has been added to your cart.",
        "success"
    );

}


// ==========================================
// BUTTON
// ==========================================

if (addGiftBoxBtn) {

    addGiftBoxBtn.addEventListener(
        "click",
        addGiftBoxToCart
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) return;


    const count =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity ||
                        item.qty ||
                        1
                    );

            },
            0
        );


    cartCount.textContent =
        count;

}


// ==========================================
// STATUS
// ==========================================

function showStatus(
    message,
    type
) {

    if (!giftMessageStatus) return;


    giftMessageStatus.textContent =
        message;


    giftMessageStatus.className =
        `status-message ${type}`;


    setTimeout(
        () => {

            giftMessageStatus.textContent =
                "";

            giftMessageStatus.className =
                "status-message";

        },
        3500
    );

}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    return String(value ?? "")

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGiftBoxData();

    }
);