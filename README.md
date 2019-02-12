# Konnektive Cart

Override default checkout behavior and redirect to a custom URL.


## How to use?

Add the `konnective-cart.js.liquid` snippet to the `snippets/` folder and then include it at the very start of the `cart.liquid` file, passing `cart` and `checkout_url` parameters:

```html
{%
  include 'konnektive-cart.js' with
    cart: cart
    checkout_url: 'https://checkout.my-site.com'
%}
```


## Options

There is a reduced set of options you can use to configure the KonnektiveCart behavior:

- `cart` (mandatory) the cart object.
- `checkout_url` (mandatory) the URL where checkout will redirect the customer. Default is `'https://checkout.konnektivecrm.com'`.
- `checkout_button_selector`: the query selector for the checkout button. Default is `'[type="submit"][name="checkout"]'`. Make sure it works for your theme.

For example, you could initialize the Konnektive Cart in this way:

```liquid
{%
  include 'konnektive-cart.js' with
    cart: cart
    checkout_button_selector: '[data-checkout-button]'
    checkout_url: 'https://checkout.my-site.com'
%}
```



## Checkout URL format

Konnektive Cart will redirect customers to a checkout URL and will pass the line
items information through a `products` parameter of the query string. It's value
is a list of (Product ID, Quantity) where the Product ID is obtained from the variant metafield `productId.productId`. Each item is separated by semi-colon (;),
internally, each pair is separated by a colon (:). Allowing as many items as the
URL can contain.

```
?products=<PID1>:<QTY1>;<PID2>:<QTY2>;<PID3>:<QTY3>
```

For example, this is a checkout URL for a cart with three line items, each item
has quantity 1:

```
https://checkout.konnektivecrm.com/?products=15979566792778:1;15979569053770:1;15979564367946:1
```

## Testing

Set checkout URL to point to [CodePen](https://codepen.io/anon/pen/rPpVYm).

```liquid
{%
  include 'konnektive-cart.js' with
    cart: cart
    checkout_button_selector: '[data-checkout-button]'
    checkout_url: 'https://codepen.io/anon/pen/rPpVYm'
%}
```
