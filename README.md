![img.png](doc/title.png)

*online multiplayer implementation*

### About

This project is an unofficial realtime multiplayer implementation of the card game **The Thing From The Future**: http://situationlab.org/project/the-thing-from-the-future/

Up to 6 players can play together to brainstorm ideas.

### Deploy with docker compose

1. adjust server URL `frontendRoot ` in the configuration file `frontend/src/environments/environment.prod.ts`
2. build the frontend and backend containers: `docker-compose build`
3. start all the containers: `docker-compose up`
4. (Optional) Configure reverse proxy for SSL

### Deploy with Azure App Services

1. adjust server URL `frontendRoot ` in the configuration file `frontend/src/environments/environment.prod.ts` to match your azure Web App URL. The URL is `https://YOUR_AZ_APP_NAME.azurewebsites.net` (make sure `YOUR_AZ_APP_NAME` is available in Azure first.)
2. Build the frontend and backend containers and publish them to docker hub.
   - For frontend inside the `frontend` directory: `docker build -t YOUR_DOCKER_HUB_USERNAME/tftf-frontend .` and push with `docker push YOUR_DOCKER_HUB_USERNAME/tftf-frontend`  
   - For backend inside the `backend` directory: `docker build -t YOUR_DOCKER_HUB_USERNAME/tftf-backend .` and push with `docker push YOUR_DOCKER_HUB_USERNAME/tftf-backend`
3. Adjust the `docker-compose-az.yml` to use your custom containers. 
4. Create a Web App (App Services) from the azure portal. Choose docker container as publish type.

![img.png](doc/app_type.png)

5. Upload your `docker-compose-az.yml` file and use it to create the web app.  

![img.png](doc/az-compose.png)

### Local Development

**Requirements**
- Node 16 LTS
- yarn package manager 

The backend uses mongodb for storage. You will need an instance for development. You can use the following ```docker-compose.yml``` template to start a dev database: 

```yaml
version: "3.9"  # optional since v1.27.0
services:
  mongodb:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: secret
    ports:
      - "27017:27017"
```

Adjust the backend config to use your local dev instance inside ```backend/src/app.moudule.ts```:
```javascript
        MongooseModule.forRoot('mongodb://root:secret@localhost', {dbName: "nest"}),
``` 

To start the backend, inside the `backend` directory, install the project dependencies:

```yarn install```

Then start the backend with: 

```yarn run start:dev```

To start the frontend, inside the `frontend` directory, install the project dependencies:

```yarn install```

Then start the frontend with:

```yarn run start```

Then access the game on http://localhost:4200
