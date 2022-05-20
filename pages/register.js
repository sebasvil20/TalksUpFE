import { RegisterContainer } from '../components/auth'
import { MetaDataLayout } from '../components/layouts'
import { talksUpApi } from '../api'

const register = ({ categories }) => {
  return (
    <MetaDataLayout title='TalksUp - Register'>
      <RegisterContainer categories={categories} />
    </MetaDataLayout>
  )
}

export const getStaticProps = async (ctx) => {
  const { data } = await talksUpApi.get('/categories')
  const categories = data.data.map((category) => ({
    value: category.category_id,
    label: category.name,
  }))
  return {
    props: {
      categories,
    },
  }
}

export default register
