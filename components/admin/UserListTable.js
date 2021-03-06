import { useEffect, useState } from 'react'

import {
  Table,
  Row,
  Col,
  User,
  Text,
  Grid,
  Spacer,
  Pagination,
} from '@nextui-org/react'

import {
  DeleteUserConfirmationModal,
  UpgradeToAdminConfirmationModal,
} from './'

export const UserListTable = ({ users, fetchData }) => {
  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  const [totalPages, setTotalPages] = useState(Math.ceil(users.length / 5))
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / 5))
  }, [users])

  return (
    <>
      <Table
        aria-label='Users table'
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
          items={users}
          css={{
            zIndex: '1!important',
          }}
        >
          {users
            .slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5)
            .map((user) => (
              <Table.Row
                key={user.user_id}
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
                      user.profile_pic_url
                        ? user.profile_pic_url
                        : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
                    }
                    name={`${user.first_name} ${user.last_name}`}
                    css={{ p: 0 }}
                  >
                    {user.email}
                  </User>
                </Table.Cell>
                <Table.Cell>
                  <Col>
                    <Row>
                      <Text
                        b
                        size={14}
                        css={{ tt: 'capitalize' }}
                        color={user.role == '1' && '#6333eb'}
                      >
                        {user.role == '1' ? 'Admin ?????????????????' : 'User'}
                      </Text>
                    </Row>
                  </Col>
                </Table.Cell>
                <Table.Cell>
                  <Row justify='center' align='center'>
                    <Col css={{ d: 'flex' }}>
                      <UpgradeToAdminConfirmationModal
                        user_id={user.user_id}
                        public_name={user.public_name}
                        role={user.role}
                        fetchData={fetchData}
                      />
                    </Col>
                    {user.role != 1 && (
                      <Col css={{ d: 'flex' }}>
                        <DeleteUserConfirmationModal
                          user_id={user.user_id}
                          public_name={user.public_name}
                          fetchData={fetchData}
                        />
                      </Col>
                    )}
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
