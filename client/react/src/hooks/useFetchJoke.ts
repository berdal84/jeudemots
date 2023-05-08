import { useCallback, useEffect, useMemo, useState } from "react"
import { Joke, Page, Response } from 'jeudemots-shared';
import { config } from "../App.config";

const NULL_JOKE: Joke = {
    id: -1,
    category: '...',
    text: '...',
    author: '...',
    date: '...'
  };
  
const NULL_PAGE: Page = {
    id: 0,
    count: 1,
    jokes: [NULL_JOKE],
    size: 1,
};

export const useFetchJoke = (initialID: number) => {
    const [page, setPage] = useState<Page>(NULL_PAGE);
    const [error, setError] = useState<string>();
    const joke = useMemo( () => page.jokes[0] ?? NULL_JOKE, [page]);

    useEffect(() => {
        fetchPage(initialID);
    }, [initialID]);

    const fetchPage = async (id: number, size = 1) => {
        const params = new URLSearchParams({ id: String(id), size: String(size) });
        try {
            const httpResponse = await fetch(`${config.api.baseUrl}${config.api.path.page}?${params}`)
            const response = await httpResponse.json() as Response<Page>;
            if( response.ok ) {
                setPage(response.data)
            } else {
                setPage(NULL_PAGE);
                setError(response.error);
            }
        } catch (e) {
            setError(JSON.stringify(e))
        }
    };
    
    const next = useCallback( async () => {
        const nextID = (page.id + 1) % page.count;        
        await fetchPage(nextID);
    }, [page]);

    return [joke, next, error] as const;
}