# Decodable js

### Usage

```ts
import {Decodable,T} from 'decodable-js';

const SomeData = {
    name: T.string,
    address: T.string,
    age: T.number,
    visible: T.boolean,
    numbers: [T.string],
}

const jsonData = {
    name: 'Alex',
    age: 12,
    city: 'City',
    address: 'Address',
    visible: true,
    ob: ['2', '2', '4'],
}


//Decodable(data,struct,isConvert)
// data - JsonData
// sturct - Structure for conversion
// isConvert - Enables converting a string to a number or a number to a string (default = false)

const res = Decodable(jsonData,User,true)
// const res = {
//   name:'Name',
//   age:20,
//   visible:true,
// }



```

### Types

```ts
T.string
T.number
T.boolean
T.undefined
T.null
T.object
```

### Api

```ts
const res = Decodable(data,struct,isConvert)
```
#### data - JsonData
#### sturct - Structure for conversion
#### isConvert - Enables converting a string to a number or a number to a string (default = false)

