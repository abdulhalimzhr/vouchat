.SILENT:

DOCKER   = docker
TERMINAL = $(DOCKER) exec -it
COMPOSE  = $(DOCKER)-compose
NPM_RUN  = npm run

.PHONY: up
up:
	$(COMPOSE) up -d

.PHONY: build
build:
	$(COMPOSE) up -d --build

.PHONY: stop
stop:
	$(COMPOSE) stop

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: logb
logb:
	$(DOCKER) logs -f backend

.PHONY: logf
logf:
	$(DOCKER) logs -f frontend

.PHONY: shellb
shellb:
	$(TERMINAL) backend /bin/bash

.PHONY: shelf
shellf:
	$(TERMINAL) frontend /bin/bash

.PHONY: startf
startf:
	cd frontend && $(NPM_RUN) serve

.PHONY: startb
startb:
	cd backend && $(NPM_RUN) dev
