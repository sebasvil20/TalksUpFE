import Head from 'next/head'
import React from 'react'

export const MetaDataLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'TalksUp'}</title>
        <meta name='author' content='Sebasvil20' />
        <meta name='description' content={`TalksUp - Find your next podcast`} />
        <meta name='keywords' content={`podcasts, recommendations, app`} />
      </Head>

      <main>{children}</main>
    </>
  )
}
