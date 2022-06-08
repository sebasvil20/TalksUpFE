import { Grid } from '@nextui-org/react'
import { CategoryCard } from './CategoryCard'

import Cookie from 'js-cookie'

import { useEffect, useState } from 'react'
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
        <CategoryCard key={category.category_id} category={category} />
      ))}
    </Grid.Container>
  )
}
