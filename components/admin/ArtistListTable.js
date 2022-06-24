import { useEffect, useState } from 'react'
import {
  Table,
  Row,
  Col,
  User,
  Text,
  Pagination,
  Grid,
  Spacer,
} from '@nextui-org/react'

import { DeleteUserConfirmationModal } from './'
import { DeleteAuthorConfirmationModal } from './DeleteAuthorConfirmationModal'

export const ArtistListTable = ({ artists, fetchData }) => {
  const columns = [
    { name: 'ARTIST', uid: 'artist' },
    { name: 'PODCASTS', uid: 'podcasts' },
    { name: 'ACTIONS', uid: 'actions2' },
  ]

  const [totalPages, setTotalPages] = useState(Math.ceil(artists.length / 5))
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setTotalPages(Math.ceil(artists.length / 5))
  }, [artists])

  console.log(totalPages)
  return (
    <>
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
              hideHeader={column.uid === 'actions2'}
              align={column.uid === 'actions2' ? 'center' : 'start'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body
          items={artists.slice(
            (currentPage - 1) * 5,
            (currentPage - 1) * 5 + 5
          )}
          css={{
            zIndex: '1!important',
          }}
        >
          {artists
            .slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5)
            .map((artist) => (
              <Table.Row
                key={artist.author_id}
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
                      <Text b size={14} css={{ tt: 'capitalize' }}>
                        {artist.total_podcasts}
                      </Text>
                    </Row>
                  </Col>
                </Table.Cell>
                <Table.Cell>
                  <Row justify='center' align='center'>
                    <Col css={{ d: 'flex' }}>
                      <DeleteAuthorConfirmationModal
                        author_id={artist.author_id}
                        fetchData={fetchData}
                        name={artist.name}
                      />
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {totalPages > 1 && (
        <Grid.Container>
          <Spacer />
          <Grid xs={12} justify='center'>
            <Pagination
              shadow
              color='secondary'
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={totalPages}
            />
          </Grid>
        </Grid.Container>
      )}
    </>
  )
}
