import { useCIKs } from '@/hooks/useCIKs';

export default function CIKList() {
  const { ciks, isLoading, isError } = useCIKs();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading CIKs</div>;

  return (
    <ul>
      {ciks.map((cik: string) => (
        <li key={cik}>{cik}</li>
      ))}
    </ul>
  );
}
