import { useEffect, useState } from "react";

function useGetQuote(url: string) {
    const [data, setData] = useState<Quote | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    type Quote = {
        author?: string;
        quote?: string;
        category?: string;
    };

    // type ApiResponse = {
    //     results?: Quote[]
    // }

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
                const result: Quote = {
                    author: "Steve Jobs",
                    category: "motivational",
                    quote: "Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you and you can change it. Once you learn that, you'll never be the same again.",
                };
                setData(result);
            } catch (err: any) {
                setError(err.message);
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getQuote();
    }, []);

    return { data, isLoading, error };
}

export default useGetQuote;
