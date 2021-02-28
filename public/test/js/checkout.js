var stripe = Stripe('pk_test_51GvR6wHZTUfzXfXG2PDWiTHvIwfgiBPtDi6ypDHy347NeAfpyTT9ssUkPOZaw3jtGl6hqpnMVEOJ9gy3gpDVoLsd00wExT8V9l');

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
  return fetch("https://7a970lzp20.execute-api.us-east-1.amazonaws.com/dev/create-checkout-session", {
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


// Turn this into a checkout_button function since each partner will need one -- TO DO

// Inputs: Number of buttons on page, priceID, CouponID || ""
// Example: (3, "price_123", "")
function checkout_btn(btn_count, price, coupon) {
  var button_count = btn_count;
  var i;
  for (i = 1; i <= button_count; i++) {

    var button = document.getElementById('checkout-' + i);
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
checkout_btn(3, "price_1GwuJDHZTUfzXfXGzgeOA7BX", "");

// var button_count = 3;
// var i;
// for (i = 1; i <= button_count; i++) {

//   var button = document.getElementById('checkout-' + i);
//   if(button){
//     document
//     button.addEventListener("click", function(evt) {
//       createCheckoutSession("price_1GwuJDHZTUfzXfXGzgeOA7BX", "").then(function(data) {
//         // Call Stripe.js method to redirect to the new Checkout page
//         stripe
//           .redirectToCheckout({
//             sessionId: data.sessionId
//           })
//           .then(handleResult);
//       });
//     });
//   }

// }

// RCM Checkout

// var button_count = 3;
// var i;
// for (i = 1; i <= button_count; i++) {

//   var button = document.getElementById('checkout-' + i);
//   if(button){
//     document
//     button.addEventListener("click", function(evt) {
//       createCheckoutSession("price_1GwuJDHZTUfzXfXGzgeOA7BX", "").then(function(data) {
//         // Call Stripe.js method to redirect to the new Checkout page
//         stripe
//           .redirectToCheckout({
//             sessionId: data.sessionId
//           })
//           .then(handleResult);
//       });
//     });
//   }

// }