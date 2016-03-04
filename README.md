A research tool based on data from Etsy
==========

Etsy is a peer-to-peer marketplace for vintage and handmade goods. An experimental work in progress on my part, this back-end application uses Express routing to display custom JSON data about Etsy's latest 25 listings at various GET routes.

Here are the user stories it currently follows:

```
GET /price - average price of the latest listings, highest price (with the listing), lowest price (with the listing)

GET /price-bluebird - same as /price but using promises rather than callbacks

GET /quantity - average quantity of per item, highest quantity (with the listing), lowest quantity (with the listing)

GET /materials - top 5 most common materials, and all the listings that contain them
```

Technologies Used
----
* Node.js
* Express for routing
* [Request](https://www.npmjs.com/package/request), an npm package that makes the call to Etsy's application
* [Bluebird](https://github.com/petkaantonov/bluebird), an npm package that converts callback-utilising functions in Node into ones that return promises
* [Compression](https://www.npmjs.com/package/compression), an npm package for compressing data
* Jasmine-Node for unit testing

How to use
------
1. Fork this repository and then clone it using `git clone <url>`
2. cd into the project
3. Run `npm install`
4. In the root folder, run `npm start`
5. Point your browser to `http:\\localhost:3000\<one of the routes above>` to see live, reorganised JSON data from Etsy's API.
