import { useEffect, useState } from "react";

function useGetQuote(url: string) {
    const [data, setData] = useState<Quote | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    type Quote = {
        author?: string;
        quote?: string;
        category?: string;
    };

    type ApiResponse = {
        quote?: Quote[];
    };

    useEffect(() => {
        if (!url) return;

        const getQuote = async () => {
            setIsLoading(true);
            setError("");

            try {
                // const response = await fetch(url, {
                //     headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY}
                // })
                // if (!response.ok) {
                //     throw new Error(`Error: ${response.statusText}`);
                // }

                // const result = await response.json();

                const result: ApiResponse = {
                    quote: [
                        {
                            author: "Steve Jobs",
                            category: "motivational",
                            quote: "Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you and you can change it. Once you learn that, you'll never be the same again.",
                        },
                    ],
                };
                setData(result.quote ? result.quote[0] : undefined);
            } catch (err: unknown) {
                err instanceof Error
                    ? setError(err.message)
                    : setError("An unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        getQuote();
    }, []);

    return { data, isLoading, error };
}

export default useGetQuote;
