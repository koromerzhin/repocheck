include make/general/Makefile
STACK   := repocheck
NETWORK := proxynetwork
include make/docker/Makefile

.PHONY: install
install: node_modules ## Installation
	mkdir prod -i
	@make docker deploy -i

.PHONY: linter
linter: node_modules ## Scripts Linter
ifeq ($(COMMAND_ARGS),all)
	@make linter readme -i
else ifeq ($(COMMAND_ARGS),readme)
	@npm run linter-markdown README.md
else
	@echo "ARGUMENT missing"
	@echo "---"
	@echo "make linter ARGUMENT"
	@echo "---"
	@echo "all: ## Launch all linter"
	@echo "readme: linter README.md"
endif