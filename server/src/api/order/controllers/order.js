"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, email } = ctx.request.body;
    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email:email,
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000/checkout/failed",
        line_items: lineItems,
      });

      // create the item LINEITEM, SESSIONID, ITEMS
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      // return the session id
      return { stripeSession: session };
    } catch (error) {
      console.error(error);
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  }
  
}));