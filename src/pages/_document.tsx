import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Metatags SEO */}
        <meta
          name="description"
          content="Aplicaçāo web que tem como objetivo ajudar microempreendedores a gerenciar duas Notas fiscais."
        />
        <meta
          property="og:title"
          content="Vibra NF - Gerencie suas Notas Fiscais com facilidade e segurança"
        />
        <meta
          property="og:description"
          content="Aplicaçāo web que tem como objetivo ajudar microempreendedores a gerenciar duas Notas fiscais."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
