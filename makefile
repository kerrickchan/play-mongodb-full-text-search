all:
	start-mongo
	start

start:
	npm install
	npm run dev

start-mongo:
	docker run -d -p 27017:27017 -v mongo_data:/data/db --name mongodb mongo:latest
