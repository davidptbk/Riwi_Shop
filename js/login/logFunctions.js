import {get} from "../utilities/API/functions.js"
import {URL_Users } from "../utilities/API/URLs.js"

export function captureData(inputs){
    const data = {}
    inputs.forEach( element=> {
    const idInput = element.getAttribute("id")
    if ( idInput == "email" || idInput == "password" || idInput == "name"){
        if (element.value == "" || element.value == null){
            return console.error(`Campo ${idInput} se encuentra vacio`)        
        }
    }
    data[`${idInput}`] = `${element.value}`
});
    console.log(data);
    return data
}

export function validatorPassword(password, passwordDB){
    console.log(password, " y ", passwordDB);
    return password == passwordDB;
}

export async function emailToken(email){
    console.log(email);
    const validator = await get(`${URL_Users}?email=${email}`);
    console.log(validator);
    // console.log((await validator.length )!= 0);

    return (await validator?.length) != 0;
}

export function minimumCharacters(password){
    return password.length < 6;
}

export function passwordToken(password, passwordConfirm) {
    return password != passwordConfirm;
}
