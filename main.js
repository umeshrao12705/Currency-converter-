// Clone the same options for "toCurrency"
document.getElementById("toCurrency").innerHTML =
  document.getElementById("fromCurrency").innerHTML;

async function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultEl = document.getElementById("result");
  
  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount.";
    return;
  }
  
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    
    if (!data.rates[toCurrency]) {
      resultEl.textContent = "Conversion rate not available.";
      return;
    }
    
    const rate = data.rates[toCurrency];
    const converted = amount * rate;
    
    resultEl.textContent = `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    resultEl.textContent = "Error fetching exchange rate. Please try again.";
  }
}