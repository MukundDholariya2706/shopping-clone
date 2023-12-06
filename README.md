# shopping-clone

To Run application

1. npm i
2. npm start

# For Stripe Payment using payment element (one time payment)

    # Frontend
        1. create payment element using stripe public key
        2. request to backend to get clientSercret key

    # Backend
        1. create clientSercret key using stripe.paymentIntents.create({});
        2. send to frontend to for create payment element
