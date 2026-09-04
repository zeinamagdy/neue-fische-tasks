//To run docker container
//to solve the problem with env file 
 docker run --env-file .env <container-name-or-id>

 //to run compose file after the editing 

 docker compose -f docker-compose.yaml up --build -d

Deployed to render https://cyberchat-78uv.onrender.com
