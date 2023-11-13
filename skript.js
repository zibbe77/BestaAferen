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


function UppdateView(arrayOfPruducts) 
{
    let shop = document.querySelector(".shop");
    shop.innerHTML = "";

    for (let index = 0; index < arrayOfPruducts.length; index++) 
    {
        let divContener = document.createElement("div");
        divContener.classList = "product";

        let name = document.createElement("h3");
        name.innerHTML = arrayOfPruducts[index].name;
        divContener.append(name);

        let price = document.createElement("h3");
        price.innerHTML = arrayOfPruducts[index].price + "kr";
        divContener.append(price);

        let tag = document.createElement("h3");
        tag.innerHTML = arrayOfPruducts[index].tag;
        divContener.append(tag);  

        shop.append(divContener);
    }
}

function ChangeTag(event)
{
    switch (event.target.id) {
        case "Lego":
            console.log("1");
            break;
        case "Bygg": 
            console.log("2");
        break; 

        default:
            break;
    }

    console.log(event.target.id);
}

function CreatBase() 
{
    //creat div
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
    dropDown.addEventListener("change", (event) => {
        ChangeTag(event);
    })

    let choice = document.createElement("option");
    choice.innerHTML = " Tag Ingen";
    choice.id = "Ingen";
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Tag Bygg";
    choice.setAttribute("id", "Bygg");
    dropDown.append(choice);

    choice = document.createElement("option");
    choice.innerHTML = "Tag Lego";
    choice.id = "Lego";
    dropDown.append(choice);

    divMain.append(dropDown);

    //shop
    let divShop = document.createElement("div");
    divShop.classList = "shop";
    divMain.append(divShop);

    //append all
    body.append(divMain);

    //uppdate
    UppdateView(products);
}

//run
CreatBase();