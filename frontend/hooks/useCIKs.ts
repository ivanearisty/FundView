import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCIKs() {
  const { data, error, isLoading } = useSWR('/api/ciks', fetcher);

  return {
    ciks: data,
    isLoading,
    isError: error
  };
}