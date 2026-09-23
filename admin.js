// ==========================================
// BLUEBELLS - ADMIN PANEL
// ==========================================


// ==========================================
// HELPER
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
// IMAGE PREVIEW
// ==========================================

function setupImagePreview(inputId, previewId) {

    const input =
        document.getElementById(inputId);

    const preview =
        document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener(
        "change",
        function () {

            const file =
                input.files[0];

            if (!file) return;

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    preview.src =
                        event.target.result;

                    preview.style.display =
                        "block";

                };

            reader.readAsDataURL(file);

        }
    );

}


// ==========================================
// PRODUCTS
// ==========================================

let products =
    JSON.parse(
        localStorage.getItem("products")
    ) || [];


const adminProducts =
    document.getElementById(
        "adminProducts"
    );


setupImagePreview(
    "image",
    "preview"
);


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct() {

    const nameInput =
        document.getElementById("name");

    const priceInput =
        document.getElementById("price");

    const imageInput =
        document.getElementById("image");

    if (!nameInput || !priceInput || !imageInput) {

        alert("Product form could not be found.");

        return;
    }


    const name =
        nameInput.value.trim();


    const price =
        Number(priceInput.value);


    const file =
        imageInput.files[0];


    // CHECK NAME

    if (!name) {

        alert(
            "Please enter the product name."
        );

        return;
    }


    // CHECK PRICE

    if (
        priceInput.value === "" ||
        Number.isNaN(price) ||
        price < 0
    ) {

        alert(
            "Please enter a valid product price."
        );

        return;
    }


    // CHECK IMAGE

    if (!file) {

        alert(
            "Please choose a product image."
        );

        return;
    }


    // READ IMAGE

    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            const product = {

                id:
                    Date.now(),

                name:
                    name,

                price:
                    price,

                image:
                    event.target.result

            };


            // ADD PRODUCT

            products.push(product);


            // SAVE PRODUCT

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );


            // SHOW PRODUCTS

            renderProducts();


            // CLEAR FORM

            nameInput.value = "";

            priceInput.value = "";

            imageInput.value = "";


            const preview =
                document.getElementById(
                    "preview"
                );


            if (preview) {

                preview.src = "";

                preview.style.display =
                    "none";

            }


            alert(
                "Product added successfully!"
            );

        };


    reader.onerror =
        function () {

            alert(
                "Could not read the image. Please try again."
            );

        };


    reader.readAsDataURL(file);

}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts() {

    if (!adminProducts) return;


    if (products.length === 0) {

        adminProducts.innerHTML =
            `
            <p class="empty-state">
                No products added yet.
            </p>
            `;

        return;
    }


    adminProducts.innerHTML =
        products
            .map(product => `

                <div class="card">

                    <img
                        src="${product.image || ""}"
                        alt="${escapeHTML(product.name)}"
                    >

                    <h4>
                        ${escapeHTML(product.name)}
                    </h4>

                    <p>
                        ${Number(product.price) || 0} EGP
                    </p>

                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteProduct(${JSON.stringify(product.id)})"
                    >
                        Delete
                    </button>

                </div>

            `)
            .join("");

}


// ==========================================
// DELETE PRODUCT
// ==========================================

function deleteProduct(id) {

    if (
        !confirm(
            "Delete this product?"
        )
    ) return;


    products =
        products.filter(
            product =>
                product.id !== id
        );


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    renderProducts();

}


// ==========================================
// CUSTOMIZE DATA
// ==========================================

let customizationPieces =
    JSON.parse(
        localStorage.getItem(
            "bluebellsCustomizationPieces"
        )
    ) || [];


let customizationMetals =
    JSON.parse(
        localStorage.getItem(
            "bluebellsCustomizationMetals"
        )
    ) || [];


let customizationCharms =
    JSON.parse(
        localStorage.getItem(
            "bluebellsCustomizationCharms"
        )
    ) || [];


