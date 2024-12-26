import { useEffect, useState } from 'react'

function useGetQuote(url: string) {
    const [data, setData] = useState<Quote | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    type Quote = {
        author?: string;
        quote?: string;
        category?: string;
    };
    
    type ApiResponse = {
        results?: Quote[]
    }

    useEffect(() => {
        if (!url) return;
        
        const getQuote = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // const response = await fetch(url, {
                //     headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY}
                // })
                // if (!response.ok) {
                //     throw new Error(`Error: ${response.statusText}`);
                // }

                // const result = await response.json();
                const result: Quote = 
                    {
                    author: "Gary Ross",
                    category: "imagination",
                    quote: "Ultimately, so much Dr. Seuss is about empowerment. He invites us to disappear into our imagination."
                    }
                ;
                setData(result);
            } catch (err: any) {
                setError(err.message);
                console.log(err.message)
            } finally {
                setIsLoading(false);
            }
        }

        getQuote();
    }, [])

    return { data, isLoading, error };
}

export default useGetQuote
