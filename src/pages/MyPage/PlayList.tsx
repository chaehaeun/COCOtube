import { FilterBtnList, VideoList } from '@/components'

const PlayList = () => {
  return (
    <section>
      <h4 className="sr-only_Title">PlayList</h4>
      <FilterBtnList />
      <VideoList />
    </section>
  )
}

export default PlayList
