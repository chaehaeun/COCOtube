import { FilterBtnList } from '@/components'

const PlayList = () => {
  return (
    <>
      <h3 className="sr-only_Title">PlayList</h3>
      <FilterBtnList />
      <ul className="videoList"></ul>
    </>
  )
}

export default PlayList
