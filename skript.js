console.log("hello js is working");

let products = [
    {
        name: "Träskruv FZB 6,0x100",
        price: 169,
        tag: "Bygg",
    },
    {
        name: "Hammare Stanley",
        price: 99.95,
        tag: "Bygg",
    },
    {
        name: "Borrhammare MAKITA DHR202Z 18V utan batteri och laddare",
        price: 1839,
        tag: "Bygg",
    },
    {
        name: "Stålhammare DEWALT rivklo slät 16oz",
        price: 499,
        tag: "Bygg",
    },
    {
        name: "Foder vit 12x43x2200mm S 0502-Y",
        price: 72.95,
        tag: "Bygg",
    },
    {
        name: "Himeji slott",
        price: 1900,
        tag: "Lego",
    },
    {
        name: "Lejonriddarnas slott",
        price: 4650,
        tag: "Lego",
    },
    {
        name: "Venator-Class Republic Attack Cruiser",
        price: 7800,
        tag: "Lego",
    },
    {
        name: "Millennium Falcon",
        price: 9800,
        tag: "Lego",
    },
    {
        name: "AT-AT",
        price: 9800,
        tag: "Lego",
    },
];

let chartItems = [];

function UppdateCart(event, index, doAddRemove) {
    let found = false;
    let doRemove = false;
    let removeAt;

    for (let object = 0; object < chartItems.length; object++) {
        //doAddRemove on to it 
        if (chartItems[object].name === products[index].name) {
            if (doAddRemove === 1 || doAddRemove === -1) {
                chartItems[object].count += doAddRemove;
                if (chartItems[object].count === 0) {
                    doRemove = true;
                    removeAt = object;
                }
            } else {

                console.log("error not 1 or -1");
                return;
            }
            found = true;
        }
    }

    //remove item 
    if (doRemove === true) {
        console.log("before " + chartItems);
        let temp = chartItems[chartItems.length - 1];
        chartItems[chartItems.length - 1] = chartItems[removeAt];
        chartItems[removeAt] = temp;
        chartItems.pop();
        console.log("after " + chartItems);
    }

    if (found === false) {
        //add to chart items
        chartItems.push(products[index]);
        chartItems[chartItems.length - 1].count = 1;
    }

    //uppdate chart
    let shop = document.querySelector(".Cart");
    shop.innerHTML = "";

    for (let i = 0; i < chartItems.length; i++) {
        let divContener = document.createElement("div");
        divContener.classList.add("CartItem");
        divContener.classList.add(chartItems[i].tag);

        let name = document.createElement("h3");
        name.innerHTML = chartItems[i].name;
        divContener.append(name);

        let price = document.createElement("h3");
        price.innerHTML = chartItems[i].price + "kr";
        divContener.append(price);

        let tag = document.createElement("p");
        tag.innerHTML = "Tag: " + chartItems[i].tag;
        divContener.append(tag);

        let itemCount = document.createElement("p");
        itemCount.innerHTML = "Count: " + chartItems[i].count;
        divContener.append(itemCount);

        let buyButton = document.createElement("button");
        buyButton.innerHTML = "remove"
        buyButton.addEventListener("click", (event) => {
            UppdateCart(event, index, -1);
        })
        divContener.append(buyButton);

        shop.append(divContener);
    }
}

function UppdateView(arrayOfPruducts) {
    let shop = document.querySelector(".shop");
    shop.innerHTML = "";

    for (let index = 0; index < arrayOfPruducts.length; index++) {
        let divContener = document.createElement("div");
        divContener.classList.add("product");
        divContener.classList.add(arrayOfPruducts[index].tag);

        let name = document.createElement("h3");
        name.innerHTML = arrayOfPruducts[index].name;
        divContener.append(name);

        let price = document.createElement("h3");
        price.innerHTML = arrayOfPruducts[index].price + "kr";
        divContener.append(price);

        let tag = document.createElement("p");
        tag.innerHTML = "Tag: " + arrayOfPruducts[index].tag;
        divContener.append(tag);

        let buyButton = document.createElement("button");
        buyButton.innerHTML = "Add to cart"
        buyButton.addEventListener("click", (event) => {
            UppdateCart(event, index, 1);
        })
        divContener.append(buyButton);

        shop.append(divContener);
    }
}

function ChangeTag(event) {
    let itemList = document.getElementById("SortAfter");
    switch (itemList.selectedOptions[0].id) {
        case "Alla":
            UppdateView(products);
            break;
        case "Pris":

            break;
        default:
            let diplaySet = products.filter(item => item.tag === itemList.selectedOptions[0].id);
            UppdateView(diplaySet);
            break;
    }
}

function CreatBase() {
    //creat div for pruducts
    let body = document.querySelector("body");
    let divMain = document.createElement("div");
    divMain.classList = "Main";

    //titel
    let h1 = document.createElement("h1");
    h1.innerHTML = "Shop";
    divMain.append(h1);

    //label
    let dropDownLabel = document.createElement("label");
    dropDownLabel.innerHTML = "Sortera efter ";
    divMain.append(dropDownLabel);

    //drop down
    let dropDown = document.createElement("select");
    dropDown.id = "SortAfter";

    dropDown.addEventListener("change", (event) => {
        ChangeTag(event);
    })

    let choice = document.createElement("option");
    choice.innerHTML = " Tag Alla";
    choice.id = "Alla";
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Tag Bygg";
    choice.setAttribute("id", "Bygg");
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Tag  Lego";
    choice.id = "Lego";
    dropDown.append(choice);

    divMain.append(dropDown);

    //shop
    let divShop = document.createElement("div");
    divShop.classList = "shop";
    divMain.append(divShop);


    //append shop
    body.append(divMain);

    //crete div for chart 
    let divCart = document.createElement("div");
    divCart.classList = "Cart";
    body.append(divCart);

    //uppdate
    UppdateView(products);
}

//run
CreatBase();