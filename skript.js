console.log("hello js is working");

let products = [
    {
        name: "skruv",
        pris: 100,
        tag: "bygg",
    },
    {
        name: "Hammare",
        pris: 100,
        tag: "bygg",
    },
];


function UppdateView() {

}

function CreatBase() {
    let body = document.querySelector("body");
    let divShop = document.createElement("div");
    divShop.classList = ".shop";

    let h1 = document.createElement("h1");
    h1.innerHTML = "Shop";
    divShop.append(h1);

    let dropDownLabel = document.createElement("label");


    //drop down
    let dropDown = document.createElement("select");

    dropDown.addEventListener("change", (event) => {



        console.log(event.target.value);
    })

    let choice = document.createElement("option");
    choice.innerHTML = "test";
    choice.id = "TEST";
    dropDown.append(choice);

    let choice2 = document.createElement("option");
    choice2.innerHTML = "test2";
    choice2.id = "TEST2";
    dropDown.append(choice2);


    divShop.append(dropDown);


    //append all
    body.append(divShop);

}

//run
CreatBase();