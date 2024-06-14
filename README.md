Test your server:
You can test the filtering by making GET requests to your endpoint with query parameters. For example:

To filter by make:
bash
Copy code
http://localhost:3000/data?make=GMC
To filter by duration:
bash
Copy code
http://localhost:3000/data?duration=last+month
To filter by both make and duration:
bash
Copy code
http://localhost:3000/data?make=GMC&duration=last+month