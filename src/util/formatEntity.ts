import he from 'he'

const formatEntity = (entity: string) => {
  return he.decode(entity)
}

export default formatEntity
