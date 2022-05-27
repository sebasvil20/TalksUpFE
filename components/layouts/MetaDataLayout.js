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
      </Head>

      <main style={{ padding: '0', margin: '0' }}>{children}</main>
    </>
  )
}
