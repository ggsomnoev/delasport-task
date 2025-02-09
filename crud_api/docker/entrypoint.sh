#!/bin/sh
echo "Building..."
npm run build

echo "Running migrations..."
npm run migrate

echo "Running seeds..."
npm run seed

echo "Starting the API service..."
npm start