// Accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    } 
    });
}

// Referral
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

// Generate UUID
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'tng-yxxxxxxx-4xxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


// Check for value in multi-dimensional array
function check(array, key, value) {
    return array.some(object => object[key] === value);
}


// RE-INTEGRATE AFTER WE SORT OUT NEW PAYMENT FLOW

// // Set partners and prices
// var partner_list = [{name: "rcm", price: "price_1IKwfiHZTUfzXfXGT5UetMg8"}];
// var price_id = find_price(partner_list, "p", "price_1GwuJDHZTUfzXfXGzgeOA7BX");


// Retrieve price from partners and prices array
// requires array in this format: {name: "partner", price: "stripe_price_id"}
function find_price(array, query_param, default_price){
    var p = getQueryVariable(query_param);
    var price = default_price;
    
    // Check if param is empty or set
    if(p != ""){

        // Check if param "p" matches value in partner array
        if(check(array, "name", p)){
            var index = array.findIndex((item) => item.name === p);
            var price = array[index].price;
        } else {
            
            // Set default price so match is found
            var price = default_price;
        }
    } 
    return price;
}
