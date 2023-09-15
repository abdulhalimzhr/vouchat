.SILENT:

DOCKER         = docker
TERMINAL       = $(DOCKER) exec 
COMPOSE        = $(DOCKER)-compose
NPM            = npm
NPM_RUN        = $(NPM) run
GOTO           = cd
GOTO_FRONTEND  = $(GOTO) frontend
GOTO_BACKEND   = $(GOTO) backend

# args := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
export env

.PHONY: up
up: env
	$(COMPOSE) up -d

.PHONY: build
build: env
	$(COMPOSE) up -d --build
	$(TERMINAL) frontend $(NPM) install
	$(TERMINAL) frontend $(NPM) run build
	$(TERMINAL) backend $(NPM) install

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
	$(TERMINAL) -it backend sh

.PHONY: shelf
shellf:
	$(TERMINAL) -it frontend sh

.PHONY: startf
startf:
	$(GOTO_FRONTEND) && $(NPM_RUN) serve

.PHONY: startb
startb:
	$(GOTO_BACKEND) && $(NPM_RUN) dev

.PHONY: env
env:
	@echo "Creating $(env) env"
ifeq ("$(env)","local")
	$(GOTO_FRONTEND) && cp .env.localhost .env
else ifeq ("$(env)","public")
	$(GOTO_FRONTEND) && cp .env.public .env
else
	$(GOTO_FRONTEND) && cp .env.example .env
endif
