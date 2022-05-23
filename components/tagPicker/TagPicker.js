import { useState, useEffect } from 'react'

import {
  Checkbox,
  Textarea,
  Container,
  Text,
  useTheme,
} from '@nextui-org/react'

import { ArrowIcon } from '../icons'

export const TagPicker = () => {
  const { theme } = useTheme()
  const [showOptionsList, setShowOptionsList] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedLabels, setSelectedLabels] = useState()
  const [options, setOptions] = useState([
    {
      value: 'testing',
      label: 'Categoria 1',
    },
    {
      value: 'volvo',
      label: 'Volvo 1',
    },
    {
      value: 'ferrari',
      label: 'Ferrari carro',
    },
    {
      value: 'ferrari32',
      label: 'Ferrari carro',
    },
    {
      value: 'ferrari 33',
      label: 'Ferrari carro',
    },
  ])

  useEffect(() => {
    let labelTags = []
    selectedTags.map((tag) => {
      labelTags.push(options.find((o) => o?.value == tag).label)
    })
    setSelectedLabels(labelTags)
  }, [selectedTags])

  return (
    <>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          background: theme?.colors?.backgroundSecundary?.value,
          borderRadius: '15px 15px 0 0',
          paddingTop: '20px',
        }}
        onClickFunc={() => setShowOptionsList(false)}
      >
        <input
          value={selectedLabels}
          width='90%'
          color={theme?.colors?.backgroundSecundary?.value}
          style={{
            width: '80%',
            height: '60px',
            maxHeight: '100px',
            overflow: 'scroll',
            background: theme?.colors?.backgroundSecundary?.value,
            border: 'none',
            outline: 'none',
          }}
          onFocus={() => setShowOptionsList(true)}
        />
        {console.log(theme?.colors?.backgroundSecundary?.value)}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50px',
            width: '50px', cursor: 'pointer'
          }}
          type='none'
          onClick={() => setShowOptionsList(!showOptionsList)}
        >
          <ArrowIcon clicked={showOptionsList} />
        </div>
        <Checkbox.Group
          css={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            maxHeight: '120px',
            overflowY: 'scroll',
            zIndex: 10,
            padding: '10px',
            borderRadius: '0px 0px 15px 15px',
            transition: '.2s all ease',
            backgroundColor: theme?.colors?.backgroundSecundary?.value,
          }}
          aria-label='categories'
          onChange={(e) => setSelectedTags(e)}
        >
          {showOptionsList && (
            <>
              {options.map((option) => (
                <Checkbox
                  css={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '8px!important',
                    marginBottom: '8 px!important'
                  }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Checkbox>
              ))}
            </>
          )}
        </Checkbox.Group>
      </Container>
    </>
  )
}
