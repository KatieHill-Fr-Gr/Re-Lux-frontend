# Re-Lux - A marketplace app with a sleek UI/UX design
by Katie Hill & Tony Rodriguez

<img width="1428" height="1344" alt="Re-Lux_deployedhomepage" src="https://github.com/user-attachments/assets/fad12ecf-7a24-4994-bd66-3dc8676213aa" />

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

Re-Lux is a marketplace app where users can sell luxury goods, including designer clothing and high-end tech. It works in a similar way to apps like Vinted and Vestiaire Collective in that users can either make an offer on an item or add the item straight to their bag and proceed to checkout. The app also allows users to rate and review sellers, favourite items, and accept/reject offers on items they are selling. 

This was an ambitious joint project with my colleague Tony Rodriguez on the General Assembly Software Engineering Bootcamp. It involved building a dynamic resale platform in React with a complex frontend architecture and multiple interconnected features. Overall, our approach worked well and we were able to deliver a fully functional app with no bugs. However, we faced a number of challenges during the build due to the complexity of the app.

You can view the live app here: https://re-lux-marketplace.netlify.app/


### Brief


Our brief was to build a MongoDB/Express/React/Node.js application with full CRUD that met the following criteria: 

- Frontend built with React
- JWT token-based authentication to sign up, sign in, and sign out users
- Authorization implemented across frontend and backend to ensure guest users are not able to create, update, or delete data
- At least two data entities in addition to the User model (one must have a relationship with the User model)
- Full CRUD functionality
- No secret keys held on the frontend
  

## Installation


For the frontend, clone this repository and install the following packages: 


```bash
npm install react
npm install react-dom
npm install react-router
npm install react-router-dom
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

```
export const itemShow = (itemId) => {
    return axios.get(`${BASE_URL}/${itemId}`)
}

export const itemCreate = (formData) => {
    return axios.post(BASE_URL, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const itemUpdate = (itemId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}/${itemId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
```

Once the basic CRUD operations were in place, I began working on additional features.

#### 3) Image Uploads

I created a reusable image upload component to allow users to add multiple photos (stored on Cloudinary):

```
const ImageUpload = ({ labelText = 'Upload a photo', fieldName = 'image', setFormData, imageURLs, setUploading }) => {
    const [error, setError] = useState('')

    const handleUpload = async (e) => {

        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true)
        setError('')

        try {
            const files = Array.from(e.target.files);
            const responses = await Promise.all(files.map(file => uploadImage(file))
            )
            const justURLs = responses.map(response => response.data.secure_url)

            setFormData(formData => {
                return {
                    ...formData,
                    [fieldName]: [...formData.images, ...justURLs]
                }
            })
            e.target.value = ''

        } catch (error) {
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
        {imageURLs.length > 0 && (
            <div className="image-preview-container">
                {imageURLs.map((url, idx) => (
                    <img 
                        key={idx} 
                        className='uploaded-image' 
                        src={url} 
                        alt={`Preview ${idx + 1}`} 
                    />
                ))}
            </div>
        )}

            {error && <p className='error-message'>{error}</p>}

            <label htmlFor={fieldName}>{labelText}</label>
            <input type="file" name={fieldName} id={fieldName} onChange={handleUpload} multiple />

        </>
    )
}
```

#### 4) Cart

I developed individual components for the cart and a context wrapper for state management:

- Cart page 
- Cart item (controls how the individual items are displayed in the cart)
- Cart summary (lists the items and calculates the order total)
- Cart Context 

After setting up the context, I wrapped the app with `<CartProvider>` at root level. The custom useCart hook gives the components access to the cart state and allows users to add or delete items before checkout:

```
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CheckoutProvider stripe={ stripePromise }>
        <App />
        </CheckoutProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
```

```
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
```

#### 5) Checkout & Payment Gateway

I developed form and page checkout components and integrated Stripe for the payment gateway: 

- Checkout form (billing and card details)
- Checkout page 
- Payment processing (via Stripe)
- Custom error messages
- Order confirmation 

When integrating Stripe, I decided against calling the API using Axios in a separate /services file because I wanted to keep all the logic for the payment gateway contained within the checkout form:

```
const createPaymentIntent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/purchase-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(calculateTotal() * 100),
            cartItems: cart,
            currency: 'eur',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Backend error:', errorData)
          throw new Error(errorData.error || 'Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
      } catch (err) {
        setError('Failed to initialize payment. Please try again.')
        console.error('Payment intent creation failed:', err)
      } finally {
        setLoading(false)
      }
    };

    createPaymentIntent()
  }, [cart]);
