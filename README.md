# Tacoma Consignment Project Overview

Tacoma Consignment is a "brick-and-mortar" retail consignment business specializing in furniture and art. It is transitioning from a in-person based Quickbooks POS system to a joint online/in-person commerce system based on the following technologies:

* Shopify (eCommerce and POS)
* Stripe for consignor payout
* Azure SQL Server as master database and "source of truth" (open to discussion, but relational db preferred)
* Auth0 for identity management of:
  * consignors
  * customers
  * store staff
  * store admins
* Vuetify as a web front-end
* Segment for referral tracking and customer insights
* Axios for API management
* Mailchimp for email management and marketing campaigns

## MVP Feature Overview

The core system needs to enable the following roles and activities:

* Vuetify front-end based Store management single-page application including product onboarding with proper commission attribution and financial treatment of vendors and consignors
  * Product creation page and product-image upload via Vuetify web front-end, published to Shopify
  * Wishlist management via customer signup (Vuetify front-end) and product tagging on Shopify website
  * Print QR-code based product tag with product description, price, sku on Zebra, Epson, or other wireless label printer
  * Open-ended wishlist form analogous to product creation flow
* Customer signup flow that uses [Auth0](https://auth0.com/docs/quickstart/spa/vuejs) Shopify and other social connectors (Google, Facebook, Amazon, and [magic email links](https://auth0.com/docs/connections/passwordless/guides/email-magic-link)) to authorize customer, create an account in Azure and publish the results to appropriate Shopify and Mailchimp campaigns
  * New accounts trigger appropriate discount assignments and Mailchimp campaigncustomer discount via mailchimp email signup
  * Customer management including authentication via Auth0, referral tracking via Segment, and appropriate updating of relevant Mailchimp campaigns
* New consignor onboarding system, including invite system to transition existing merchants to new portal and payout alternatives
  * commission structures
  * active and sold products
  * billing address
  * PDF versions of contracts
* Vendor and consignor payout via automated payout on Stripe or manual checks generated from a PDF template and printed; Azure system must enforce proper accounting
* Synching transactions within and across systems:
  * Products, consignors, and staff store management functionality within Azure
  * Automated synchronization with Shopify via Webhooks
  * Communicate with web front-end via Vuetify/Axios/Azure/Auth0
  * Job execution of automatic discounting functionality
  * Publishing and synching data to Shopify via Shopify REST (or Graph) API

The Tacoma Consignment SQL Server database is the source of truth for all data. To do so it has to also capture all the external transactions that occur in the Shopify and Stripe systems, as well as integrate into the Vuetify front-end to enable the management of the store.













# Vue Events App w/ Authentication

This is a simple Vue website that demonstrates how to get started with Vue.js, add authentication, and restrict certain pages from users who aren't logged in. You can clone this project and follow the directions below or [check out the tutorial](https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login/) where I cover all the deets step by step!

![Vue events app](https://cdn.auth0.com/blog/vue-meetup/vue-event-app-home.png)

## Project setup

```bash
git clone https://github.com/auth0-blog/vue-events-auth.git
npm install
npm run serve
```

View it in the browser at [http://localhost:8080](http://localhost:8080).

## Adding Authentication to our Vue App

We're going to use Auth0 to add authentication to the app.

First, [sign up for a free Auth0 account](https://auth0.com/signup). Once you're registered, you'll be taken to the [Auth0 management dashboard](https://manage.auth0.com/dashboard/).

Click on the big red button that says "Create Application". 

Name it "Vue Events" (or anything you'd like), click on "Single Page Web Applications" for "application type", and press "Create".

![Auth0 Dashboard](https://cdn.auth0.com/blog/vue-meetup/auth0-create-app.png)

Now click into "Settings" and fill in some information that Auth0 needs to configure authentication:

**Allowed Callback URLs** &mdash; `http://localhost:8080`
**Allowed Logout URLs** &mdash; `http://localhost:8080`
**Allowed Web Origins** &mdash; `http://localhost:8080`

That's all we need from the dashboard for now, but don't click out yet. We'll need to pull some of these values from the dashboard into our application soon.

Create a file (and add to `.gitignore`) for the config values:

```bash
touch auth_config.json
```

Now open up `auth_config.json` and paste in:

```js
{
  "domain": "your-domain.auth0.com",
  "clientId": "yourclientid"
}
```

**Finding your `auth_config` values:**

* Head to the [Auth0 dashboard](https://manage.auth0.com/dashboard)
* Click on "Applications" and select your application
* Click on "Settings"
* Copy the value for "Domain" and paste it into `domain` in `auth_config.json`
* Copy the value for "Client ID" and paste it into `clientId` in `auth_config.json`

Now you should be able to sign in to the application and access single event details.
