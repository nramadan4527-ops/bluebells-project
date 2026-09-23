// ==========================================
// BLUEBELLS - CUSTOMIZE PAGE
// ==========================================

// Data comes from Admin Panel through localStorage.
// Nothing is hard-coded here.

let pieces = [];
let metals = [];
let charms = [];

let selectedPiece = null;
let selectedMetal = null;
let selectedCharms = [];


// ==========================================
// HTML Elements
// ==========================================

const pieceSelect = document.getElementById("pieceSelect");
const metalSelect = document.getElementById("metalSelect");
const charmsContainer = document.getElementById("charmsContainer");

const piecePreview = document.getElementById("piecePreview");
const previewName = document.getElementById("previewName");
const previewDetails = document.getElementById("previewDetails");

const totalPrice = document.getElementById("totalPrice");
const charmsCounter = document.getElementById("charmsCounter");

const addToCartBtn = document.getElementById("addToCartBtn");
const customizeMessage = document.getElementById("customizeMessage");


// ==========================================
// Load Customization Data
// ==========================================

function loadCustomizationData() {

    pieces = JSON.parse(
        localStorage.getItem("bluebellsCustomizationPieces")
    ) || [];

    metals = JSON.parse(
        localStorage.getItem("bluebellsCustomizationMetals")
    ) || [];

    charms = JSON.parse(
        localStorage.getItem("bluebellsCustomizationCharms")
    ) || [];


    // Only show active options from Admin

    pieces = pieces.filter(piece => piece.active !== false);

    metals = metals.filter(metal => metal.active !== false);

    charms = charms.filter(charm => charm.active !== false);


    displayPieces();
    displayMetals();
    displayCharms();

    calculateTotalPrice();
}


// ==========================================
// Display Pieces
// ==========================================

function displayPieces() {

    if (!pieceSelect) return;

    pieceSelect.innerHTML = `
        <option value="">Select a piece</option>
    `;


    pieces.forEach(piece => {

        const option = document.createElement("option");

        option.value = piece.id;

        option.textContent =
            `${piece.name} - ${Number(piece.price) || 0} EGP`;

        pieceSelect.appendChild(option);

    });
}


// ==========================================
// Display Metals
// ==========================================

function displayMetals() {

    if (!metalSelect) return;

    metalSelect.innerHTML = `
        <option value="">Select a metal</option>
    `;


    metals.forEach(metal => {

        const option = document.createElement("option");

        option.value = metal.id;

        option.textContent =
            `${metal.name} + ${Number(metal.extraPrice) || 0} EGP`;

        metalSelect.appendChild(option);

    });
}


// ==========================================
// Display Charms
// ==========================================

function displayCharms() {

    if (!charmsContainer) return;

    charmsContainer.innerHTML = "";


    if (charms.length === 0) {

        charmsContainer.innerHTML = `
            <p class="empty-message">
                No charms available yet.
            </p>
        `;

        return;
    }


    charms.forEach(charm => {

        const charmItem = document.createElement("label");

        charmItem.className = "charm-option";


        charmItem.innerHTML = `
            <input
                type="checkbox"
                value="${charm.id}"
            >

            <div class="charm-card">

                <img
                    src="${charm.image || ""}"
                    alt="${escapeHTML(charm.name)}"
                >

                <div class="charm-info">

                    <strong>
                        ${escapeHTML(charm.name)}
                    </strong>

                    <span>
                        + ${Number(charm.price) || 0} EGP
                    </span>

                </div>

            </div>
        `;


        const checkbox =
            charmItem.querySelector("input");


        checkbox.addEventListener("change", function () {

            if (this.checked) {

                selectedCharms.push(charm);

            } else {

                selectedCharms =
                    selectedCharms.filter(
                        item => item.id !== charm.id
                    );

            }


            updateCharmsCounter();

            calculateTotalPrice();

        });


        charmsContainer.appendChild(charmItem);

    });
}


// ==========================================
// Piece Change
// ==========================================

if (pieceSelect) {

    pieceSelect.addEventListener("change", function () {

        const pieceId = this.value;


        selectedPiece =
            pieces.find(
                piece => String(piece.id) === String(pieceId)
            ) || null;


        updatePreview();

        calculateTotalPrice();

    });

}


// ==========================================
// Metal Change
// ==========================================