```

This component sends the cart data to the /purchase-intent backend route via fetch, passing the billing information and order total to the payment gateway (the total is calculated on both the frontend and backend for safety).

The `<CardElement>` options and billing details have been customised, while success and error messages provide feedback to the user:

```
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146'
    }
  }
}
```

```
  if (success) {
    return (
      <div className="success-message">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <p>Payment ID: {paymentIntentId}</p>
      </div>
    );
  }
```

### Challenges


#### 1) Image upload

I refactored the image upload component to avoid losing the existing images when updating the item listing. Instead, formData is updated by appending the new image URLs to the existing image array:

```
      setFormData(formData => {
                return {
                    ...formData,
                    [fieldName]: [...formData.images, ...justURLs]
                }
            })
```

#### 2) Already added to cart

Since this is a resale platform and it is not possible to buy more than one item, it was necessary to prevent the user from adding the same item to their cart more than once. I added this line of code to the individual item page to check if the item had already been added (using the cart state): 

```
  const isInCart = item ? cart.some(cartItem => cartItem.id === item._id) : false
```

If the item has already been added, a user message will appear and the item will not be added again.


#### 3) Stripe Checkout vs Elements

I initially used Stripe's pre-built checkout page `<CheckoutProvider>` but then decided to switch to Stripe Elements so that I could customise the checkout flow and keep it consistent with the rest of the design. This required more work so I opted for the simpler `<CardElement>` rather than the newer `<PaymentElement>` UI component. I refactored my code by removing `<CheckoutProvider>`, replacing it with my custom `<CartProvider>`, and wrapping the checkout form inside `<Elements stripe={stripePromise}>` on the checkout page:

```
const CartContext = createContext()

const CartProvider = ({ children }) => {

    const { user } = useContext(UserContext)

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

     useEffect(() => {
        setCart([])
    }, [user])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addItem = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id)

            if (existingItem) {
                return currentCart
            } else {
                return [...currentCart, item]
            }
        })
    }

    const removeItem = (itemId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== itemId))
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}
```

#### 4) User Authentication

Although the backend configuration prevents guest users from performing CRUD operations, it was necessary to manage this on the frontend to ensure a seamless user experience. I implemented protected routes to redirect guest users away from pages that were only available to logged-in users:

```
        <Route path="/items/new" element={user ? <ItemCreatePage /> : <Navigate to="/sign-in" replace />} />
        <Route path="/items/:itemId/edit" element={user ? <ItemUpdatePage /> : <Navigate to="/sign-in" replace />} />
        <Route path="/items/:itemId" element={<ItemShow />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/sign-in" replace />} />
        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/sign-in" replace />} />
```

## Wins

- Responsive, mobile-first UI/UX design suitable for luxury e-commerce.
- Clean and maintainable Stripe integration.
- Reusable image upload component that supports multiple file uploads.

## Key Learnings

Building a highly interactive marketplace app helped me gain a thorough understanding of React's capabilitiies: 

- Modular component-based architecture (and the importance of separating concerns)
- User-centric design (deciding how to implement the core layout, navigation, and checkout flow)
- Integration of third-party services (Stripe, Cloudinary)
- State management (passing props in the image reload component)
- User authentication using local storage & creating protected routes

I also gained valuable experience of working with another developer using Git for version control. We kept merge conflicts to a minimum through branch management and communication via Slack while working simultaneously on separate components. I really enjoyed working with Tony and I think we were both proud of the end result!

## Bugs

There are currently no known bugs and the app is working as expected.

## Future Improvements

- Enhanced UX with drag & drop functionality
- Search & filter functionality
- Public seller profile (profiles are currently only visible to the user)
- More sophisticated payment gateway (migration from `<CardElement>` to `<PaymentElement>` to offer more payment options)
- More consistent user feedback (using the React-Toastify package)



