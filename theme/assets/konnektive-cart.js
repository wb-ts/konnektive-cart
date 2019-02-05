(function () {

  var debug = true ? console.log.bind(console, '[DEBUG][KonnektiveCart]') : function () {};

  debug('Script loaded');

  window.KonnektiveCart = function (options) {


    var self = {};


    function init() {
      self.options = Object.assign({
        lineItems : [],
        checkoutButtonSelector: '[type="submit"][name="checkout"]',
        checkoutUrl: 'https://checkout.konnektivecrm.com'
      }, options);

      self.$checkoutButton = $(self.options.checkoutButtonSelector);

      debug('Initialized with options', options);

      inject();
    }


    function inject() {
      debug('Inject');
      self.$checkoutButton.on('click', checkout);
    }


    function checkout(event) {
      var checkoutUrl = getCheckoutURL(self.options.lineItems);
      debug('Checkout ->', checkoutUrl);
      event.preventDefault();
      window.location.href = checkoutUrl;
    }


    function getCheckoutURL(lineItems) {
      var urlLineItems = lineItems.reduce(function (output, item) {
        return output.concat([ item.variant_id + ':' + item.quantity ]);
      }, []).join(';');

      return self.options.checkoutUrl + '?products=' + urlLineItems;
    }



    init();

    return self;

  };

}())
