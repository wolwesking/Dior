/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0a9hbpnwupcpnn0")

  collection.name = "activeUsers"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0a9hbpnwupcpnn0")

  collection.name = "active"

  return dao.saveCollection(collection)
})
