const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"


// Adding options of different countries currency.

let selects = document.getElementsByClassName("add");
console.log(selects);
console.log(countryList);

for(let select of selects)
{
    for(let currcode in countryList)
    {
        let newopt = document.createElement("option");
        if(select.name == "from" && currcode == "USD")
        {
                newopt.selected = "selected";
        }
        else if(select.name == "to" && currcode == "INR")
        {
                newopt.selected = "selected";
        }
        newopt.innerText = currcode;
        newopt.value = currcode;
        select.append(newopt);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}


// Updating the flag for selecting different countires currency

function updateflag(element)
{
   let currencycode = element.value;
   let countrycode = countryList[currencycode];
   let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;    // fetching flag image from this link
   let img = element.previousElementSibling;   // getting prev sibling
   img.src = newsrc;
}



// on the click of button fetching currency exchnage value data with the help of API (external server)

let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.getElementById("msg");

// when windiw loads or refreshes it calculates realtime data for usd to inr
window.addEventListener("load", ()=>{
    updateExchangeRate();
})

btn.addEventListener("click", (evt)=>{
     evt.preventDefault();
     updateExchangeRate();
})

async function updateExchangeRate(){
    let amount = document.querySelector(".amount input").value;
    if(amount == "" || amount<0)
    {
       amount = 1;
       document.querySelector(".amount input").value = 1;
    }
    
   // console.log(fromCurr.value, toCurr.value); 
    let url = `${baseurl}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let total = (amount*rate).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${total} ${toCurr.value}`;
    console.log(rate);
    console.log(amount);
    console.log(total);
}


