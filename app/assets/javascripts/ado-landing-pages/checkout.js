(function () {
  'use strict';

  var payment_id;
  var loc = window.location;
  var prod = (/(.*)dev\.local/g).test(loc.hostname) != true;

  function ajax(method, url, data) {
    var deferred = Q.defer()
    $.ajax({
      method: method,
      url: '/api' + url,
      contentType: 'application/json',
      dataType: "json",
      data: JSON.stringify(data),
      success: function (res) {
        deferred.resolve(res);
      },
      error:  function (err) {
        //console.log(err);
        deferred.reject(err);
      }
    });
    return deferred.promise;
  }

  var Payment = {
    create: function (cart) {
      var items = cart.map(function (c) {
        return {
          package: {id: c.package_id},
          quantity: c.quantity
        };
      });
      return ajax("POST", "/v1/payment", {items: items});
    },
    execute: function (data) {
      return ajax("POST", '/v1/payment/execute', data);
    },
    failed: function (pid) {
      return ajax("POST", '/v1/payment/failed', {id: pid});
    }
  };

  function initPaypalBtn () {
    paypal.Button.render({
      env: prod ? 'production' : 'sandbox', // Or 'sandbox',
      commit: true, // Show a 'Pay Now' button
      style: {
        color: 'gold',
        size: 'medium'
      },

      payment: function(data, actions) {
        if (window.CART.length === 0) {
          toastr.error('Please add items to your cart.', 'Empty Cart');
          return Q.reject(true);
        } else {
          console.log(window.CART)
          return Payment.create(window.CART)
            .then(function (data) {
              payment_id = data.id;
              return data.id;
            })
            .catch(function(res) {
              if (res.status === 401) {
                var err = 'Please login first.'
                var href = window.SIGN_IN_URL;
                setTimeout(function () {
                  window.location.assign(href);
                }, 2000);
                toastr.error(err);
                return Q.reject(err);
              } else if (res.status == 422) {
                var err = res.responseJSON.error || res.responseJSON.message;
                toastr.error(err);
                return Q.reject(err);
              }
              return Q.reject(res);
            });
        }
      },

      onAuthorize: function(data, actions) {
        //console.log(data);
        return Payment.execute({
          payment_id: data.paymentID,
          payer_id:   data.payerID
        })
          .then(function(data) {
            window.location.assign(data.redirect_to);
          })
          .catch(function (res) {

            if (payment_id)
              Payment.failed(payment_id);

            var err = res.responseJSON.error || res.responseJSON.message;
            window.alert(err + "\n\nYOUR BALANCE WAS NOT DEDUCTED");
            toastr.error("Transaction did not proceed.");
            //return Q.reject(res);
          });
      },

      onCancel: function(data, actions) {
        toastr.warning("Payment was cancelled.");
        Payment.failed(payment_id);
      },

      onError: function(err, data) {
        //console.log('err:', err);
        //err = typeof err == 'string' ? err : "Something went wrong.";
        toastr.error('Transaction Failed');
        Payment.failed(payment_id);
      }
    }, '#paypal-button');
  }

  $(function () {
    var el = $("#paypal-button");
    if (el.length)
      initPaypalBtn();
  });

})();