if (metalSelect) {

    metalSelect.addEventListener("change", function () {

        const metalId = this.value;


        selectedMetal =
            metals.find(
                metal => String(metal.id) === String(metalId)
            ) || null;


        updatePreview();

        calculateTotalPrice();

    });

}


// ==========================================
// Update Preview
// ==========================================

function updatePreview() {

    if (!selectedPiece) {

        piecePreview.src =
            "https://via.placeholder.com/600x600?text=Your+Piece";

        previewName.textContent =
            "Your Custom Piece";

        previewDetails.textContent =
            "Select your options to start customizing.";

        return;
    }


    piecePreview.src =
        selectedPiece.image || "";


    previewName.textContent =
        selectedPiece.name;


    let details = selectedPiece.type || "";


    if (selectedMetal) {

        details +=
            ` • ${selectedMetal.name}`;

    }


    if (selectedCharms.length > 0) {

        details +=
            ` • ${selectedCharms.length} charm${selectedCharms.length > 1 ? "s" : ""}`;

    }


    previewDetails.textContent = details;

}


// ==========================================
// Update Charms Counter
// ==========================================

function updateCharmsCounter() {

    if (!charmsCounter) return;


    charmsCounter.textContent =
        `${selectedCharms.length} selected`;

}


// ==========================================
// Calculate Total Price
// ==========================================

function calculateTotalPrice() {

    let total = 0;


    // Piece price

    if (selectedPiece) {

        total +=
            Number(selectedPiece.price) || 0;

    }


    // Metal extra price

    if (selectedMetal) {

        total +=
            Number(selectedMetal.extraPrice) || 0;

    }


    // Charms prices

    selectedCharms.forEach(charm => {

        total +=
            Number(charm.price) || 0;

    });


    if (totalPrice) {

        totalPrice.textContent =
            `${total} EGP`;

    }

}


// ==========================================
// Add Customized Piece To Cart
// ==========================================

function addCustomizedPieceToCart() {

    if (!selectedPiece) {

        showMessage(
            "Please choose a piece first.",
            "error"
        );

        return;
    }


    if (!selectedMetal) {

        showMessage(
            "Please choose a metal.",
            "error"
        );

        return;
    }


    const piecePrice =
        Number(selectedPiece.price) || 0;


    const metalPrice =
        Number(selectedMetal.extraPrice) || 0;


    const charmsPrice =
        selectedCharms.reduce(
            (sum, charm) =>
                sum + (Number(charm.price) || 0),
            0
        );


    const total =
        piecePrice +
        metalPrice +
        charmsPrice;


    // Customized item

    const customizedItem = {

        id: `custom-${Date.now()}`,

        name:
            `Custom ${selectedPiece.name}`,

        price:
            total,

        quantity: 1,

        qty: 1,

        image:
            selectedPiece.image || "",


        customization: {

            piece: {

                id: selectedPiece.id,

                name: selectedPiece.name,

                type: selectedPiece.type,

                price: piecePrice,

                image: selectedPiece.image || ""

            },


            metal: {

                id: selectedMetal.id,

                name: selectedMetal.name,

                extraPrice: metalPrice,

                color: selectedMetal.color || ""

            },


            charms:
                selectedCharms.map(charm => ({

                    id: charm.id,

                    name: charm.name,

                    price:
                        Number(charm.price) || 0,

                    image:
                        charm.image || ""

                })),


            basePrice:
                piecePrice,

            metalExtra:
                metalPrice,

            charmsTotal:
                charmsPrice,

            totalPrice:
                total

        }

    };


    // ======================================
    // Add to existing cart
    // ======================================

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push(customizedItem);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    showMessage(
        "Your customized piece has been added to your cart.",
        "success"
    );


    // Update cart count if your project has one

    updateCartCount();

}


// ==========================================
// Button
// ==========================================

if (addToCartBtn) {

    addToCartBtn.addEventListener(
        "click",
        addCustomizedPieceToCart
    );

}


// ==========================================
// Message
// ==========================================

function showMessage(message, type) {

    if (!customizeMessage) return;


    customizeMessage.textContent =
        message;


    customizeMessage.className =
        `message ${type}`;


    setTimeout(() => {

        customizeMessage.textContent = "";

    }, 3000);

}


// ==========================================
// Cart Count
// ==========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || item.qty || 1),
                0
            );


        cartCount.textContent =
            count;

    }

}


// ==========================================
// Security Helper
// ==========================================

function escapeHTML(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ==========================================
// Initialize
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCustomizationData();

    }
);