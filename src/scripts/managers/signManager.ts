import { Ref } from "vue";
import { rightJustify }from "@/scripts/utility";
import type  { SignRefs } from "@/components/Sign.vue";


// URLs
const signDataURL: string =  process.env.VUE_APP_SIGN_DATA_URL as string;
const imageURLBase: string = process.env.VUE_APP_IMAGE_URL_BASE as string;


interface SignData
{
    signs: SignItem[];
}
  
interface SignItem
{
    signIndex: number;
    signImage: string;
    signQuote: string;
}

export async function setSignRefs(singRefs: SignRefs, indexToGet: number | undefined = undefined)
{
    const signData: SignData | null = await fetchSignData();
    if (signData !== null)
    {
        let signIndex = 0;

        if (indexToGet === undefined)
        {
            signIndex = Math.floor(Math.random() * signData.signs.length);
        }
        else 
        {
            signIndex = indexToGet < 0 ? signData.signs.length -1 : (indexToGet % signData.signs.length);
        }

        const signItem: SignItem = signData.signs[signIndex];

        singRefs.signIndex.value = rightJustify(signItem.signIndex.toString(), 3, '0');
        singRefs.signImage.value = imageURLBase+signItem.signImage;
        singRefs.signQuote.value = signItem.signQuote;
    }

    console.log(signData);
}

async function fetchSignData(): Promise<SignData | null>
{
    try 
    {
        const response = await fetch(signDataURL);
        if (response.ok)
        {
            const data: SignData = await response.json() as SignData;
            return data ;
        }
        else
        {
            throw new Error("[!] Bad network response "+response.status);
        }

    }
    catch (error) 
    {
        console.log("[!] Error occurred:", error);
        return null;
    }    
}



// #region | Functions
/*
export async function getRandomSingData(homeViewProps: HomeViewProps)
{
    // Get sign data from JSON file
  
    if (data !== null)
    {   
        // Select random sign from list of signs


        // Set properties

    }
}
  
export async function getSingData(index: number, homeViewProps: HomeViewProps)
{
    // Get sign data from JSON file;
    const data: null | SingData = await fetchSignData();
    if (data !== null)
    {
        // Select sign from list of signs
        index = index < 0 ? data.listOfSigns.length -1 : (index % data.listOfSigns.length);
        const signItem: SingItem = data.listOfSigns[index];

        // Set properties
        homeViewProps.index.value = rightJustify(signItem.signId.toString(), 3, '0');
        homeViewProps.imageSrc.value = imagesURL+signItem.signImage;
        homeViewProps.text.value = signItem.signText;
    }
}

async function fetchSignData(): Promise<SingData | null>
{
    try 
    {
        const response = await fetch(dataURL);
        if (response.ok)
        {
            const data: SingData = await response.json() as SingData;
            return data ;
        }
        else
        {
            throw new Error("Bad network response "+response.status);
        }

    }
    catch (error) 
    {
        console.log("[!] Error occurred:", error);
        return null;
    } 
}

// #endregion 
*/