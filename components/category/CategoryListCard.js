import { Grid } from '@nextui-org/react'

import Cookie from 'js-cookie'

import { useEffect, useState } from 'react'
import { CategoryCard } from './CategoryCard'
import { talksUpApi } from '../../api'

export const CategoryListCard = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const allCategories = await talksUpApi.get(
        `/categories?lang=${Cookie.get('lang')}`
      )
      setCategories(allCategories.data.data)
    }
    fetchData()
  }, [])
  return (
    <Grid.Container gap={2} justify='center'>
      {categories.map((category) => (
        <Grid key={category.category_id} sm={6} md={4} xs={12}>
          <CategoryCard category={category} clickable={true} margin={false} />
        </Grid>
      ))}
    </Grid.Container>
  )
}
