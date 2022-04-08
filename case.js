const cart = document.querySelector('.cart');
// ------Tạo đối tượng sản phẩm product----------//
function Product(id, image, name, price,) {
  this.id = id;
  this.image = image;
  this.name = name;
  this.price = price;
}
// -------Tạo đối tượng Cart trong giỏ hàng------//
function Cart(id, image, name, price, count) {
  this.id = id;
  this.image = image;
  this.name = name;
  this.price = price;
  this.count = count;
  this.amount = this.price * this.count;
}
// ---Tạo một mảng để chứa các cart thêm vào giỏ------//
let listCarts = [];
// -------- Tạo ra các mảng sản phẩm chứa các thông tin ở trên đối tượng product ------//
let listProduct = [
  new Product(1, "./img/item1.jpeg", "Nike SportSwear", 400000),
  new Product(2, "./img/item2.jpeg", "Nike Utility speed", 500000),
  new Product(3, "./img/item3.jpeg", "Nike Strike", 100000),
  new Product(4, "./img/item4.jpeg", "Nike Cout", 200000),
  new Product(5, "./img/item5.jpeg", "Nike FIT DNA", 300000),
  new Product(6, "./img/item6.jpeg", "Nike Zoom Fly 4", 700000),
  new Product(7, "./img/item7.jpeg", "Nike T-Shit", 200000),
  new Product(8, "./img/item8.jpeg", "Nike Cushioned", 20000),
];

// ---- Dùng hàm map để tạo ra sản phẩm ----//

let listProductHtmls = listProduct.map(
  function renderProduct(product) {
    return `
            <div class="product-box">
            <div class="img">
            <img src="${product.image}" alt="" class="product-img">
            </div>
            <div class="description">
            <h2 class="product-title">${product.name}</h2>
            <span class="price">${product.price}</span><sup>đ</sup>
            <div class="card-add-item"><i class='bx bx-cart-alt add-cart' onclick='addToCart(${product.id})'></i></div>
            </div>
        </div>
        `

  })


let elementProduct = document.getElementById("idProducts");
elementProduct.innerHTML = listProductHtmls.join("");
// ---- Tạo hàm nút thêm sản phẩm vào giỏ------//

function addToCart(idProduct) {
  let cartInfo = document.querySelector("#idCartIcon")
  let findProduct = listProduct.find(function (product) {
    return product.id == idProduct;
  })

  let foundCart = listCarts.find(function (cardItem) {
    return cardItem.id == idProduct;
  })
  if (foundCart === undefined) {
    let cardItem = new Cart(findProduct.id, findProduct.image, findProduct.name, findProduct.price, 1);
    listCarts.push(cardItem);
  } else {
    foundCart.count++;
    foundCart.amount = foundCart.count * foundCart.price;
  }

  cartInfo.innerHTML = `Cart(${listCarts.length})`;
}


// ------ bắt sự kiện kích vào giỏ hàng------//

const cartIcon = document.getElementById('idCartIcon');
function CartClick() {
  if (!cart.classList.contains('click-cart')) {
    cart.classList.add('click-cart');
  } else if (cart.classList.contains('click-cart')) {
    cart.classList.remove('click-cart');
  }
  // ---- Tạo ra hàm chứa danh sách đã thêm vào giỏ---//
  let strHtml = `<table ><tr class= "trHead">
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>tổng giá sp</th>
                  </tr>`;
  let htmls = listCarts.map(function (item, index) {
    return `
    
   
            <tr class="trCart">
              <td><img class='photo' src="${item.image}"></td>
              <td>${item.name}</td>
                <td >${formatCurrency(item.price)}</td>
                <td><input type="number" min= "1" value = ${item.count} class="inputText" onclick = "change()"></td>
                <td>${formatCurrency(item.amount)}</td>
                <td><button onclick="removeCartItem(${index})"><i class='bx bx-trash'></i></button></td>
                
            </tr>
           
        `
  })
  strHtml = strHtml + htmls.join("") + "</table>" + ` <div class="total">
    <div class="total-title">Tổng: </div>
    
      <div class="total-price">0</div>
    </div>` + `<div class= "buyBtn" onclick="buy()"><button>Thanh Toán</button></td>
    `
  document.querySelector("#idCartProduct").innerHTML = strHtml;
  document.querySelector(".total-price").innerText = sumpProducts();
}

// ----hàm chuyển đổi đơn vị tiền----//
function formatCurrency(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
// --------xoá sản phẩm----//

function removeCartItem(index) {
  listCarts.splice(index, 1);
  CartClick();
  document.querySelector("#idCartIcon").innerHTML = `Cart(${listCarts.length})`;
  sumpProducts();
  alert("bạn đã xoá sản phẩm thành công");
}

renderProduct();
// --- tính tổng----//
function sumpProducts() {
  let sum = 0;
  for (let i = 0; i < listCarts.length; i++) {
    sum += listCarts[i].amount;
  }
  return sum;
}
// -------buy now/----//
function buy() {
  alert("bạn đã mua hàng thành công")
}
buy();
// ---------//change
