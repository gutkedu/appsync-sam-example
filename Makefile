# Define variables
BACKEND_DIR := backend
SAM_TEMPLATE := template.yaml

# Targets
.PHONY: all pre-push build style

all: build

pre-push:
	@echo "Running npm pre-push script..."
	cd $(BACKEND_DIR) && npm run pre-push && cd ..

build: pre-push
	@echo "Building backend..."
	cd $(BACKEND_DIR) && npm run build-all && cd ..
	@echo "Building SAM application..."
	sam build -t $(SAM_TEMPLATE)
	@$(MAKE) style  # Run the style target after sam build

style:
	@echo "Running npm style script..."
	cd $(BACKEND_DIR) && npm run style && cd ..

.PHONY: all pre-push build style