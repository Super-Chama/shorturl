import prisma from "../lib/prisma";

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const route = await prisma.route.findUnique({
    where: {
      hash: slug,
    },
  });

  return route
    ? {
        redirect: {
          destination: route.url,
          permanent: true,
        },
      }
    : {
        props: {
          slug,
        },
      };
}

export default function Page({ slug }) {
  return <div>ops! url for &lsquo;{slug}&rsquo; not found</div>;
}
