// ==========================================
// BLUEBELLS - CUSTOMIZE PAGE
// ==========================================

// Data will be loaded from the Admin Panel.
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

    /*
      The Admin Panel will save:

      1. Pieces
      2. Metals
      3. Charms

      We will connect them here after
      finishing the Admin Panel.
    */

}


// ==========================================
// Display Pieces
// ==========================================

function displayPieces() {

    // Pieces added by Admin will appear here.

}


// ==========================================
// Display Metals
// ==========================================

function displayMetals() {

    // Metals added by Admin will appear here.

}


// ==========================================
// Display Charms
// ==========================================

function displayCharms() {

    // Charms added by Admin will appear here.

}


// ==========================================
// Calculate Total Price
// ==========================================

function calculateTotalPrice() {

    // Price calculation will use:
    // Piece price
    // Metal extra price
    // Selected charms prices

}


// ==========================================
// Add Customized Piece To Cart
// ==========================================

function addCustomizedPieceToCart() {

    /*
      The customized product will contain:

      - Piece
      - Metal
      - Charms
      - Base price
      - Extra prices
      - Total price

      Then it will be sent to the existing Cart.
    */

}


// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadCustomizationData();

});