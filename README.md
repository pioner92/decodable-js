# Decodable js

### Library decodes json data similar to Swift

#### Checks types in json data, if there is no match, raises an error at will, or ignores this field, Also, selects only the desired data

#### It is possible to enable converting strings to number and number to string

### Install

```bash
yarn add decodable-js
# or
npm install decodable-js
```

### Usage

```ts
import {Decodable, T} from 'decodable-js';


// const EXAMPLE = {
//     age: T.number,
//     address: T.string,
//     visible: T.boolean,
//     numbers: [T.string],
//     object:{name:T.string,age:T.number},
//     n:T.null
// }


// if response is Array

const JsonStructArray = [
    {
        age: T.number,
        address: T.string,
        visible: T.boolean,
        numbers: [T.string],
    }
]

const jsonDataArray = [
    {
        age: 12,
        address: 'Address',
        visible: true,
        number: '11111111',
        enable: true,
        someText: 'TEXT',
        ob: ['2', 2, 2],
    }
]

// ------------------------

// if response is object

const JsonStruct = {
    age: T.number,
    address: T.string,
    visible: T.boolean,
    numbers: [T.string],
}

const jsonData = {
    age: 12,
    address: 'Address',
    visible: true,
    number: '11111111',
    enable: true,
    someText: 'TEXT',
    ob: ['2', 2, 2],
}

const res = Decodable(jsonData, JsonStruct, true)
// const res = {
//    age: 12,
//    address: 'Address',
//    visible: true,
//    ob: ['2', '2', '2'],
// }

const res2 = Decodable(jsonData, JsonStruct, false)
// const res = {
//    age: 12,
//    address: 'Address',
//    visible: true,
//    ob: ['2'],
// }
```

### Types

```ts
T.string
T.string_$ // optional

T.number
T.number_$ // optional

T.boolean
T.boolean_$ // optional

T.undefined

T.null 
T.null_$ // optional

T.object
T.object_$ // optional
```

### Api

```ts
const res = Decodable(data, struct, name, enableConvert, enableThrowError)
```

#### data: {} | Array<any> - JsonData

#### sturct: {} | Array<any> - Structure for conversion

### name :string - method name

#### enableConvert: boolean - Enables converting a string to a number or a number to a string (default = false)

#### enableThrowError:boolean - Enable error throw (default = true)

### Author

#### ● Alex Shumihin
