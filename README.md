# Konnektive Cart

Override default checkout behavior and redirect to a custom URL.



## How to use?

You have to add `src/konnektive-cart.js` script to `assets/`, and reference it
in your `theme.liquid` file:

```
{% if template == 'cart' -%}
  <script src="{{ 'konnektive-cart.js' | asset_url }}" defer="defer"></script>
{%- endif %}
```

You can optionally copy and pase the source code into your main scripts file,
normally `theme.js.liquid` file.

Add this piece of script at the very start of the `cart.liquid` file:

```
<script>
  document.addEventListener("DOMContentLoaded", function(event) {

    if (window.KonnektiveCart) {
      var kCart = new KonnektiveCart({
        lineItems : {{ cart.items | json }}
      });

    } else {
      console.error(
        'KonnektiveCart is not available.',
        'Be sure to reference konnektive-cart.js script in this page.'
      );

    }

  });
</script>
```



## Options

There is a reduced set of options you can use to configure the KonnektiveCart behavior:

- `checkoutButtonSelector`: the query selector for the checkout button. Default is `'[type="submit"][name="checkout"]'`.
- `checkoutUrl` the URL where checkout will redirect the customer. Default is `'https://checkout.konnektivecrm.com'`.

For example, you could initialize the Konnektive Cart in this way:

```
var kCart = new KonnektiveCart({
  lineItems : {{ cart.items | json }},

  // Optional
  checkoutButtonSelector: '[data-checkout-button]',
  checkoutUrl: 'https://checkout.my-site.com'
});
```



## Checkout URL format

Konnektive Cart will redirect customers to a checkout URL and will pass the line
items information through a `products` parameter of the query string. It's value
is a list of (Variant ID, Quantity). Each item is separated by semi-colon (;),
internally, each pair is separated by a colon (:). Allowing as many items as the
URL can contain.

```
?products=<VID1>:<QTY1>;<VID2>:<QTY2>;<VID3>:<QTY3>
```

For example, this is a checkout URL for a cart with three line items, each item
has quantity 1:

```
https://checkout.konnektivecrm.com/?products=15979566792778:1;15979569053770:1;15979564367946:1
```