// ==========================================
// CUSTOMIZE IMAGE PREVIEWS
// ==========================================

setupImagePreview(
    "customPieceImage",
    "customPiecePreview"
);


setupImagePreview(
    "customCharmImage",
    "customCharmPreview"
);


// ==========================================
// SAVE CUSTOMIZATION
// ==========================================

function saveCustomizationData() {

    localStorage.setItem(
        "bluebellsCustomizationPieces",
        JSON.stringify(
            customizationPieces
        )
    );


    localStorage.setItem(
        "bluebellsCustomizationMetals",
        JSON.stringify(
            customizationMetals
        )
    );


    localStorage.setItem(
        "bluebellsCustomizationCharms",
        JSON.stringify(
            customizationCharms
        )
    );

}


// ==========================================
// ADD PIECE
// ==========================================

function addCustomizationPiece() {

    const name =
        document
            .getElementById(
                "customPieceName"
            )
            .value
            .trim();


    const type =
        document
            .getElementById(
                "customPieceType"
            )
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById(
                    "customPiecePrice"
                )
                .value
        );


    const preview =
        document.getElementById(
            "customPiecePreview"
        );


    const active =
        document.getElementById(
            "customPieceActive"
        ).checked;


    if (
        !name ||
        !type ||
        Number.isNaN(price) ||
        price < 0 ||
        !preview.src ||
        preview.style.display === "none"
    ) {

        alert(
            "Please fill the piece name, type, price and image."
        );

        return;
    }


    const piece = {

        id:
            Date.now(),

        name:
            name,

        type:
            type,

        price:
            price,

        image:
            preview.src,

        active:
            active

    };


    customizationPieces.push(
        piece
    );


    saveCustomizationData();

    renderCustomizationLists();

    clearPieceForm();

}


// ==========================================
// ADD METAL
// ==========================================

function addCustomizationMetal() {

    const name =
        document
            .getElementById(
                "customMetalName"
            )
            .value
            .trim();


    const extraPrice =
        Number(
            document
                .getElementById(
                    "customMetalExtra"
                )
                .value
        );


    const color =
        document
            .getElementById(
                "customMetalColor"
            )
            .value;


    const active =
        document.getElementById(
            "customMetalActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(extraPrice) ||
        extraPrice < 0
    ) {

        alert(
            "Please fill the metal name and extra price."
        );

        return;
    }


    const metal = {

        id:
            Date.now(),

        name:
            name,

        extraPrice:
            extraPrice,

        color:
            color,

        active:
            active

    };


    customizationMetals.push(
        metal
    );


    saveCustomizationData();

    renderCustomizationLists();

    clearMetalForm();

}


// ==========================================
// ADD CHARM
// ==========================================

function addCustomizationCharm() {

    const name =
        document
            .getElementById(
                "customCharmName"
            )
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById(
                    "customCharmPrice"
                )
                .value
        );


    const preview =
        document.getElementById(
            "customCharmPreview"
        );


    const active =
        document.getElementById(
            "customCharmActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0 ||
        !preview.src ||
        preview.style.display === "none"
    ) {

        alert(
            "Please fill the charm name, price and image."
        );

        return;
    }


    const charm = {

        id:
            Date.now(),

        name:
            name,

        price:
            price,

        image:
            preview.src,

        active:
            active

    };


    customizationCharms.push(
        charm
    );


    saveCustomizationData();

    renderCustomizationLists();

    clearCharmForm();

}


// ==========================================
// RENDER CUSTOMIZATION
// ==========================================

function renderCustomizationLists() {

    renderPieces();

    renderMetals();

    renderCharms();

}


// ==========================================
// RENDER PIECES
// ==========================================

