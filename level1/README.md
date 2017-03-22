# Level 1

We are building an e-commerce website. Our customers can:
  - add articles to a virtual cart
  - checkout the cart contents
  - get it delivered the next day

The customer is charged the sum of the prices of each article in their cart.

Prices are expressed in cents.

Write code that generates `output.json` from `data.json`

# What I did

level1.js can be executed through node: `node level1.js` and will run a series
of tests finishing with one asserting that the main function when given
`output.json` will return `data.json`.

The main pieces of functionality are:
 - building a map of the available articles
 - computing the total price of one cart given a reference map of articles
 - a combination of the above to answer the level 1 requirements.

I assume the data coming is is well formed: all expected fields are present and
of the correct type. If need be this could be ensured by running the incoming
data against some sort of schema.

The code do check against things that would go through a schema based
validation, namely: if asked to compute a price for a cart containing some
article not existing in the reference, or if two articles come with the same id.
