import { Helmet } from "react-helmet-async";

type OpenGraphProps = {
  image: string;
  username: string;
  full_name: string;
};

export function OpenGraph({ image, username, full_name }: OpenGraphProps) {
  return (
    <Helmet>
      {/* <meta name="twitter:card" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:creator" content="" /> */}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mysociallink.vercel.app/${username}`} />
      <meta property="og:site_name" content="MySocialLink" />
      <meta property="og:title" content={`MySocialLink - ${full_name}`} />
      <meta
        property="og:description"
        content={`Hello there, Im ${full_name}. Check out my profile now!`}
      />
      <meta property="og:image" content={image} />
      {/* <meta property="og:image:width" content="720" /> */}
      {/* <meta property="og:image:height" content="720" /> */}
      {/* <meta property="og:image:alt" content="profile photo" /> */}
    </Helmet>
  );
}
