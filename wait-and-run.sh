#!/bin/bash

echo "🔁 Waiting for backend health..."
npx wait-on http://web:3001/health

echo "🔁 Waiting for frontend..."
npx wait-on http://web:3000/signin

echo "🌐 Base URL: $CYPRESS_baseUrl"
echo "🔗 API URL: $CYPRESS_apiUrl"

echo "🚀 Starting RealWorldApp Tests..."

npx cypress run \
  --browser chrome \
  --spec "development/integration/testCases/realWorldApp/realWorldAppTest.cy.js"