# Re-Lux - A marketplace app with a sleek UI/UX design
by Katie Hill & Tony Rodriguez

![Re-Lux Homepage](src/assets/deployed.png)

*Screenshot of dynamic homepage displaying the latest listings*


## Tech stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"
  alt=“React” width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg"
  alt="Mongoose" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
  alt="Express" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
  alt="Node js" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg"
  alt="MongoDB" width="40" height="40"/>

## Timeframe

- **Duration** 7 days
- **Team** Joint project with Tony Rodriguez (TonyRod116 on GitHub)
- **Contributions** React frontend development with full CRUD operations for items, image uploads, checkout flow with Stripe integration, and UI/UX design

## About

Re-Lux is a marketplace app where users can sell luxury goods, including designer clothing and high-end tech. It works in a similar way to apps like Vinted and Vestiaire Collective in that users can either make an offer on an item or add the item straight to their bag and proceed to checkout. The app also allows users to rate and review sellers, favorite items, and accept/reject offers on items they are selling. 

This was an ambitious joint project with my colleague Tony Rodriguez on the General Assembly Software Engineering Bootcamp. It involved building a dynamic resale platform in React with multiple interconnected features. Overall, our approach worked well and we were able to deliver a fully functional app with no bugs. However, the complexity of the app threw up a number of challenges during the build.

You can view the live app here: https://re-lux-marketplace.netlify.app/


### Brief


Our brief was to build a MongoDB/Express/React/Node.js application with full CRUD that met the following criteria: 

- Frontend built with React
- JWT token-based authentication to sign up, sign in, and sign out users
- Authorization implemented across frontend and backend to esnure guest users are not able to create, update, or delete data
- At least two data entities in addition to the User model (one must have a relationship with the User model)
- Full CRUD functionality
- No secret keys held on the frontend
  

## Installation


For the frontend, clone this repository and install the following packages: 


```bash
npm install react
```

```bash
npm install react-dom
```

```bash
npm install react-router
```
```bash
npm install react-router-dom
```

```bash
npm install react-icons
```

For the payment gateway:

```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

For HTTP requests: 

```bash
npm install axios
```


## Planning 

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" 
     alt="Figma" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain-wordmark.svg" 
	alt="Trello" width="80" height="60" />

I created the UI/UX design in Figma and a Trello board to divide the tasks and plan out what we needed to achieve each day.

#### UI/UX design (Figma)


<img width="920" height="666" alt="Re-Lux_homepage_index" src="https://github.com/user-attachments/assets/45659947-cb53-42f2-a0af-8c70ae3709ac" />

<img width="893" height="623" alt="Re-Lux_checkoutflow" src="https://github.com/user-attachments/assets/6d97ddbd-2975-465d-abbd-734d7f46b732" />



## Build

We used Vite to streamline the setup process and provide basic scaffolding for the app. We then divided the components between us to avoid working on the same features and ensure a clear separation of concerns. 

#### 1) Core Navigation & Layout

I created a responsive layout with consistent styling based on the Figma UI/UX design: 

- Homepage
- Navigation bar
- Footer
- Categories pages
- Custom 404 “Not found” page

#### 2) Item Listings

I implemented full CRUD operations for the items for sale, with separate form and page components for creating and editing items: 

- Index (basic list view)
- Show (detail view)
- Create (new item form)
- Update (edit item form)

For ease, we used Axios (rather than native fetch) to consume the API:

![Re-Lux_axioscalls](https://github.com/user-attachments/assets/d4e99bb8-d64f-4c22-b9e4-eb67198ba44e)

Once the basic CRUD operations were in place, I began working on additional features.

#### 3) Image Uploads

I created a reusable image upload component to allow users to add multiple photos (stored on Cloudinary):

<img width="642" height="735" alt="Re-Lux-ImageUpload" src="https://github.com/user-attachments/assets/85d6cabb-ebcd-4bf9-8dd9-93afab37deb3" />


#### 4) Cart

I developed individual components for the cart and a context wrapper for state management:

- Cart page 
- Cart item (controls how the individual items are displayed in the cart)
- Cart summary (lists the items and calculates the order total)
- Cart Context 

After setting up the context, I wrapped the app with `<CartProvider>` at root level. The custom useCart hook gives the components access to the cart state and allows users to add or delete items before checkout:

<img width="589" height="1000" alt="Re-Lux_CartContext" src="https://github.com/user-attachments/assets/6164d128-b0e5-4833-8ee5-93f5941cf023" />

#### 5) Checkout & Payment Gateway

I developed form and page checkout components and integrated Stripe for the payment gateway: 

- Checkout form (billing and card details)
- Checkout page 
- Payment processing (via Stripe)
- Custom error messages
- Order confirmation 

I decided against calling the API using Axios in a separate /services file because I wanted to keep all the logic for the payment gateway contained within the checkout form:

<img width="613" height="717" alt="Re-Lux_checkout" src="https://github.com/user-attachments/assets/3ad2c821-0cdb-44e2-8b08-2bc6cdd3861f" />

This component sends the cart data to the /purchase-intent backend route via fetch (please see <https://github.com/KatieHill-Fr-Gr/Re-Lux-backend> for details), passing the billing information and order total to the payment gateway (the total is calculated on both the frontend and backend for safety).

The `<CardElement>` options and billing details have been customised, while success and error messages provide feedback to the user:

<img width="643" height="965" alt="Re-Lux_checkout_cardelement_billing" src="https://github.com/user-attachments/assets/fbff00d1-68bc-4666-9ca2-322472afd208" />

### Challenges

#### 1) Item types



#### 2) Image upload (state management)



#### 3) Stripe integration

I initially used Stripe's pre-built checkout page `<CheckoutProvider>` but then decided to use Stripe Elements instead so that I could customise the checkout flow and keep it consistent with the rest of the design. This required more work so I opted for the simpler `<CardElement>` rather than the newer `<PaymentElement> UI component. I refactored my code by removing `<CheckoutProvider>`, replacing it with my custom `<CartProvider>', and wrapping the checkout form inside <Elements stripe={stripePromise}> on the checkout page:

<img width="657" height="503" alt="Re-Lux_checkoutpage" src="https://github.com/user-attachments/assets/3aa63dcf-61c8-42fd-b075-dc64ede64266" />


## Key Learnings

Building a dynamic resale platform made full use of React’s capabilities (reusable components, state management, packages etc.) and allowed me to gain a thorough understanding of React frontend development.

## Bugs

There are currently no known bugs and the app is working as expected.

## Future Improvements

- Search & filter functionality
- Public seller profile (profiles are currently only visible to the user)
- More sophisticated payment gateway (migration from `<CardElement>` to `<PaymentElement>' to offer more payment options)
- More consistent and user-friendly notifications (using the React-Toastify package)



