
# Vehicle API

This repository contains the implementation of an API endpoint to fetch and transform vehicle data from a database.

## Table of Contents

- [Vehicle API](#vehicle-api)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoint](#api-endpoint)
    - [GET /api/vehicles/](#get-apivehicles)
      - [Response](#response)
  - [Database Schema](#database-schema)
  - [Transformation Logic](#transformation-logic)
  - [Error Handling](#error-handling)
  - [Installation Requirements](#installation-requirements)
- [Installation for Testing](#installation-for-testing)

## Overview

The API provides an endpoint to retrieve vehicle data from a database, transform the data, and return the transformed results. The transformation involves modifying the `Model` and `Year` fields based on specific logic.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the database connection in `db/db.js`:
    ```javascript
    const mysql = require('mysql2');
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'your-username',
        password: 'your-password',
        database: 'your-database'
    });
    module.exports = pool;
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. Access the API endpoint at:
    ```
    http://localhost:4000/api/vehicles/
    ```

## API Endpoint

### GET /api/vehicles/

This endpoint fetches vehicle data from the database, transforms it, and returns the transformed results.

#### Response

- **200 OK**: Returns the transformed vehicle data.
- **401 Unauthorized**: No vehicles found in the database.
- **500 Internal Server Error**: An error occurred while fetching data from the database.

## Database Schema

The `vehicles` table should have the following columns:

- `Test_Case_Number` (INT)
- `Test_Description` (VARCHAR)
- `Make` (VARCHAR)
- `Model` (VARCHAR)
- `Year` (INT)
- `Expected_Output` (INT)

## Transformation Logic

The transformation logic modifies the `Model` and `Year` fields as follows:

1. The `Model` value is converted to lowercase.
2. Each character in the `Model` value is converted to its corresponding position in the alphabet (a=1, b=2, ..., z=26).
3. The sum of these positions is calculated.
4. The `Year` value is updated by adding the sum of the positions multiplied by 100.
5. The `Model` and `Year` values are combined into a single `Model` field in the transformed result.

Example:
- Original `Model`: "Civic"
- Sum of positions: 3 (c) + 9 (i) + 22 (v) + 9 (i) + 3 (c) = 46
- Original `Year`: 2020
- Updated `Year`: 2020 + (46 * 100) = 6620
- Transformed `Model`: "Civic 2020"

## Error Handling

- If an error occurs while fetching data from the database, a 500 status code is returned with an error message.
- If no vehicles are found in the database, a 401 status code is returned.

## Installation Requirements 
-npm install express
-npm install dotenv
-npm install react-router-dom 
-npm install cors  
-npm install mysql2 
-npm init 


# Installation for Testing
-npm install jest

