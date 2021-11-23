Follow the mobx React [performance guidelines](https://mobx.js.org/best/react-performance.html).

#DEFAULT_VENDOR
Please update the default vendor in .env file whenever its changed. Its hardcode value is used on the first page load due to FID and other performance issues. The subsequent requests do use the server provided default vendor.

##Virtual Pages
These are primarily used in analytics.

1. /login-success
2. /signup-success
3. /signup
4. /checkout-success (upon order success)
5. /set-delivery (upon opening of form to set delivery location)
6. /set-delivery-success (upon successfully updating delivery location)
7. /delivery-not-found (upon out of bound service area selection)
8. /side-menu (upon opening of side menu)
9. /profile-success (upon successfully updating the profile)