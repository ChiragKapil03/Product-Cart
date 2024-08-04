let cart = [];
let cartTotal = document.getElementById("cartTotal");
let comment = document.getElementById("comment");
let dynamicWindow = document.querySelector(".dynamicWindow");
let itemNo1 = document.getElementById("itemNumber1");
let itemNo2 = document.getElementById("itemNumber2");
let itemNo3 = document.getElementById("itemNumber3");

function updateCart(productId, productName, productPrice, change) {
    let productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity += change;
        if (productInCart.quantity <= 0) {
            cart.splice(cart.indexOf(productInCart), 1);
        }
    } 
    else {
        if(change > 0){
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }   
    }

    renderCart();
}

function renderCart() {
    dynamicWindow.innerHTML = "";
    if (cart.length === 0) {
        comment.style.display = "block";
        cartTotal.textContent = "0";
        itemNo1.innerText = "0";
        itemNo2.innerText = "0";
        itemNo3.innerText = "0";
    } 
    else {
        comment.style.display = "none";
        let total = 0;
        let itemNo1Exists = false;
        let itemNo2Exists = false;
        let itemNo3Exists = false;

        cart.forEach(product => {
            let productDiv = document.createElement("div");

            let divItem1 = document.createElement("div");
            divItem1.textContent= `${product.name}`;
            let divItem2 = document.createElement("div");
            divItem2.textContent= `${product.quantity}`;
            let divItem3 = document.createElement("div");
            divItem3.textContent= `x ${product.price}`;
            let divItem4 = document.createElement("div");
            divItem4.textContent= `= ${product.quantity * product.price}`;

            productDiv.appendChild(divItem1);
            productDiv.appendChild(divItem2);
            productDiv.appendChild(divItem3);
            productDiv.appendChild(divItem4);
            
            productDiv.style.cssText =`
            height: 100px;
            width:400px;
            padding:4px;
            margin:5px;
            display: flex;
            gap:30px;
            font-size:large;
            font-weight:500;
            justify-content:center;
            align-items:center;
            border:1px solid black;
            background-color: rgba(128, 128, 128, 0.063);
            `;

            dynamicWindow.appendChild(productDiv);
            dynamicWindow.style.cssText=`
            display: flex;
            flex-direction:column;
            gap:5px;
            `;

            total += product.quantity * product.price;

            if (product.id === 1) {
                itemNo1.innerText = product.quantity;
                itemNo1Exists = true;
            } else if (product.id === 2) {
                itemNo2.innerText = product.quantity;
                itemNo2Exists = true;
            } else if (product.id === 3) {
                itemNo3.innerText = product.quantity;
                itemNo3Exists = true;
            }

        });

        if (!itemNo1Exists) {
            itemNo1.innerText = "0";
        }
        if (!itemNo2Exists) {
            itemNo2.innerText = "0";
        }
        if (!itemNo3Exists) {
            itemNo3.innerText = "0";
        }

        cartTotal.textContent = total;
    }
}

document.getElementById("add1").addEventListener("click", () => updateCart(1, "Boult C100SI", 500, 1));
document.getElementById("minus1").addEventListener("click", () => updateCart(1, "Boult C100SI", 500, -1));
document.getElementById("add2").addEventListener("click", () => updateCart(2, "Boult Audio W20", 899, 1));
document.getElementById("minus2").addEventListener("click", () => updateCart(2, "Boult Audio W20", 899, -1));
document.getElementById("add3").addEventListener("click", () => updateCart(3, "pTron Bassbuds Bliss", 999, 1));
document.getElementById("minus3").addEventListener("click", () => updateCart(3, "pTron Bassbuds Bliss", 999, -1));