/**
 * Password Strength checker and generator
 * generates passowrd of type (alphabets, alph-numeric and alph-numeric-symbols) only
 * @version 1.0.0
 * @author Nwosu Darlington - fritzdultimate
 * @copyright Dec 2020
 * @file func.js
 */

function getSymbolCodePoints(){
    return [33, 35, 36, 37, 38, 40, 41, 45, 95];
}

 /**
  * 
  * @param { Number } code_unit the code point
  * @returns { String } the character from code_point
  */

 function getChar(code_unit) {
     return String.fromCodePoint(code_unit);
 }

 /**
  * 
  * @param { Boolean } upper tells function wether to return uppercase code points or not @default false
  * @returns { Array } array of alphabets code points, case depending on upper
  */

 function generateAlphabetCodePoints(upper = false) {
     let min = 97, max = 122;
     min = upper ? 65 : min;
     max = upper ? 90 : max;

     let points = [];
     
     for(;min <= max; min++) {
         points.push(min);
     }

     return points;
 }

 /**
  * 
  * @param { Number } min smallest range 
  * @param { Number } max highest range
  * @returns { Array } range from smallest to highest
  */

 function generateNumbers(min, max) {
     let num = [];
     for(; min <= max; min++) {
         num.push(min)
     }
     return num;
 }

 /**
  * 
  * @param { Number } length length of password
  * @param { Boolean } num password should contain number @default true
  * @param { Boolean } sym password should contain symbols @default false
  * @returns { String } generated password
  */

function generatePassword(length, num = true, sym = false) {
    let per = num && sym ? 50 : num || sym ? 75 : 100;
    let str_len = Math.floor((length/100) * per)
    let o_len = length - str_len;
    let func = [generateNumbers, getSymbolCodePoints, generateAlphabetCodePoints];
    if(!sym) func.splice(func.length - 2, 1);
    if(!num) func.splice(0, 1);
    let password = '';
    let bool = true;
    while(password.length < length) {
        let r = random(0, func.length, false);
        if(r == 0 || (r == 1 && sym)) o_len -= 1; 
        if(r == 1)  str_len -= 1;
        if(o_len <= 0 && num && r == 0 && str_len > 0) r += 1;
        if(str_len <= 0 && r == 1 && o_len > 0) r -= 1;
        let array = (num && r === 0) ? func[r](48, 57) : func[r](bool);

        password += getChar(array[random(0, array.length, false)]);
        bool = false;
    }
    return password;
}

 /**
  * 
  * @param { Number } from minimum number to randomize
  * @param { Number } to maximum number to randomize
  * @param { Boolean } include_to weather to include the maximum number @default true
  * @returns { Number } the randomized number
  */
function random (from, to, include_to = true) {
    if(from > to) throw new Error('invalid range: "from" cannot be greater than "to"')
    let i = include_to ? 1 : 0;
    from = include_to ? from - 1 : from;
    return Math.floor(Math.random() * (to - from)  + from) + i
}
 let arr = [];


function checkPasswordStrength(pass) {
    let strength = 0;
    if(pass.match(/[A-Z]+/)) {
        strength += 2
    }
    if(pass.match(/[a-z]+/)) {
        strength += 1;
    }
    if(pass.match(/[0-9]+/)) {
        strength += 2;
    }
    if(pass.match(/[@$%#!_-]+/)) {
        strength += 2
    }
    if(pass.length > 10) {
        strength += 3;
    }

    switch(strength) {
        case 1:
        case 2:
            return 20;
        case 3:
            return 35;
        case 4:
            return 50;
        case 5:
            return 55;
        case 6:
            return 60;
        case 7:
            return 68;
        case 8:
            return 85;
        case 9:
            return 92;
        case 10:
            return 100;
    }
}
let pass = generatePassword(12, false, true);
console.log(checkPasswordStrength(pass), pass)