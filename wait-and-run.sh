#!/bin/bash
echo "🔁 Waiting for web to be ready..."
npx wait-on http://web:3000
echo "✅ Web is up! Running Cypress..."
npx cypress run --reporter junit --reporter-options "mochaFile=results/test-results.xml,toConsole=true"
