#!/bin/bash
# CASSANDRA - Pre-deployment validation script
# Run this before pushing to git or deploying to Vercel

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   CASSANDRA - Pre-deployment Validation                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Function to print error
print_error() {
    echo -e "${RED}✗ ERROR:${NC} $1"
    ((errors++))
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠ WARNING:${NC} $1"
    ((warnings++))
}

# Check 1: .env file exists
echo "Checking configuration files..."
if [ -f ".env" ]; then
    print_success ".env file exists"
    
    # Check if GEMINI_KEY is set
    if grep -q "GEMINI_KEY=" .env && ! grep -q "GEMINI_KEY=your_" .env; then
        print_success "GEMINI_KEY is configured"
    else
        print_error "GEMINI_KEY is not configured in .env"
    fi
else
    print_error ".env file not found (copy from .env.example)"
fi

# Check 2: .gitignore includes .env
echo ""
echo "Checking git configuration..."
if grep -q "^\.env$" .gitignore; then
    print_success ".env is in .gitignore"
else
    print_error ".env should be in .gitignore"
fi

# Check 3: Required files exist
echo ""
echo "Checking project structure..."
required_files=(
    "index.html"
    "chat.html"
    "mis_documentos.html"
    "config.js"
    "vercel.json"
    "package.json"
    "api/chat.js"
    "api/documents.js"
    "api/config.js"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Found: $file"
    else
        print_error "Missing: $file"
    fi
done

# Check 4: Documentos folder exists
echo ""
echo "Checking documents..."
if [ -d "Documentos" ]; then
    pdf_count=$(find Documentos -type f -name "*.pdf" 2>/dev/null | wc -l)
    if [ "$pdf_count" -gt 0 ]; then
        print_success "Found $pdf_count PDF files in Documentos/"
    else
        print_warning "No PDF files found in Documentos/ folder"
    fi
else
    print_warning "Documentos/ folder not found"
fi

# Check 5: HTML files don't contain hardcoded secrets
echo ""
echo "Checking for exposed secrets..."
if grep -r "AIzaSy" *.html 2>/dev/null | grep -v "config.js"; then
    print_error "Hardcoded API keys found in HTML files"
else
    print_success "No hardcoded API keys in HTML files"
fi

# Check 6: vercel.json is valid JSON
echo ""
echo "Checking Vercel configuration..."
if python3 -m json.tool vercel.json > /dev/null 2>&1; then
    print_success "vercel.json is valid JSON"
else
    print_error "vercel.json is not valid JSON"
fi

# Check 7: package.json is valid JSON
if python3 -m json.tool package.json > /dev/null 2>&1; then
    print_success "package.json is valid JSON"
else
    print_error "package.json is not valid JSON"
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "║${GREEN}          ✓ All checks passed! Ready to deploy${NC}           ║"
elif [ $errors -eq 0 ]; then
    echo -e "║${YELLOW}     ⚠ All critical checks passed, but review warnings${NC}    ║"
else
    echo -e "║${RED}      ✗ Fix errors before deployment${NC}                     ║"
fi
echo "╚════════════════════════════════════════════════════════════╝"

echo ""
echo "Summary:"
echo -e "  Errors:   ${RED}$errors${NC}"
echo -e "  Warnings: ${YELLOW}$warnings${NC}"
echo ""

if [ $errors -gt 0 ]; then
    echo "Next steps:"
    echo "1. Fix the errors listed above"
    echo "2. Run this script again to verify"
    echo "3. Then run: git add . && git commit && git push"
    exit 1
else
    echo "Ready to deploy! Run:"
    echo "  git add ."
    echo "  git commit -m 'CASSANDRA ready for Vercel'"
    echo "  git push"
    exit 0
fi
