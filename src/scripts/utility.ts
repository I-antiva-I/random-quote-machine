

export function leftJustify(str: string, length: number, paddingChar: string = ' '): string
{
    if (str.length >= length) 
    {
      return str;
    }

    return str + paddingChar.repeat(length - str.length);
}

export function rightJustify(str: string, length: number, paddingChar: string = ' '): string
{
    if (str.length >= length) 
    {
      return str;
    }

    return paddingChar.repeat(length - str.length) + str;
}

export function stringAsClassName(str: string)
{
  return str.toLowerCase().replaceAll(" ","-").replaceAll("_","-");
}


export function getRandomInteger(max: number, min: number = 1): number 
{
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}



export function getEnumKeyByValue<T extends Record<string, any>>(enumObj: T, value: any): string | undefined
{
  // GETS values
 // const  keys = Object.keys(enumObj) as string[]     ;
 // keys.find( key => enumObj[key] === value)


 //const val = (Object.keys(enumObj) as string[]).find( key => enumObj[key] === value);

 // console.log(val);
  return (Object.keys(enumObj) as string[]).find( key => enumObj[key] === value);

 // return (Object.keys(enumType) as (keyof T)[]).find(key => enumType[key] === value);
}


export function getEnumName<T extends Record<string, any>>(enumObj: T, value: any): string 
{
  return enumObj[value];
}