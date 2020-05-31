# blog
Simple blog

## Requirements
- docker 18.09.6
- docker-compose 1.24.0

## Installation
blog development server is configured to run with docker-compose.

In order to start the development server just run:
```
blog$ docker-compose up
```
The previous command will download all required docker images (nodejs and mongodb) and then it will start the server. Finally, once you are done, you can stop the server just hitting `^C`

In order to fully uninstall the server (including db volumes) you can run:
```
blog$ docker-compose down -v
```
## REST API
By default, the development server will wait for connections on [http://localhost:3000/](http://localhost:3000/) and (for now) you can use your favourite `HTTP Client` to make the following requests:
### List authors
```
GET /authors
```
### List articles
```
GET /articles
```
### Create a new article
```
POST /articles
Content-Type: application/json
```
```json
{
    "title": "Some title",
    "short_description": "description",
    "long_description": "some long \n description",
    "authors": ["5d118b2a24203f5d06b55c7d","5d118b2a24203f5d06b55c7e"]
}
```
### View an article
```
GET /articles/:id
```
### Update an article
```
PATCH /articles/:id
Content-Type: application/json
```
```json
{
    "title": "Other title",
    "short_description": "different description",
    "long_description": "new long \n description",
    "authors": ["5d118b2a24203f5d06b55c7e"]
}
```
### Delete an article
```
DELETE /articles/:id
```
