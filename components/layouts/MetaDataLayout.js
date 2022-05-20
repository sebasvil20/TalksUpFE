import Head from 'next/head'

export const MetaDataLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'TalksUp'}</title>
        <meta name='author' content='Sebasvil20' />
        <meta name='description' content={`TalksUp - Find your next podcast`} />
        <meta name='keywords' content={`podcasts, recommendations, app`} />
      </Head>

      <main style={{ minHeight: '100vh', minWidth: '100%', paddingLeft: '0' }}>
        {children}
      </main>
    </>
  )
}
