import Head from 'next/head'

export const MetaDataLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'TalksUp'}</title>
        <meta name='author' content='Sebasvil20' />
        <meta name='description' content={`TalksUp - Find your next podcast`} />
        <meta name='keywords' content={`podcasts, recommendations, app`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta
          property='og:title'
          content={"Talk's up find your next podcast"}
        />
        <meta property='og:url' content='https://talks-up-fe.vercel.app/' />
        <meta
          property='og:image'
          content='https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/724ecd00-de05-11ec-b35a-e62effe0ba4e.png'
        />
        <meta
          name='twitter:title'
          content="Talk's Up - Find your next podcast"
        />
        <meta
          name='twitter:description'
          content='See thru the biggest podcast community'
        />
        <meta
          name='twitter:image'
          content='https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/724ecd00-de05-11ec-b35a-e62effe0ba4e.png'
        />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <main style={{ padding: '0', margin: '0' }}>{children}</main>
    </>
  )
}
