/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9m5owk85jh8isf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0gz6pegu",
    "name": "isInCall",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9m5owk85jh8isf")

  // remove
  collection.schema.removeField("0gz6pegu")

  return dao.saveCollection(collection)
})