function renderPieces() {

    const container =
        document.getElementById(
            "customPiecesList"
        );


    if (!container) return;


    if (
        customizationPieces.length === 0
    ) {

        container.innerHTML =
            `
            <p class="empty-state">
                No pieces added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        customizationPieces
            .map(item => `

                <div class="option-item">

                    <img
                        src="${item.image || ""}"
                        alt="${escapeHTML(item.name)}"
                    >

                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            Type:
                            ${escapeHTML(item.type)}
                        </span>

                        <span>
                            ${Number(item.price) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleCustomization(
                                'piece',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteCustomizationPiece(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// RENDER METALS
// ==========================================

function renderMetals() {

    const container =
        document.getElementById(
            "customMetalsList"
        );


    if (!container) return;


    if (
        customizationMetals.length === 0
    ) {

        container.innerHTML =
            `
            <p class="empty-state">
                No metals added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        customizationMetals
            .map(item => `

                <div class="option-item">

                    <div
                        class="metal-color"
                        style="
                            background:${item.color || "#D4AF37"};
                        "
                    ></div>


                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            + ${Number(item.extraPrice) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleCustomization(
                                'metal',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteCustomizationMetal(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// RENDER CHARMS
// ==========================================

function renderCharms() {

    const container =
        document.getElementById(
            "customCharmsList"
        );


    if (!container) return;


    if (
        customizationCharms.length === 0
    ) {

        container.innerHTML =
            `
            <p class="empty-state">
                No charms added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        customizationCharms
            .map(item => `

                <div class="option-item">

                    <img
                        src="${item.image || ""}"
                        alt="${escapeHTML(item.name)}"
                    >


                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            ${Number(item.price) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleCustomization(
                                'charm',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteCustomizationCharm(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// TOGGLE CUSTOMIZATION
// ==========================================

function toggleCustomization(
    type,
    id
) {

    let list;


    if (type === "piece") {

        list =
            customizationPieces;

    }


    if (type === "metal") {

        list =
            customizationMetals;

    }


    if (type === "charm") {

        list =
            customizationCharms;

    }


    if (!list) return;


    const item =
        list.find(
            item =>
                item.id === id
        );


    if (!item) return;


    item.active =
        !item.active;


    saveCustomizationData();

    renderCustomizationLists();

}


// ==========================================
// DELETE PIECE
// ==========================================

function deleteCustomizationPiece(id) {

    if (
        !confirm(
            "Delete this piece?"
        )
    ) return;


    customizationPieces =
        customizationPieces.filter(
            item =>
                item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}


// ==========================================
// DELETE METAL
// ==========================================

function deleteCustomizationMetal(id) {

    if (
        !confirm(
            "Delete this metal?"
        )
    ) return;


    customizationMetals =
        customizationMetals.filter(
            item =>
                item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}


// ==========================================
// DELETE CHARM
// ==========================================

function deleteCustomizationCharm(id) {

    if (
        !confirm(
            "Delete this charm?"
        )
    ) return;


    customizationCharms =
        customizationCharms.filter(
            item =>
                item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}


// ==========================================
// CLEAR CUSTOMIZATION FORMS
// ==========================================

function clearPieceForm() {

    document.getElementById(
        "customPieceName"
    ).value = "";


    document.getElementById(
        "customPieceType"
    ).value = "";


    document.getElementById(
        "customPiecePrice"
    ).value = "";


    document.getElementById(
        "customPieceImage"
    ).value = "";


    document.getElementById(
        "customPieceActive"
    ).checked = true;


    const preview =
        document.getElementById(
            "customPiecePreview"
        );


    preview.src = "";

    preview.style.display =
        "none";

}


function clearMetalForm() {

    document.getElementById(
        "customMetalName"
    ).value = "";


    document.getElementById(
        "customMetalExtra"
    ).value = "";


    document.getElementById(
        "customMetalColor"
    ).value = "#D4AF37";


    document.getElementById(
        "customMetalActive"
    ).checked = true;

}


function clearCharmForm() {

    document.getElementById(
        "customCharmName"
    ).value = "";


    document.getElementById(
        "customCharmPrice"
    ).value = "";


    document.getElementById(
        "customCharmImage"
    ).value = "";


    document.getElementById(
        "customCharmActive"
    ).checked = true;


    const preview =
        document.getElementById(
            "customCharmPreview"
        );


    preview.src = "";

    preview.style.display =
        "none";

}


// ==========================================
// GIFT BOX DATA
// ==========================================

let giftBoxes =
    JSON.parse(
        localStorage.getItem(
            "bluebellsGiftBoxes"
        )
    ) || [];


let giftRibbons =
    JSON.parse(
        localStorage.getItem(
            "bluebellsGiftRibbons"
        )
    ) || [];


let giftCards =
    JSON.parse(
        localStorage.getItem(
            "bluebellsGiftCards"
        )
    ) || [];


// ==========================================
// GIFT BOX IMAGE PREVIEWS
// ==========================================

setupImagePreview(
    "giftBoxImage",
    "giftBoxPreview"
);


setupImagePreview(
    "giftRibbonImage",
    "giftRibbonPreview"
);


setupImagePreview(
    "giftCardImage",
    "giftCardPreview"
);


// ==========================================
// SAVE GIFT BOX DATA
// ==========================================

function saveGiftBoxData() {

    localStorage.setItem(
        "bluebellsGiftBoxes",
        JSON.stringify(
            giftBoxes
        )
    );


    localStorage.setItem(
        "bluebellsGiftRibbons",
        JSON.stringify(
            giftRibbons
        )
    );


    localStorage.setItem(
        "bluebellsGiftCards",
        JSON.stringify(
            giftCards
        )
    );

}


// ==========================================
// ADD GIFT BOX
// ==========================================

function addGiftBox() {

    const name =
        document
            .getElementById(
                "giftBoxName"
            )
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById(
                    "giftBoxPrice"
                )
                .value
        );


    const preview =
        document.getElementById(
            "giftBoxPreview"
        );


    const active =
        document.getElementById(
            "giftBoxActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0 ||
        !preview.src ||
        preview.style.display === "none"
    ) {

        alert(
            "Please fill the gift box name, price and image."
        );

        return;
    }


    const box = {

        id:
            Date.now(),

        name:
            name,

        price:
            price,

        image:
            preview.src,

        active:
            active

    };


    giftBoxes.push(box);


    saveGiftBoxData();

    renderGiftBoxAdmin();

    clearGiftBoxForm();

}


// ==========================================
// ADD RIBBON
// ==========================================

function addGiftRibbon() {

    const name =
        document
            .getElementById(
                "giftRibbonName"
            )
            .value
            .trim();


    const extraPrice =
        Number(
            document
                .getElementById(
                    "giftRibbonPrice"
                )
                .value
        );


    const color =
        document
            .getElementById(
                "giftRibbonColor"
            )
            .value;


    const preview =
        document.getElementById(
            "giftRibbonPreview"
        );


    const active =
        document.getElementById(
            "giftRibbonActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(extraPrice) ||
        extraPrice < 0
    ) {

        alert(
            "Please enter the ribbon name and extra price."
        );

        return;
    }


    const ribbon = {

        id:
            Date.now(),

        name:
            name,

        extraPrice:
            extraPrice,

        color:
            color,

        image:
            preview.style.display !== "none"
                ? preview.src
                : "",

        active:
            active

    };


    giftRibbons.push(ribbon);


    saveGiftBoxData();

    renderGiftBoxAdmin();

    clearGiftRibbonForm();

}


// ==========================================
// ADD CARD
// ==========================================

function addGiftCard() {

    const name =
        document
            .getElementById(
                "giftCardName"
            )
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById(
                    "giftCardPrice"
                )
                .value
        );


    const preview =
        document.getElementById(
            "giftCardPreview"
        );


    const active =
        document.getElementById(
            "giftCardActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0
    ) {

        alert(
            "Please enter the card name and price."
        );

        return;
    }


    const card = {

        id:
            Date.now(),

        name:
            name,

        price:
            price,

        image:
            preview.style.display !== "none"
                ? preview.src
                : "",

        active:
            active

    };


    giftCards.push(card);


    saveGiftBoxData();

    renderGiftBoxAdmin();

    clearGiftCardForm();

}


// ==========================================
// RENDER GIFT BOX ADMIN
// ==========================================

function renderGiftBoxAdmin() {

    renderGiftBoxes();

    renderGiftRibbons();

    renderGiftCards();

}


// ==========================================
// RENDER GIFT BOXES
// ==========================================

function renderGiftBoxes() {

    const container =
        document.getElementById(
            "giftBoxesList"
        );


    if (!container) return;


    if (giftBoxes.length === 0) {

        container.innerHTML =
            `
            <p class="empty-state">
                No gift boxes added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        giftBoxes
            .map(item => `

                <div class="option-item">

                    ${
                        item.image
                        ?
                        `<img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                        >`
                        :
                        ""
                    }

                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            ${Number(item.price) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleGiftOption(
                                'box',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteGiftBox(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// RENDER RIBBONS
// ==========================================

function renderGiftRibbons() {

    const container =
        document.getElementById(
            "giftRibbonsList"
        );


    if (!container) return;


    if (giftRibbons.length === 0) {

        container.innerHTML =
            `
            <p class="empty-state">
                No ribbons added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        giftRibbons
            .map(item => `

                <div class="option-item">

                    ${
                        item.image
                        ?
                        `<img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                        >`
                        :
                        `
                        <div
                            class="metal-color"
                            style="
                                background:${item.color || "#B49668"};
                            "
                        ></div>
                        `
                    }

                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            + ${Number(item.extraPrice) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleGiftOption(
                                'ribbon',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteGiftRibbon(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// RENDER CARDS
// ==========================================

function renderGiftCards() {

    const container =
        document.getElementById(
            "giftCardsList"
        );


    if (!container) return;


    if (giftCards.length === 0) {

        container.innerHTML =
            `
            <p class="empty-state">
                No cards added yet.
            </p>
            `;

        return;
    }


    container.innerHTML =
        giftCards
            .map(item => `

                <div class="option-item">

                    ${
                        item.image
                        ?
                        `<img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                        >`
                        :
                        ""
                    }

                    <div class="option-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            ${Number(item.price) || 0} EGP
                        </span>

                        <span
                            class="availability ${
                                item.active
                                    ? "active"
                                    : "inactive"
                            }"
                        >
                            ${
                                item.active
                                    ? "Available"
                                    : "Hidden"
                            }
                        </span>

                    </div>


                    <div class="option-actions">

                        <button
                            type="button"
                            class="small-btn"
                            onclick="toggleGiftOption(
                                'card',
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            ${
                                item.active
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>


                        <button
                            type="button"
                            class="small-delete"
                            onclick="deleteGiftCard(
                                ${JSON.stringify(item.id)}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `)
            .join("");

}


// ==========================================
// TOGGLE GIFT OPTION
// ==========================================

function toggleGiftOption(
    type,
    id
) {

    let list;


    if (type === "box") {

        list =
            giftBoxes;

    }


    if (type === "ribbon") {

        list =
            giftRibbons;

    }


    if (type === "card") {

        list =
            giftCards;

    }


    if (!list) return;


    const item =
        list.find(
            item =>
                item.id === id
        );


    if (!item) return;


    item.active =
        !item.active;


    saveGiftBoxData();

    renderGiftBoxAdmin();

}


// ==========================================
// DELETE GIFT BOX
// ==========================================

function deleteGiftBox(id) {

    if (
        !confirm(
            "Delete this gift box?"
        )
    ) return;


    giftBoxes =
        giftBoxes.filter(
            item =>
                item.id !== id
        );


    saveGiftBoxData();

    renderGiftBoxAdmin();

}


// ==========================================
// DELETE RIBBON
// ==========================================

function deleteGiftRibbon(id) {

    if (
        !confirm(
            "Delete this ribbon?"
        )
    ) return;


    giftRibbons =
        giftRibbons.filter(
            item =>
                item.id !== id
        );


    saveGiftBoxData();

    renderGiftBoxAdmin();

}


// ==========================================
// DELETE CARD
// ==========================================

function deleteGiftCard(id) {

    if (
        !confirm(
            "Delete this card?"
        )
    ) return;


    giftCards =
        giftCards.filter(
            item =>
                item.id !== id
        );


    saveGiftBoxData();

    renderGiftBoxAdmin();

}


// ==========================================
// CLEAR GIFT BOX FORMS
// ==========================================

function clearGiftBoxForm() {

    document.getElementById(
        "giftBoxName"
    ).value = "";


    document.getElementById(
        "giftBoxPrice"
    ).value = "";


    document.getElementById(
        "giftBoxImage"
    ).value = "";


    document.getElementById(
        "giftBoxActive"
    ).checked = true;


    const preview =
        document.getElementById(
            "giftBoxPreview"
        );


    preview.src = "";

    preview.style.display =
        "none";

}


function clearGiftRibbonForm() {

    document.getElementById(
        "giftRibbonName"
    ).value = "";


    document.getElementById(
        "giftRibbonPrice"
    ).value = "";


    document.getElementById(
        "giftRibbonColor"
    ).value = "#B49668";


    document.getElementById(
        "giftRibbonImage"
    ).value = "";


    document.getElementById(
        "giftRibbonActive"
    ).checked = true;


    const preview =
        document.getElementById(
            "giftRibbonPreview"
        );


    preview.src = "";

    preview.style.display =
        "none";

}


function clearGiftCardForm() {

    document.getElementById(
        "giftCardName"
    ).value = "";


    document.getElementById(
        "giftCardPrice"
    ).value = "";


    document.getElementById(
        "giftCardImage"
    ).value = "";


    document.getElementById(
        "giftCardActive"
    ).checked = true;


    const preview =
        document.getElementById(
            "giftCardPreview"
        );


    preview.src = "";

    preview.style.display =
        "none";

}


// ==========================================
// ORDERS
// ==========================================

let orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];


const adminOrders =
    document.getElementById(
        "adminOrders"
    );


function normalizeOrder(order) {

    const customer =
        order.customer || {};


    const items =
        Array.isArray(order.items)
            ? order.items
            : Array.isArray(order.cart)
                ? order.cart
                : [];


    return {

        ...order,

        customer,

        name:
            customer.name ||
            order.name ||
            "Unknown customer",

        phone:
            customer.phone ||
            order.phone ||
            "N/A",

        address:
            customer.address ||
            order.address ||
            "N/A",

        items,

        total:
            order.total ||
            order.amount ||
            0,

        status:
            order.status ||
            "Confirmed"

    };

}


// ==========================================
// DELETE ORDER
// ==========================================

function deleteOrder(id) {

    if (
        !confirm(
            "Delete this order?"
        )
    ) return;


    orders =
        orders.filter(
            order =>
                order.id !== id
        );


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    renderOrders();

}


// ==========================================
// RENDER ORDERS
// ==========================================

function renderOrders() {

    if (!adminOrders) return;


    if (orders.length === 0) {

        adminOrders.innerHTML =
            `
            <p class="empty-state">
                No orders yet.
            </p>
            `;

        return;
    }


    adminOrders.innerHTML =
        orders
            .map(normalizeOrder)
            .map(order => {

                const itemsMarkup =
                    order.items
                        .map(item => {

                            const itemName =
                                item.name ||
                                item.productName ||
                                "Item";


                            const itemQty =
                                item.quantity ||
                                item.qty ||
                                1;


                            const itemPrice =
                                Number(item.price) || 0;


                            let extraMarkup =
                                "";


                            // CUSTOMIZE

                            if (
                                item.customization &&
                                item.customization.piece
                            ) {

                                const customization =
                                    item.customization;


                                const piece =
                                    customization
                                        .piece
                                        ?.name ||
                                    "-";


                                const metal =
                                    customization
                                        .metal
                                        ?.name ||
                                    "-";


                                const charms =
                                    Array.isArray(
                                        customization.charms
                                    )
                                    ?
                                    customization.charms
                                        .map(
                                            charm =>
                                                charm.name
                                        )
                                        .join(", ")
                                    :
                                    "None";


                                extraMarkup = `

                                    <div class="order-customization">

                                        <strong>
                                            Customized Piece
                                        </strong>

                                        <span>
                                            Piece:
                                            ${escapeHTML(piece)}
                                        </span>

                                        <span>
                                            Metal:
                                            ${escapeHTML(metal)}
                                        </span>

                                        <span>
                                            Charms:
                                            ${escapeHTML(charms)}
                                        </span>

                                    </div>

                                `;

                            }


                            // GIFT BOX

                            if (
                                item.customization &&
                                item.customization.giftBox
                            ) {

                                const customization =
                                    item.customization;


                                const jewelry =
                                    customization
                                        .jewelry
                                        ?.name ||
                                    "-";


                                const box =
                                    customization
                                        .giftBox
                                        ?.name ||
                                    "-";


                                const ribbon =
                                    customization
                                        .ribbon
                                        ?.name ||
                                    "None";


                                const card =
                                    customization
                                        .card
                                        ?.name ||
                                    "None";


                                const message =
                                    customization
                                        .message ||
                                    "";


                                extraMarkup = `

                                    <div class="order-customization">

                                        <strong>
                                            🎁 Gift Box
                                        </strong>

                                        <span>
                                            Jewelry:
                                            ${escapeHTML(jewelry)}
                                        </span>

                                        <span>
                                            Box:
                                            ${escapeHTML(box)}
                                        </span>

                                        <span>
                                            Ribbon:
                                            ${escapeHTML(ribbon)}
                                        </span>

                                        <span>
                                            Card:
                                            ${escapeHTML(card)}
                                        </span>

                                        ${
                                            message
                                            ?
                                            `
                                            <span>
                                                Message:
                                                ${escapeHTML(message)}
                                            </span>
                                            `
                                            :
                                            ""
                                        }

                                    </div>

                                `;

                            }


                            return `

                                <li>

                                    <div class="order-item-row">

                                        <span>
                                            ${escapeHTML(itemName)}
                                            ×
                                            ${itemQty}
                                        </span>

                                        <strong>
                                            ${itemPrice} EGP
                                        </strong>

                                    </div>

                                    ${extraMarkup}

                                </li>

                            `;

                        })
                        .join("");


                return `

                    <div class="order-card">

                        <div class="order-head">

                            <h4>
                                Order #${escapeHTML(
                                    String(order.id)
                                )}
                            </h4>

                            <span class="status-badge">
                                ${escapeHTML(
                                    order.status
                                )}
                            </span>

                        </div>


                        <p>
                            👤
                            ${escapeHTML(order.name)}
                        </p>


                        <p>
                            📞
                            ${escapeHTML(order.phone)}
                        </p>


                        <p>
                            📍
                            ${escapeHTML(order.address)}
                        </p>


                        <p>
                            <strong>
                                Total:
                            </strong>

                            ${escapeHTML(
                                String(order.total)
                            )}
                            EGP
                        </p>


                        <ul>

                            ${
                                itemsMarkup ||
                                "<li>No items</li>"
                            }

                        </ul>


                        <button
                            type="button"
                            class="delete-btn"
                            onclick="deleteOrder(
                                ${JSON.stringify(order.id)}
                            )"
                        >
                            Delete Order
                        </button>

                    </div>

                `;

            })
            .join("");

}


// ==========================================
// INITIALIZE
// ==========================================

renderProducts();

renderCustomizationLists();

renderGiftBoxAdmin();

renderOrders();