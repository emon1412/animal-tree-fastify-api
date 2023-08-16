Prerequisites:

- nodejs
- yarn

`yarn install` to install dependencies

`yarn start` to start the server with seeded database

`yarn test:unit` to run unit tests

`yarn clear-db` to clear the database. Rerun `yarn start` to reseed + start the server again.

---
How-to:
- Get the tree via `GET /api/tree`.

Example response:
```
[
    {
        "id": 1,
        "label": "root",
        "children": [
            {
                "id": 2,
                "label": "ant",
                "children": []
            },
            {
                "id": 3,
                "label": "bear",
                "children": [
                    {
                        "id": 4,
                        "label": "cat",
                        "children": []
                    },
                    {
                        "id": 5,
                        "label": "dog",
                        "children": [
                            {
                                "id": 6,
                                "label": "elephant",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 7,
                "label": "frog",
                "children": []
            }
        ]
    }
]
```

- Create a new tree node via `POST /api/tree` using the following request body. `parentId` is nullable and a root node will be created if so.
```
{
		"label": "new node",
		"parentId": 1
}
```