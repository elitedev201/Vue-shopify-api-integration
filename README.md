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


## Project setup

First, clone this repo and switch into the repo folder:

```bash
git clone git@github.com:auth0-blog/vue-express-auth.git
cd vue-express-auth
```

Now you need to install the dependencies for the client and server code.

### Set up the Express server

```bash
cd server
npm install
```

### Set up the Vue client

In a new terminal tab:

```bash
cd ../client
npm install
```

Now click into "Settings" and fill in some information that Auth0 needs to configure authentication:

**Allowed Callback URLs** &mdash; `http://localhost:8080`

**Allowed Logout URLs** &mdash; `http://localhost:8080`

**Allowed Web Origins** &mdash; `http://localhost:8080`

Scroll down and click "Save Changes".

### Create the Auth0 API

Next, click on "APIs" on the left menu. Click "Create API" and call it "Vue Express API" (or anything you'd like). For "Identifier", we recommend a URL such as `https://vue-express-api.com`. It doesn't have to be a publicly available URL and we'll never call it, it's just for naming purposes. You can leave "Signing algorithm" as is and then press "Create".

That's all you need from the dashboard for now, but don't click out yet. You'll need to pull some of these values from the dashboard into your application soon.

In the `client` directory, create a file for the config values:

```bash
touch auth_config.json
```

> **Important:** Make sure you add `auth_config.json` to your `.gitignore` file!

### Connecting with Auth0

Now open up `auth_config.json` and paste in:

```js
{
  "domain": "your-domain.auth0.com",
  "clientId": "your-client-id",
  "audience": "https://your-identifier.com"
}
```

**Finding your `auth_config` values:**

* Head to the [Auth0 dashboard](https://manage.auth0.com/dashboard)
* Click on "APIs" and select your API
* Copy the value for "Identifier" and paste it into `audience` in `auth_config.json`
* Click on "Applications" and select your application (Vue Events)
* Click on "Settings"
* Copy the value for "Domain" and paste it into `domain` in `auth_config.json`
* Copy the value for "Client ID" and paste it into `clientId` in `auth_config.json`

Now you should be able to sign in to the application, but you still won't be able to access single event details because you need to add this information to the server side where the API access token is validated.

Open up `server/server.js` and find:

```js
const authConfig = {
    domain: "YOUR-DOMAIN",
    audience: "YOUR-IDENTIFIER"
};
```

Replace the `domain` and `audience` placeholders with the values listed above.

### Testing the app

Now that everything is set up, you can test the app.

**Run the server**

Make sure you're in the `server` directory in your terminal and start the server with:

```bash
npm start
```

Server is running at [http://localhost:8000](http://localhost:8000).

**Run the client**

In your other tab, make sure you're in `client` and run:

```bash
npm run serve
```

You can view the Vue app in the browser at [http://localhost:8080](http://localhost:8080).
 
You can now also sign in, receive an API access token, and view an event's details page at [http://localhost:8080/event/1](http://localhost:8080/event/1).

Be sure to [check out the full tutorial](https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/) to see how this process works.
