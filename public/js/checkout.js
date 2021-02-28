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

// Checkout Buttons
function checkout_btn(btn_prefix, btn_count, price, coupon) {
  var button_count = btn_count;
  var i;
  for (i = 1; i <= button_count; i++) {

    var button = document.getElementById(btn_prefix + '-checkout-' + i);
    if(button){
      document
      button.addEventListener("click", function(evt) {
        createCheckoutSession(price, coupon).then(function(data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });
    }

  }
  return;
}

// Main Page Checkout
checkout_btn("home", 3, "price_1H4JSAHZTUfzXfXG5JeVfFZd", "");

// RCM Checkout
checkout_btn("rcm", 2, "price_1ILYOFHZTUfzXfXGZ1MMeryc", "ZrJfAD38");