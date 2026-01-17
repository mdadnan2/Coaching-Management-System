const express = require('express');
const { specs, swaggerUi } = require('../src/config/swagger');

// Simple test to verify Swagger configuration
console.log('🔍 Testing Swagger Configuration...\n');

// Check if specs are generated correctly
if (specs && specs.openapi) {
  console.log('✅ Swagger specs generated successfully');
  console.log(`📋 API Title: ${specs.info.title}`);
  console.log(`📝 API Version: ${specs.info.version}`);
  console.log(`🏷️  OpenAPI Version: ${specs.openapi}`);
  
  // Check schemas
  if (specs.components && specs.components.schemas) {
    const schemas = Object.keys(specs.components.schemas);
    console.log(`📊 Schemas defined: ${schemas.join(', ')}`);
  }
  
  // Check servers
  if (specs.servers && specs.servers.length > 0) {
    console.log('🌐 Servers configured:');
    specs.servers.forEach(server => {
      console.log(`   - ${server.description}: ${server.url}`);
    });
  }
  
  console.log('\n🎉 Swagger documentation is ready!');
  console.log('📍 Access documentation at: /api-docs');
  
} else {
  console.log('❌ Error: Swagger specs not generated properly');
  console.log('Please check your swagger.js configuration');
}

console.log('\n🚀 To start the server with Swagger documentation:');
console.log('   npm run dev');
console.log('   Then visit: http://localhost:5010/api-docs');