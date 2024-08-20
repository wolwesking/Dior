/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9m5owk85jh8isf")

  // remove
  collection.schema.removeField("bijxjj6s")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9m5owk85jh8isf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bijxjj6s",
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
