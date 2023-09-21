const formatSubscriberCount = (subscribers: number): string => {
  switch (true) {
    case subscribers >= 10000:
      return `${Math.floor(subscribers / 10000)}만`
    case subscribers >= 1000:
      return `${Math.floor(subscribers / 1000)}천`
    default:
      return `${subscribers}`
  }
}

export default formatSubscriberCount
