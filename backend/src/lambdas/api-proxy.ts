interface CoffeeApiResponse {
    file: string;
}
export interface ApiProxyResponse {
    url: string;
}

export async function apiProxyHandler(): Promise<ApiProxyResponse> {
    try {
        const url = 'https://coffee.alexflipnote.dev/random.json';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error fetching coffee image');

        const { file } = (await response.json()) as CoffeeApiResponse;

        return {
            url: file,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
