function totalprice(){
    let price = JSON.parse(localStorage.getItem('totalprice'))
    let totalprice= document.getElementById("price")
    let cartpage= document.getElementById("cartpage")

    console.log(totalprice)

    let result = price.reduce((a, b) => {
        return a + b;
      });
      
      console.log(result);
      totalprice.innerHTML='Total price is '+result+'L.E'
      console.log(totalprice)

    cartpage.appendChild(totalprice)




}


//display
function display(prod) {
    let title = prod.title
    let price = prod.price
    let image = prod.image
    let id = prod.id
    let divv = document.createElement("div")

    divv.innerHTML = "<div class='product_image'>" + "<img class='image' src='" + image + "'>" + "</div>" + "<div class='product_title'>" + title + "</div>" + "<div class='product_price'>" + price + "</div>" +  "<input class='add_to_cart' onclick='cartbuyy()' type='submit' value='Remove'> "
    divv.setAttribute("class", "item")
    main.appendChild(divv)

}



//itemsCart

function itemsCart() {
    let products = JSON.parse(localStorage.getItem('newproducts'))
    console.log(products)

    for (let x of products) {
        display(x)
    }

}

let buy_item = document.querySelectorAll(".add_to_cart")
let parentt= document.getElementsByClassName("item")

//remove product
function cartbuyy(){
console.log("deedu")

buy_item.parentElement.remove()



}


