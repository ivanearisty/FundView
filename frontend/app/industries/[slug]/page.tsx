export default async function IndustryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <h1>Industry Details for {slug}</h1>
      <p>View detailed information about industry {slug}.</p>
    </div>
  );
}
