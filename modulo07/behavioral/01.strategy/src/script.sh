--- postgres

docker pull postgres

docker run \
  --name "postgres" \
  -e POSTGRES_USER="admin" \
  -e POSTGRES_PASSWORD="postgres_pass" \
  -e POSTGRES_DB="heroes" \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it postgres psql -U admin -d heroes
CREATE TABLE warriors (id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

--- mongodb

docker run \
  --name "mongodb" \
  -e MONGO_INITDB_ROOT_USERNAME="admin" \
  -e MONGO_INITDB_ROOT_PASSWORD="mongodb_pass" \
  -p 27017:27017 \
  -d \
  mongo

docker logs mongodb
docker exec -it mongodb mongo