import HomeClient from "./HomeClient";

type PageProps = {
  searchParams: Promise<{
    add?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { add } = await searchParams;

  return <HomeClient initialTemplate={add} />;
}