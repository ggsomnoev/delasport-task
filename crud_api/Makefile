PROJECT_NAME = crud_api
BUILD_DIR = dist
DB_CONFIG = ./src/utils/dbCfg.js

NODE = node
NPM = npm
NPX = npx

DOCKER_COMPOSE = docker compose

.PHONY: install
install:
	$(NPM) install

.PHONY: build
build:
	$(NPM) run build

.PHONY: start
start: build
	$(NODE) $(BUILD_DIR)/src/server.js

.PHONY: lint
lint:
	$(NPM) run lint

.PHONY: format
format:
	$(NPM) run format

.PHONY: db-migrate
db-migrate: build
	$(NPX) sequelize-cli db:migrate --config=$(DB_CONFIG)

.PHONY: db-seed
db-seed: build
	$(NPX) sequelize-cli db:seed:all --config=$(DB_CONFIG)

.PHONY: db-reset
db-reset: build
	$(NPX) sequelize-cli db:drop --config=$(DB_CONFIG)
	$(MAKE) db-migrate
	$(MAKE) db-seed

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)

.PHONY: docker-up
docker-up:
	$(DOCKER_COMPOSE) up -d

.PHONY: docker-down
docker-down:
	$(DOCKER_COMPOSE) down

.PHONY: docker-restart
docker-restart:
	$(MAKE) docker-down
	$(MAKE) docker-up
