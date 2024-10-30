export default async function FundDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <h1>Fund Details for {slug}</h1>
      <p>View detailed information about stock {slug}.</p>
    </div>
  );
}
