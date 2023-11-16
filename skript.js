console.log("hello js is working");

let products = [
    {
        name: "Träskruv FZB 6,0x100",
        price: 169,
        tag: "Bygg",
        img: "24964-1_230197a26a-17e1-4012-8645-855c2ba85bd2_2.webp",
    },
    {
        name: "Hammare Stanley",
        price: 99.95,
        tag: "Bygg",
        img: "280019_23bef95291-b0a4-4a02-a5aa-9ea31aecc061.webp",
    },
    {
        name: "Borrhammare MAKITA DHR202Z 18V utan batteri och laddare",
        price: 1839,
        tag: "Bygg",
        img: "as.46811959.jpg",
    },
    {
        name: "Stålhammare DEWALT rivklo slät 16oz",
        price: 499,
        tag: "Bygg",
        img: "DV_8_10561184_01_4c_SE_20220421094652.jpg",
    },
    {
        name: "Foder vit 12x43x2200mm S 0502-Y",
        price: 72.95,
        tag: "Bygg",
        img: "DV_8_5107437_01_4c_SE_20230731111133.jpg",
    },
    {
        name: "Himeji slott",
        price: 1900,
        tag: "Lego",
        img: "21060.webp",
    },
    {
        name: "Lejonriddarnas slott",
        price: 4650,
        tag: "Lego",
        img: "10305.webp",
    },
    {
        name: "Venator-Class Republic Attack Cruiser",
        price: 7800,
        tag: "Lego",
        img: "75367.webp",
    },
    {
        name: "Millennium Falcon",
        price: 9800,
        tag: "Lego",
        img: "75192.webp",
    },
    {
        name: "AT-AT",
        price: 9800,
        tag: "Lego",
        img: "75313_Prod.webp"
    },
    {
        name: "Stellaris",
        price: 458,
        tag: "Spel",
        img: "Stellaris.jpeg",
    },
    {
        name: "Kofta med krage Regular Fit",
        price: 499,
        tag: "Kläder",
        img: "hmgoepprod.webp",
    },
    {
        name: "NORDMÄRKE",
        price: 129,
        tag: "Elektronik",
        img: "nordmaerke-tradloes-laddare-textil-gra__0841954_pe778828_s5.avif",
    },

];
let tagList = [];

let chartItems = [];

function UppdateTotalCartItems(doAddRemove) {
    let num = localStorage.getItem("TotalItems");
    num = parseInt(num);
    localStorage.setItem("TotalItems", num + doAddRemove);

    let cartTotalNum = document.querySelector(".cartItemCountP");
    cartTotalNum.innerHTML = num + doAddRemove;
}

function UppdateCartStart() {

    //make totalItem allways exist
    let existTotalItems = localStorage.getItem("TotalItems");
    if (existTotalItems == null) { localStorage.setItem("TotalItems", 0); }

    //set TotalItems on reload 
    let cartTotalNum = document.querySelector(".cartItemCountP");
    cartTotalNum.innerHTML = existTotalItems;

    //find all obs in cart
    products.forEach(element => {
        let get = localStorage.getItem(element.name);
        if (get != null) {
            // console.log("test");
            chartItems.push(element);
            chartItems[chartItems.length - 1].count = parseInt(get);
        }
    });
    UppdateCart();
}

function AddOrRemoveCart(InstencP, doAddRemove) {
    let found = false;
    let doRemove = false;
    let removeAt;

    for (let object = 0; object < chartItems.length; object++) {
        //doAddRemove on to it 
        if (chartItems[object].name === InstencP.name) {
            if (doAddRemove === 1 || doAddRemove === -1) {
                chartItems[object].count += doAddRemove;
                localStorage.setItem(chartItems[object].name, chartItems[object].count);
                UppdateTotalCartItems(doAddRemove);
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
        //in local storges 
        localStorage.removeItem(chartItems[removeAt].name);
        //in javaskript cart
        let temp = chartItems[chartItems.length - 1];
        chartItems[chartItems.length - 1] = chartItems[removeAt];
        chartItems[removeAt] = temp;
        chartItems.pop();
    }

    //add to chart items first time
    if (found === false) {
        chartItems.push(InstencP);
        chartItems[chartItems.length - 1].count = 1;
        localStorage.setItem(InstencP.name, InstencP.count);
        UppdateTotalCartItems(doAddRemove);
    }

    UppdateCart();
}
function UppdateCart() {
    //uppdate chart Html
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
        buyButton.innerHTML = "Remove one"
        buyButton.id = chartItems[i].name;
        buyButton.addEventListener("click", (event) => {

            AddOrRemoveCart(chartItems.find((e) => event.target.id === e.name), -1);

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

        let img = document.createElement("img");
        img.src = "/IMGs/" + arrayOfPruducts[index].img;
        divContener.append(img);

        let tag = document.createElement("p");
        tag.innerHTML = "Tag: " + arrayOfPruducts[index].tag;
        divContener.append(tag);

        let buyButton = document.createElement("button");
        buyButton.innerHTML = "Add to cart"
        buyButton.addEventListener("click", (event) => {
            AddOrRemoveCart(arrayOfPruducts[index], 1);
        })
        divContener.append(buyButton);

        shop.append(divContener);
    }
}

function ChangeSort() {
    let itemList = document.getElementById("SortAfter");

    let diplaySet = [];
    //temp
    tagList.forEach(element => {
        let tempSaveList = products.filter(item => item.tag === element);
        Array.prototype.push.apply(diplaySet, tempSaveList);
    });

    switch (itemList.selectedOptions[0].id) {
        case "Pris_H":
            diplaySet.sort((a, b) => b.price - a.price);
            break;
        case "Pris_L":
            diplaySet.sort((a, b) => a.price - b.price);
            break;

        case "Alfabetisk_AF":
            diplaySet.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            });
            break;
        case "Alfabetisk_AL":
            diplaySet.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
            });
            break;
        default:
            break;
    }
    //uppdates
    UppdateView(diplaySet);
}

