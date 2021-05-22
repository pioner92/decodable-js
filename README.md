# Decodable js

### Usage

```ts
import Decodable, {T} from 'decodable-js';

const SomeData = {
    name: T.string,
    address: T.string,
    age: T.number,
    visible: T.boolean,
    enable:T.boolean,
    numbers: [T.string],
}

const jsonData = {
    age: 12,
    address: 'Address',
    visible: true,
    ob: ['2', 2, 2],
}


//Decodable(data,struct,isConvert)
// data - JsonData
// sturct - Structure for conversion
// isConvert - Enables converting a string to a number or a number to a string (default = false)

const res = Decodable(jsonData,User,true)
// const res = {
//    age: 12,
//    address: 'Address',
//    visible: true,
//    ob: ['2', '2', '2'],
// }

const res2 = Decodable(jsonData,User, false)
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
T.number
T.boolean
T.undefined
T.null
T.object
```

### Api

```ts
const res = Decodable(data,struct,enableConvert,enableThrowError)
```
#### data: {} - JsonData
#### sturct: {} - Structure for conversion
#### enableConvert: boolean - Enables converting a string to a number or a number to a string (default = false)
#### enableThrowError:boolean - Enable error throw (default = false)

