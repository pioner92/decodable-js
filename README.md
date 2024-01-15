# decodable-js

## Overview
`decodable-js` is a JavaScript library inspired by Swift's approach to JSON decoding. It verifies the types within JSON data, and based on configuration, can either raise an error for type mismatches or ignore the misaligned fields. It also allows selective data extraction and offers the option to convert between strings and numbers and vice versa.

## Installation

To integrate `decodable-js` into your project, run one of the following commands:

```bash
# If you use yarn:
yarn add decodable-js

# Or if you prefer npm:
npm install decodable-js
```

## Usage

Here's how you can use `decodable-js` in your project:

```typescript
import { decodable, T } from 'decodable-js';

// Define your JSON structure
const JsonStruct = {
    age: T.number,
    address: T.string,
    visible: T.boolean,
    numbers: [T.string],
    // Add more fields as required
}

// Your JSON data
const jsonData = {
    age: 12,
    address: '123 Cherry Lane',
    visible: true,
    numbers: ['one', 'two', 'three'],
    rest: ['Will bi skipped']
    // Additional data...
}

// Decode the data with type enforcement
const result = decodable({data: jsonData, struct: JsonStruct});

// Output the result
console.log(result);
// {
//    age: 12,
//    address: '123 Cherry Lane',
//    visible: true,
//    numbers: ['one', 'two', 'three'],
// }
```
```typescript

const JsonStruct = {
    numbers: [T.string],
}


const jsonData = {
    numbers: [1, '2', '3'], //  1 will be converted to string
}

const result = decodable({
    data: jsonData, 
    struct: JsonStruct,
    enableConvert: true // enable convert
});

// Output the result
console.log(result);
// {
//    age: 12,
//    address: '123 Cherry Lane',
//    visible: true,
//    numbers: ['1', '2', '3'], // converted to string
// }
```

## API Reference

The main function `decodable()` is used to decode JSON data:

```typescript
const result = decodable({
    data: { index:1 },
    struct: { index:T.number },
    enableConvert: false,
    silentMode: false
});
```

- `data: {} | Array<any>` - The JSON data to decode.
- `struct: {} | Array<any>` - The structure that `data` should be decoded into.
- `enableConvert: boolean` - If true, enables conversion between strings and numbers (defaults to false).
- `silentMode: boolean` - If false, throws an error when data does not match the structure (defaults to false).

## Author

- **Alex Shumihin** - Initial work and maintenance.

For any feedback or issues, please open a GitHub issue or submit a pull request.
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
