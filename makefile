.PHONY: up db-init restart clean

# Start the containers and build if necessary
up:
	docker-compose up --build -d

# Initialize the database by running the setup.sql script
db-init:
	docker exec -i postgres_db psql -U postgres -d database < ./backend/src/setup.sql

# Restart the whole setup (useful for fresh runs)
restart: clean up db-init

# Remove all containers, volumes, and networks
clean:
	docker-compose down -v
