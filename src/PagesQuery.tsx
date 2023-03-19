import {useQueries, useQuery} from '@tanstack/react-query';
import React, {useState} from "react";

function PagesQuery() {
    const [page, setPage] = useState(0);

    const fetchProjects = (page = 0) =>
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
            .then((res) => res.json());

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ['projects', page],
        queryFn: () => fetchProjects(page),
        keepPreviousData : true
    })

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>
                    {data.map(project => (
                        <p key={project.id}>{`ID: ${project.id} - ${project.title}`}</p>
                    ))}
                </div>
            )}
            <span>Current Page: {page + 1}</span>
            <button
                onClick={() => setPage(old => Math.max(old - 1, 0))}
                disabled={page === 0}
            >
                Previous Page
            </button>{' '}
            <button
                onClick={() => {
                    // if (!isPreviousData && data.hasNextPage) {
                    // }
                        setPage(old => old + 1)
                }}
                // Disable the Next Page button until we know the next page is available
                // disabled={isPreviousData || !data?.hasNextPage}
            >
                Next Page
            </button>
            {isFetching ? <span> Loading...</span> : null}{' '}
        </div>
    )
}

export default PagesQuery;