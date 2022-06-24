import { Table, Row, Col, User, Text } from '@nextui-org/react'

import { DeleteConfirmationModal, UpgradeToAdminConfirmationModal } from './'

export const ArtistListTable = ({ artists, fetchData }) => {
  const columns = [
    { name: 'ARTIST', uid: 'artist' },
    { name: 'PODCASTS', uid: 'podcasts' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  return (
    <Table
      aria-label='Authors table'
      css={{
        height: 'auto',
        minWidth: '100%',
        width: '100%',
        zIndex: '1!important',
      }}
      selectionMode='none'
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === 'actions'}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body
        items={artists}
        css={{
          zIndex: '1!important',
        }}
      >
        {artists.map((artist) => (
          <Table.Row
            key={artist.artist_id}
            css={{
              zIndex: '1!important',
            }}
          >
            <Table.Cell
              css={{
                zIndex: '1!important',
              }}
            >
              <User
                squared
                onError={(e) =>
                  (e.target.src =
                    'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
                }
                src={
                    artist.profile_pic_url
                    ? artist.profile_pic_url
                    : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
                }
                name={`${artist.name}`}
                css={{ p: 0 }}
              >
                {artist.name}
              </User>
            </Table.Cell>
            <Table.Cell>
              <Col>
                <Row>
                  <Text
                    b
                    size={14}
                    css={{ tt: 'capitalize' }}
                  >{artist.total_podcasts}
                  </Text>
                </Row>
              </Col>
            </Table.Cell>
            <Table.Cell>
              <Row justify='center' align='center'>
                <Col css={{ d: 'flex' }}>
                  <DeleteConfirmationModal
                    user_id={artist.artist_id}
                    public_name={artist.name}
                    fetchData={fetchData}
                  />
                </Col>
              </Row>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align='center'
        rowsPerPage={5}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  )
}
