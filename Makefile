include make/general/Makefile
STACK   := repocheck
NETWORK := proxylampy
include make/docker/Makefile

COMMANDS_SUPPORTED_COMMANDS := linter
COMMANDS_SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(COMMANDS_SUPPORTED_COMMANDS))
ifneq "$(COMMANDS_SUPPORTS_MAKE_ARGS)" ""
  COMMANDS_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(COMMANDS_ARGS):;@:)
endif

.PHONY: install
install: node_modules ## Installation
	mkdir prod -i
	@make docker deploy -i

.PHONY: linter
linter: node_modules ### Scripts Linter
ifeq ($(COMMAND_ARGS),all)
	@make linter readme -i
else ifeq ($(COMMAND_ARGS),readme)
	@npm run linter-markdown README.md
else
	@printf "${MISSING_ARGUMENTS}" linter
	@printf "${NEED}" "all" "## Launch all linter"
	@printf "${NEED}" "readme" "linter README.md"
endif