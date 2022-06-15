import { Loading } from '@nextui-org/react'

export const Loader = () => {
  return (
    <div style={{ height: '100vh!important', width: '100%!important' }}>
      <Loading
        color='secondary'
        css={{
          width: '200px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 0)',
        }}
      />
    </div>
  )
}
