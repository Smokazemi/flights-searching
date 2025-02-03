export const baseUrl = 'https://sky-scrapper.p.rapidapi.com/api'
export const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY || '';

export const getLocale = async () => {
    
    const url = `${baseUrl}/v1/getLocale`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}