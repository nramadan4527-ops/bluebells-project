/* =========================================================
   PRODUCTS
========================================================= */

let products =
    JSON.parse(localStorage.getItem("products")) || [];

const adminProducts =
    document.getElementById("adminProducts");

const imageInput =
    document.getElementById("image");

const preview =
    document.getElementById("preview");



/* PRODUCT IMAGE PREVIEW */

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = imageInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {

            preview.src = reader.result;

            preview.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

}



/* ADD NORMAL PRODUCT */

function addProduct() {

    const name =
        document.getElementById("name").value.trim();

    const price =
        Number(document.getElementById("price").value);


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0 ||
        !preview.src ||
        preview.style.display === "none"
    ) {

        alert(
            "Please fill the product name, price and image."
        );

        return;
    }


    const product = {

        id: Date.now(),

        name: name,

        price: price,

        image: preview.src

    };


    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    renderProducts();


    document.getElementById("name").value = "";

    document.getElementById("price").value = "";

    imageInput.value = "";

    preview.src = "";

    preview.style.display = "none";

}



/* SHOW PRODUCTS */

function renderProducts() {

    if (!adminProducts) return;

    adminProducts.innerHTML = "";


    if (products.length === 0) {

        adminProducts.innerHTML =
            '<p class="empty-state">No products added yet.</p>';

        return;
    }


    products.forEach(function (product) {

        adminProducts.innerHTML += `

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
                    class="delete-btn"
                    onclick="deleteProduct(${JSON.stringify(product.id)})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}



/* DELETE PRODUCT */

function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;


    products =
        products.filter(function (product) {

            return product.id !== id;

        });


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    renderProducts();

}



/* =========================================================
   CUSTOMIZATION DATA
========================================================= */

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



/* IMAGE INPUTS */

const pieceImageInput =
    document.getElementById(
        "customPieceImage"
    );

const piecePreview =
    document.getElementById(
        "customPiecePreview"
    );


const charmImageInput =
    document.getElementById(
        "customCharmImage"
    );

const charmPreview =
    document.getElementById(
        "customCharmPreview"
    );



/* =========================================================
   IMAGE PREVIEW FUNCTION
========================================================= */

function setupImagePreview(input, image) {

    if (!input || !image) return;


    input.addEventListener(
        "change",
        function () {

            const file =
                input.files[0];

            if (!file) return;


            const reader =
                new FileReader();


            reader.onload =
                function () {

                    image.src =
                        reader.result;

                    image.style.display =
                        "block";

                };


            reader.readAsDataURL(file);

        }
    );

}


setupImagePreview(
    pieceImageInput,
    piecePreview
);


setupImagePreview(
    charmImageInput,
    charmPreview
);



/* =========================================================
   SAVE CUSTOMIZATION DATA
========================================================= */

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



/* =========================================================
   ADD PIECE
========================================================= */

function addCustomizationPiece() {

    const name =
        document
            .getElementById(
                "customPieceName"
            )
            .value
            .trim();


    const type =
        document.getElementById(
            "customPieceType"
        ).value;


    const price =
        Number(
            document.getElementById(
                "customPiecePrice"
            ).value
        );


    const image =
        piecePreview?.src || "";


    const active =
        document.getElementById(
            "customPieceActive"
        ).checked;


    if (
        !name ||
        !type ||
        Number.isNaN(price) ||
        price < 0 ||
        !image ||
        piecePreview.style.display === "none"
    ) {

        alert(
            "Please fill the piece name, type, price and image."
        );

        return;
    }


    const piece = {

        id: Date.now(),

        name: name,

        type: type,

        price: price,

        image: image,

        active: active

    };


    customizationPieces.push(piece);


    saveCustomizationData();

    renderCustomizationLists();

    clearPieceForm();

}



/* =========================================================
   ADD METAL
========================================================= */

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
            document.getElementById(
                "customMetalExtra"
            ).value
        );


    const color =
        document.getElementById(
            "customMetalColor"
        ).value;


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

        id: Date.now(),

        name: name,

        extraPrice: extraPrice,

        color: color,

        active: active

    };


    customizationMetals.push(metal);


    saveCustomizationData();

    renderCustomizationLists();

    clearMetalForm();

}



/* =========================================================
   ADD CHARM
========================================================= */

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
            document.getElementById(
                "customCharmPrice"
            ).value
        );


    const image =
        charmPreview?.src || "";


    const active =
        document.getElementById(
            "customCharmActive"
        ).checked;


    if (
        !name ||
        Number.isNaN(price) ||
        price < 0 ||
        !image ||
        charmPreview.style.display === "none"
    ) {

        alert(
            "Please fill the charm name, price and image."
        );

        return;
    }


    const charm = {

        id: Date.now(),

        name: name,

        price: price,

        image: image,

        active: active

    };


    customizationCharms.push(charm);


    saveCustomizationData();

    renderCustomizationLists();

    clearCharmForm();

}



/* =========================================================
   DELETE
========================================================= */

function deleteCustomizationPiece(id) {

    if (!confirm("Delete this piece?"))
        return;


    customizationPieces =
        customizationPieces.filter(
            item => item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}



function deleteCustomizationMetal(id) {

    if (!confirm("Delete this metal?"))
        return;


    customizationMetals =
        customizationMetals.filter(
            item => item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}



function deleteCustomizationCharm(id) {

    if (!confirm("Delete this charm?"))
        return;


    customizationCharms =
        customizationCharms.filter(
            item => item.id !== id
        );


    saveCustomizationData();

    renderCustomizationLists();

}



/* =========================================================
   SHOW / HIDE
========================================================= */

function toggleCustomization(type, id) {

    let list;


    if (type === "piece") {

        list =
            customizationPieces;

    } else if (type === "metal") {

        list =
            customizationMetals;

    } else {

        list =
            customizationCharms;

    }


    const item =
        list.find(
            x => x.id === id
        );


    if (!item) return;


    item.active =
        !item.active;


    saveCustomizationData();

    renderCustomizationLists();

}



/* =========================================================
   RENDER CUSTOMIZATION
========================================================= */

function renderCustomizationLists() {

    const piecesList =
        document.getElementById(
            "customPiecesList"
        );


    const metalsList =
        document.getElementById(
            "customMetalsList"
        );


    const charmsList =
        document.getElementById(
            "customCharmsList"
        );



    /* PIECES */

    piecesList.innerHTML =
        customizationPieces.length

        ?

        customizationPieces.map(
            item => `

            <div class="option-item">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                >

                <div class="option-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <span>
                        ${escapeHTML(item.type)}
                        ·
                        ${item.price} EGP
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
                        class="small-btn"
                        onclick="
                            toggleCustomization(
                                'piece',
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        ${
                            item.active
                                ? "Hide"
                                : "Show"
                        }
                    </button>


                    <button
                        class="small-delete"
                        onclick="
                            deleteCustomizationPiece(
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        `
        ).join("")

        :

        '<p class="empty-state">No pieces added yet.</p>';



    /* METALS */

    metalsList.innerHTML =
        customizationMetals.length

        ?

        customizationMetals.map(
            item => `

            <div class="option-item metal-item">

                <span
                    class="metal-dot"
                    style="background:${escapeHTML(
                        item.color || "#ccc"
                    )}"
                ></span>


                <div class="option-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <span>
                        + ${item.extraPrice} EGP
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
                        class="small-btn"
                        onclick="
                            toggleCustomization(
                                'metal',
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        ${
                            item.active
                                ? "Hide"
                                : "Show"
                        }
                    </button>


                    <button
                        class="small-delete"
                        onclick="
                            deleteCustomizationMetal(
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        `
        ).join("")

        :

        '<p class="empty-state">No metals added yet.</p>';



    /* CHARMS */

    charmsList.innerHTML =
        customizationCharms.length

        ?

        customizationCharms.map(
            item => `

            <div class="option-item">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                >


                <div class="option-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <span>
                        ${item.price} EGP
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
                        class="small-btn"
                        onclick="
                            toggleCustomization(
                                'charm',
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        ${
                            item.active
                                ? "Hide"
                                : "Show"
                        }
                    </button>


                    <button
                        class="small-delete"
                        onclick="
                            deleteCustomizationCharm(
                                ${JSON.stringify(item.id)}
                            )
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        `
        ).join("")

        :

        '<p class="empty-state">No charms added yet.</p>';

}



/* =========================================================
   CLEAR FORMS
========================================================= */

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


    piecePreview.src = "";

    piecePreview.style.display =
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


    charmPreview.src = "";

    charmPreview.style.display =
        "none";

}



/* =========================================================
   ORDERS
========================================================= */

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

        cart: items,

        total:
            order.total ||
            order.amount ||
            0,

        status:
            order.status ||
            "Confirmed"

    };

}



function deleteOrder(orderId) {

    if (!confirm("Delete this order?"))
        return;


    orders =
        orders.filter(
            order => order.id !== orderId
        );


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    renderOrders();

}



function renderOrders() {

    if (!adminOrders) return;


    adminOrders.innerHTML = "";


    if (orders.length === 0) {

        adminOrders.innerHTML =
            '<p class="empty-state">No orders yet.</p>';

        return;

    }


    orders
        .map(normalizeOrder)
        .forEach(order => {


            const itemsMarkup =
                order.items.map(item => {


                    const itemName =
                        item.name ||
                        item.productName ||
                        "Item";


                    const itemQty =
                        item.qty ||
                        item.quantity ||
                        1;


                    const itemPrice =
                        Number(item.price) || 0;


                    const customization =
                        item.customization;


                    let customizationMarkup =
                        "";


                    if (customization) {

                        const piece =
                            customization.piece?.name ||
                            customization.pieceName ||
                            "-";


                        const metal =
                            customization.metal?.name ||
                            customization.metalName ||
                            "-";


                        const charms =
                            Array.isArray(
                                customization.charms
                            )

                                ?

                                customization.charms
                                    .map(
                                        c => c.name
                                    )
                                    .join(", ")

                                || "None"

                                :

                                "None";


                        customizationMarkup = `

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

                            ${customizationMarkup}

                        </li>

                    `;

                }).join("");


            adminOrders.innerHTML += `

                <div class="order-card">

                    <div class="order-head">

                        <h4>
                            Order #${escapeHTML(
                                String(order.id)
                            )}
                        </h4>

                        <span class="status-badge">
                            ${escapeHTML(order.status)}
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
                        <strong>Total:</strong>
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
                        class="delete-btn"
                        onclick="
                            deleteOrder(
                                ${JSON.stringify(order.id)}
                            )
                        "
                    >
                        Delete Order
                    </button>

                </div>

            `;

        });

}



/* =========================================================
   SECURITY HELPER
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}



/* =========================================================
   START
========================================================= */

renderProducts();

renderOrders();

renderCustomizationLists();