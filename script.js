let photo = document.getElementById("slideshow")
let parent = document.getElementById("main")
var newWindow



//slide show
var imgArray = new Array();
imgArray[0] = "photos/1.png"
imgArray[1] = "photos/2.png"
imgArray[2] = "photos/3.png"

function slideshow() {

    setInterval(function () {


        let randomIndex = Math.floor(Math.random() * imgArray.length)
        console.log(randomIndex)

        photo.setAttribute("src", imgArray[randomIndex])
    }, 2000)


}



//get products

function loadproducts() {
    var getrequest = new XMLHttpRequest()
    getrequest.open("get", "https://fakestoreapi.com/products")

    getrequest.addEventListener("readystatechange", function () {


        if (getrequest.readyState == 4 && getrequest.status == 200) {
            let r = getrequest.response

            let response = JSON.parse(r)
            console.log(response)

            for (let product of response) {
                display(product)
            }
        }
    })

    getrequest.send()

}


//display
function display(prod) {
    let title = prod.title
    let price = prod.price
    let image = prod.image
    let id = prod.id
    let divv = document.createElement("div")

    divv.innerHTML = "<div class='product_image'>" + "<img class='image' src='" + image + "'>" + "</div>" + "<div class='product_title'>" + title + "</div>" + "<div class='product_price'>" + price + "</div>" + "<div class='rowbuy'>" + "<input class='add_to_cart' onclick='cartbuy(" + id + " )' type='submit' value='Add to Cart'> </div>"
    divv.setAttribute("class", "item")
    main.appendChild(divv)

}


//setlocalstorage
var user = { Email: "mohamed@gmail.com", passs: 123 }
localStorage.setItem("user", JSON.stringify(user))




//setuser
function getuser() {

    let userdata = localStorage.getItem("user")
    let userdataa = JSON.parse(userdata)

    let user1 = document.getElementById("input")
    let pw = document.getElementById("pass")
    var username = user1.value;
    let password = pw.value;
    console.log(username)
    console.log(password)
    if (userdataa.Email == username && userdataa.passs == password) {

        localStorage.setItem("isSignedin", "true")

        newWindow = open("./index.html", "width=500,height=800,sceenX=600,screenY=1000")
    }
    else {
        alert('invalid data')
    }

}
let s = document.getElementById("signin1")
let useremail = document.getElementById("anchor")



//if user signed in
function checkuser() {

    let issign = localStorage.getItem("isSignedin")
    let userdata = localStorage.getItem("user")
    let userdataa = JSON.parse(userdata)



    if (issign == "true") {
        let namee = document.createElement("h6")
        namee.innerHTML = userdataa.Email
        s.innerHTML = " "
        s.appendChild(namee)
        let signout = document.createElement("a")
        signout.innerHTML = "Sign out"
        signout.setAttribute("href", "./index.html")

        s.appendChild(signout)

        signout.setAttribute("class", "signout")
        signout.addEventListener("click", function () {
            localStorage.setItem("isSignedin", "false")
            let s = document.getElementById("signin1")
            s.innerHTML = " "
            let anchornew = document.createElement("a")
            anchornew.innerHTML = "Sign in"
            anchornew.setAttribute("href", "./index.html")
            anchornew.setAttribute("id", "anchor")
            s.appendChild(anchornew)


        })
    }

}



//opencart
function opencart() {
    let issign = localStorage.getItem("isSignedin")
    if (issign == "true") {
        newwindow = open("./cart.html", " _blank width=500,height=800,sceenX=600,screenY=1000")
    }
    else {
        newwindow = open("./signin.html", "width=500,height=800,sceenX=600,screenY=1000")

    }



}
let titlee = document.getElementsByClassName("product_title")
let count_items = document.getElementById("counter")
let buy_item = document.querySelectorAll(".add_to_cart")






//array of items in card
let newproducts = [];
let totalprice = [];

function cartbuy(id) {
    let issign = localStorage.getItem("isSignedin")

    if (issign == "true") {
        count_items.innerHTML = parseInt(count_items.innerHTML) + 1;

        var xhr = new XMLHttpRequest()
        xhr.open("get", "https://fakestoreapi.com/products/" + id)

        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let produc = xhr.response
                var dataproduct = JSON.parse(produc)
                console.log(dataproduct)
                let priceitem = dataproduct.price
                let pricee = parseInt(priceitem)
                console.log(pricee)


                totalprice.push(pricee)
                localStorage.setItem('totalprice', JSON.stringify(totalprice))

                newproducts.push(dataproduct)
                localStorage.setItem('newproducts', JSON.stringify(newproducts))








            }
        })

        xhr.send()


    }

}


//Search_functions
let mainn = document.getElementById("main")

function displayonly(prod) {
    let id = prod.id
    let title = prod.title
    let image = prod.image
    let price = prod.price
    let di = document.createElement("div")
    di.innerHTML = "<div class='product_image'>" + "<img class='image' src='" + image + "'>" + "</div>" + "<div class='product_title'>" + title + "</div>" + "<div class='product_price'>" + price + "</div>" + "<div class='rowbuy'>" + "<input class='add_to_cart' onclick='cartbuy(" + id + " )' type='submit' value='Add to Cart'> </div>"
    di.setAttribute("class", "item")
    mainn.appendChild(di)

}


function getitem() {
    var contentsearch = document.getElementById("search").value
    console.log(contentsearch)
    var xhr = new XMLHttpRequest()
    xhr.open("get", "https://fakestoreapi.com/products")

    xhr.addEventListener("readystatechange", function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            let produc = xhr.response
            var dataproduct = JSON.parse(produc)
            mainn.innerHTML = " "
            for (let product of dataproduct) {
                if (product.title.toLowerCase().includes(contentsearch)) {
                    displayonly(product)
                    console.log(product)
                }
            }

        }

    })
    xhr.send()
}









