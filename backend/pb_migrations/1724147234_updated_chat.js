/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dmf0pcl4mn08dox")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvrycdzv",
    "name": "messages",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dmf0pcl4mn08dox")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvrycdzv",
    "name": "chat",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
