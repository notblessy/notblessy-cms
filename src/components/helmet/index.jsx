import { Helmet } from 'react-helmet';

const CustomHelmet = () => {
  return (
    <Helmet encodeSpecialCharacters={true} titleTemplate="%s - notblessy">
      <meta
        name="description"
        content="Dedicated support team for your WordPress website"
      />
      <meta property="og:type" content="article" />

      <link rel="canonical" href="https://fans.inc/example" />
      <link
        rel="apple-touch-icon"
        href="https://fans.inc/img/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="https://fans.inc/img/apple-touch-icon-72x72.png"
      />

      <script type="application/ld+json">{`
        {
            "@context": "http://schema.org"
        }
    `}</script>
    </Helmet>
  );
};

export default CustomHelmet;
