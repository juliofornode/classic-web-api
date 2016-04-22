## Classic Web API
A classic web API solves the CRUD model just using the common http verbs (get and post). This is
a good approach when we need to develop an api that will be used in the web.

How does this approach solve the CRUD model:
* CREATE: post /new-item with Item.save
* READ:
    - get all: get /items with Item.find
    - get one: get /item/:id with Item.findById

* UPDATE:
    - get one: get /item/:id with Item.findById
    - post one: post /item/:id with Item.save

* DELETE:
    - get /delete-item/:id with Item.remove