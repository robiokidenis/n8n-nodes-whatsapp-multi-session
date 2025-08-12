# n8n WhatsApp Multi-Session Node - Makefile
# Author: robiokidenis
# Version: 1.3.1

# Colors for output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

# Package info
PACKAGE_NAME = n8n-nodes-whatsapp-multi-session
PACKAGE_VERSION = $(shell node -p "require('./package.json').version")

# Default target
.DEFAULT_GOAL := help

# Help target
.PHONY: help
help: ## Show this help message
	@echo "$(BLUE)$(PACKAGE_NAME) v$(PACKAGE_VERSION)$(NC)"
	@echo ""
	@echo "$(YELLOW)Available targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Clean build artifacts
.PHONY: clean
clean: ## Clean build artifacts
	@echo "$(YELLOW)🧹 Cleaning build artifacts...$(NC)"
	@rm -rf dist/
	@rm -f *.tgz
	@echo "$(GREEN)✅ Clean completed$(NC)"

# Install dependencies
.PHONY: install
install: ## Install dependencies
	@echo "$(YELLOW)📦 Installing dependencies...$(NC)"
	@npm ci
	@echo "$(GREEN)✅ Dependencies installed$(NC)"

# Lint code
.PHONY: lint
lint: ## Run ESLint
	@echo "$(YELLOW)🔍 Running ESLint...$(NC)"
	@npm run lint
	@echo "$(GREEN)✅ Lint passed$(NC)"

# Fix lint issues
.PHONY: lint-fix
lintfix: ## Fix ESLint issues automatically
	@echo "$(YELLOW)🔧 Fixing ESLint issues...$(NC)"
	@npm run lintfix
	@echo "$(GREEN)✅ Lint fixes applied$(NC)"

# Format code
.PHONY: format
format: ## Format code with Prettier
	@echo "$(YELLOW)✨ Formatting code...$(NC)"
	@npm run format
	@echo "$(GREEN)✅ Code formatted$(NC)"

# Build TypeScript
.PHONY: build
build: clean ## Build TypeScript and icons
	@echo "$(YELLOW)🔨 Building project...$(NC)"
	@npm run build
	@echo "$(GREEN)✅ Build completed$(NC)"

# Development mode
.PHONY: dev
dev: ## Start development mode with watch
	@echo "$(YELLOW)👷 Starting development mode...$(NC)"
	@npm run dev

# Validate package
.PHONY: validate
validate: lint build ## Validate package (lint + build)
	@echo "$(YELLOW)🔍 Validating package...$(NC)"
	@echo "$(GREEN)✅ Package validation completed$(NC)"

# Create package preview
.PHONY: pack-dry
pack-dry: build ## Preview what will be packed
	@echo "$(YELLOW)📦 Previewing package contents...$(NC)"
	@npm pack --dry-run

# Pack for testing
.PHONY: pack
pack: validate ## Create tarball for testing
	@echo "$(YELLOW)📦 Creating package tarball...$(NC)"
	@npm pack
	@echo "$(GREEN)✅ Package created: $(PACKAGE_NAME)-$(PACKAGE_VERSION).tgz$(NC)"

# Test local package
.PHONY: test-local
test-local: pack ## Test the packed package locally
	@echo "$(YELLOW)🧪 Testing local package...$(NC)"
	@tar -tzf $(PACKAGE_NAME)-$(PACKAGE_VERSION).tgz | head -20
	@echo "$(GREEN)✅ Local package test completed$(NC)"

# Check npm registry status
.PHONY: check-registry
check-registry: ## Check if package exists on npm registry
	@echo "$(YELLOW)🔍 Checking npm registry...$(NC)"
	@npm view $(PACKAGE_NAME) version 2>/dev/null || echo "$(BLUE)ℹ️  Package not found on registry (ready for first publish)$(NC)"

# Pre-publish checks
.PHONY: pre-publish
pre-publish: validate pack-dry check-registry ## Run all pre-publish checks
	@echo "$(YELLOW)🔍 Running pre-publish checks...$(NC)"
	@echo "$(BLUE)Package: $(PACKAGE_NAME)@$(PACKAGE_VERSION)$(NC)"
	@npm whoami 2>/dev/null || (echo "$(RED)❌ Not logged in to npm. Run 'npm login' first$(NC)" && exit 1)
	@echo "$(GREEN)✅ Pre-publish checks passed$(NC)"

