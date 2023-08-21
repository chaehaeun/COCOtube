import { useParams } from 'react-router-dom'

const Search = () => {
  const { searchKeyword } = useParams()

  return (
    <>
      <h2 className="sr-only_Title">{searchKeyword} 검색 결과</h2>
      <p>{searchKeyword}</p>
    </>
  )
}

export default Search
