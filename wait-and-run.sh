#!/bin/bash
echo "🔁 Waiting for backend health..."
npx wait-on http://web:3001/health
echo "✅ Backend is up! Running Cypress..."
npx cypress run --reporter junit --reporter-options "mochaFile=results/test-results.xml,toConsole=true"
