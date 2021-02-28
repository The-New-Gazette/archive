var stripe = Stripe('pk_live_zfgsI9EIiuSyXarhxxEaFuUQ00ClMitWig');

// If a fetch error occurs, log it to the console and show it in the UI.
var handleFetchResult = function(result) {
  if (!result.ok) {
    return result.json().then(function(json) {
      if (json.error && json.error.message) {
        throw new Error(result.url + ' ' + result.status + ' ' + json.error.message);
      }
    }).catch(function(err) {
      showErrorMessage(err);
      throw err;
    });
  }
  return result.json();
};

// Create a Checkout Session with the selected plan ID
var createCheckoutSession = function(priceId, couponId) {
  return fetch("https://tbowghedrj.execute-api.us-east-1.amazonaws.com/production/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId: priceId,
      couponId: couponId
    })
  }).then(handleFetchResult);
};

// Handle any errors returned from Checkout
var handleResult = function(result) {
  if (result.error) {
    showErrorMessage(result.error.message);
  }
};

var showErrorMessage = function(message) {
  var errorEl = document.getElementById("error-message")
  errorEl.textContent = message;
  errorEl.style.display = "block";
};


// Simply this later
document
  .getElementById("checkout-top")
  .addEventListener("click", function(evt) {
    createCheckoutSession("price_1ILYOFHZTUfzXfXGZ1MMeryc", "ZrJfAD38").then(function(data) {
      // Call Stripe.js method to redirect to the new Checkout page
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId
        })
        .then(handleResult);
    });
  });

document
  .getElementById("checkout-bottom")
  .addEventListener("click", function(evt) {
    createCheckoutSession("price_1ILYOFHZTUfzXfXGZ1MMeryc", "ZrJfAD38").then(function(data) {
      // Call Stripe.js method to redirect to the new Checkout page
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId
        })
        .then(handleResult);
    });
  });