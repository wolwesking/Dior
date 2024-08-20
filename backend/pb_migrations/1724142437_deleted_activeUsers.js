/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0a9hbpnwupcpnn0");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "0a9hbpnwupcpnn0",
    "created": "2024-08-19 19:56:29.849Z",
    "updated": "2024-08-20 08:26:44.209Z",
    "name": "activeUsers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pdrkecsj",
        "name": "peerId",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bqpbwvdt",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
