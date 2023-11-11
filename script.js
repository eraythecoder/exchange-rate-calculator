const curr_one = document.querySelector("#currency-1");
const amount_one = document.querySelector("#amount-1");
const curr_two = document.querySelector("#currency-2");
const amount_two = document.querySelector("#amount-2");

const rateElement = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// Döviz kurlarını Fetch ile DOM'a getir
function calculate(){
  const c1 = curr_one.value;
  const c2 = curr_two.value;

  let a1 = amount_one.value;
  let a2 = amount_two.value;


  fetch(`https://api.exchangerate-api.com/v4/latest/${c1}`)
  .then(res => res.json())
  .then(data => {
     const rate = data.rates[c2];

     rateElement.innerHTML = `1 ${c1} = ${rate} ${c2}`
     amount_two.value = (amount_one.value * rate).toFixed(4)
  })

}
// Dövizleri yer değiştirme
function swapCurr(){
  const temp = curr_one.value;
  curr_one.value = curr_two.value;
  curr_two.value = temp;
  calculate();
}

// Event Listeners
curr_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
curr_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

swap.addEventListener("click", swapCurr);


calculate();

