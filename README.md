# Decodable js

### Usage

```ts
import {Decodable,T} from './index';

const User = {
    name:T.string,
    age:T.number,
    visible:T.boolean
}

const jsonData = {
    name:'Name',
    age:20,
    visible:true,
    text:'...Text',
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
