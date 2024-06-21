Clone the repository

```
git clone https://github.com/akshay619-dev/yaksha-assignment.git
```

RUN Frontend
```       
cd client 
npm install
```
START the Frontend 

```
npm run dev
```

RUN Backend

```
cd server
npm install
```
START the Backend API 

```
npm start
```


BACKEND Endpoints 
You can test the filtering by making GET requests to your endpoint with query parameters. For example:

To filter by make:

http://localhost:3000/api/inventory?make=GMC

To filter by duration:

http://localhost:3000/api/inventory?duration=last+month

To filter by both make and duration:

http://localhost:3000/api/inventory?make=GMC&duration=last+month