# Publish to npm (requires confirmation)
.PHONY: publish
publish: pre-publish ## Publish package to npm
	@echo "$(RED)⚠️  About to publish $(PACKAGE_NAME)@$(PACKAGE_VERSION) to npm$(NC)"
	@echo "$(YELLOW)🤔 Are you sure? [y/N]$(NC)" && read ans && [ $${ans:-N} = y ]
	@echo "$(YELLOW)🚀 Publishing to npm...$(NC)"
	@npm publish --access public
	@echo "$(GREEN)🎉 Successfully published $(PACKAGE_NAME)@$(PACKAGE_VERSION)$(NC)"
	@echo "$(BLUE)📋 Install with: npm install $(PACKAGE_NAME)$(NC)"

# Force publish (skip confirmation - use with caution)
.PHONY: publish-force
publish-force: pre-publish ## Force publish without confirmation (use with caution)
	@echo "$(RED)⚠️  Force publishing $(PACKAGE_NAME)@$(PACKAGE_VERSION) to npm...$(NC)"
	@npm publish --access public
	@echo "$(GREEN)🎉 Successfully published $(PACKAGE_NAME)@$(PACKAGE_VERSION)$(NC)"

# Update patch version
.PHONY: version-patch
version-patch: ## Increment patch version (x.x.X)
	@echo "$(YELLOW)📈 Incrementing patch version...$(NC)"
	@npm version patch --no-git-tag-version
	@echo "$(GREEN)✅ Version updated to $(shell node -p "require('./package.json').version")$(NC)"

# Update minor version
.PHONY: version-minor
version-minor: ## Increment minor version (x.X.0)
	@echo "$(YELLOW)📈 Incrementing minor version...$(NC)"
	@npm version minor --no-git-tag-version
	@echo "$(GREEN)✅ Version updated to $(shell node -p "require('./package.json').version")$(NC)"

# Update major version
.PHONY: version-major
version-major: ## Increment major version (X.0.0)
	@echo "$(YELLOW)📈 Incrementing major version...$(NC)"
	@npm version major --no-git-tag-version
	@echo "$(GREEN)✅ Version updated to $(shell node -p "require('./package.json').version")$(NC)"

# Complete release workflow
.PHONY: release-patch
release-patch: version-patch publish ## Release new patch version
	@echo "$(GREEN)🎉 Patch release completed$(NC)"

.PHONY: release-minor
release-minor: version-minor publish ## Release new minor version
	@echo "$(GREEN)🎉 Minor release completed$(NC)"

.PHONY: release-major
release-major: version-major publish ## Release new major version
	@echo "$(GREEN)🎉 Major release completed$(NC)"

# Show package info
.PHONY: info
info: ## Show package information
	@echo "$(BLUE)📋 Package Information$(NC)"
	@echo "Name: $(PACKAGE_NAME)"
	@echo "Version: $(PACKAGE_VERSION)"
	@echo "Description: $(shell node -p "require('./package.json').description")"
	@echo "Author: $(shell node -p "require('./package.json').author.name")"
	@echo "Repository: $(shell node -p "require('./package.json').repository.url")"
	@echo "Homepage: $(shell node -p "require('./package.json').homepage")"

# All-in-one development setup
.PHONY: setup
setup: clean install validate ## Complete development setup
	@echo "$(GREEN)🎉 Development setup completed$(NC)"
	@echo "$(BLUE)💡 Next steps:$(NC)"
	@echo "  • Run 'make dev' for development mode"
	@echo "  • Run 'make publish' to publish to npm"
	@echo "  • Run 'make help' to see all available commands"

# Show current npm login status
.PHONY: npm-status
npm-status: ## Show current npm login status
	@echo "$(YELLOW)👤 Checking npm login status...$(NC)"
	@npm whoami 2>/dev/null && echo "$(GREEN)✅ Logged in as: $(shell npm whoami)$(NC)" || echo "$(RED)❌ Not logged in. Run 'npm login' to authenticate$(NC)"

# Quick commands for common workflows
.PHONY: quick-build
quick-build: lint build pack-dry ## Quick build and validation

.PHONY: quick-publish
quick-publish: validate publish ## Quick validation and publish