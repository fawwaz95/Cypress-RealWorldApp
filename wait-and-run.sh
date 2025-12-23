#!/bin/bash
echo "🔁 Waiting for web and API to be ready..."
npx wait-on http://web:3000 http://web:3001

echo "✅ Services are up! Running Cypress..."
npx cypress run --reporter junit --reporter-options "mochaFile=results/test-results.xml,toConsole=true"