function ChangeTag(event) {
    let itemList = document.getElementById("Tag");
    tagList = [];

    for (let i = 0; i < itemList.selectedOptions.length; i++) {
        tagList[i] = itemList.selectedOptions[i].id;
    }
    ChangeSort();
}

function CreatBase() {

    let body = document.querySelector("body");

    // header
    //-------------------------------------------------------------
    let header = document.createElement("header");

    //titel
    let h1 = document.createElement("h1");
    h1.innerHTML = "Shop";
    header.append(h1);

    let h2 = document.createElement("h2");
    h2.innerHTML = "test";
    header.append(h2);

    let cartDivHeader = document.createElement("div");
    cartDivHeader.classList = "chartDivHeader";

    let cartImg = document.createElement("h2");
    cartImg.innerHTML = "chartIMG";
    cartDivHeader.append(cartImg);

    let cartItemCountP = document.createElement("p");
    cartItemCountP.innerHTML = 0;
    cartItemCountP.classList = "cartItemCountP";
    cartDivHeader.append(cartItemCountP);

    header.append(cartDivHeader);

    body.append(header);
    //-------------------------------------------------------------

    let sortOpstionDiv = document.createElement("div");

    //label
    let dropDownLabel = document.createElement("label");
    dropDownLabel.innerHTML = "Sortera efter ";
    sortOpstionDiv.append(dropDownLabel);

    //drop down Sort
    //-------------------------------------------------------------
    let dropDown = document.createElement("select");
    dropDown.id = "SortAfter";

    dropDown.addEventListener("change", (event) => {
        ChangeSort(event);
    })

    choice = document.createElement("option");
    choice.innerHTML = "Sorter Alfabetisk A -> Ö";
    choice.id = "Alfabetisk_AF";
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Sorter Alfabetisk Ö -> A";
    choice.id = "Alfabetisk_AL";
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Sorter Pris högst till lägst";
    choice.id = "Pris_H";
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Sorter Pris lägst till högst";
    choice.id = "Pris_L";
    dropDown.append(choice);

    sortOpstionDiv.append(dropDown);

    let shopCartDiv = document.createElement("div");
    shopCartDiv.classList = "shopCartDiv";

    //drop down tag
    //-------------------------------------------------------------
    let dropDownLabelTag = document.createElement("label");
    dropDownLabelTag.innerHTML = "Vilka Tags";
    sortOpstionDiv.append(dropDownLabelTag);

    let dropDownTag = document.createElement("select");
    dropDownTag.id = "Tag";
    dropDownTag.multiple = true;

    dropDownTag.addEventListener("change", (event) => {
        ChangeTag();
    })

    //adds all tags in pruducts
    let tagListTemp = [];
    products.forEach(element => {
        if (!tagListTemp.includes(element.tag)) {
            tagListTemp.push(element.tag);
        }
    });

    tagListTemp.forEach(element => {
        choiceTag = document.createElement("option");
        choiceTag.innerHTML = "Tag: " + element;
        choiceTag.id = element
        dropDownTag.append(choiceTag);
    });

    sortOpstionDiv.append(dropDownTag);
    //append SortOpstionDiv
    //-------------------------------------------------------------
    body.append(sortOpstionDiv);
    //-------------------------------------------------------------

    //creat div for pruducts
    let divMain = document.createElement("div");
    divMain.classList = "Main";

    //shop
    let divShop = document.createElement("div");
    divShop.classList = "shop";
    shopCartDiv.append(divShop);

    //crete div for chart 
    let divCart = document.createElement("div");
    divCart.classList = "Cart";
    shopCartDiv.append(divCart);

    divMain.append(shopCartDiv);

    //append shop
    body.append(divMain);

    //uppdate
    products.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });
    UppdateView(products);
}

//run
CreatBase();
UppdateCartStart();