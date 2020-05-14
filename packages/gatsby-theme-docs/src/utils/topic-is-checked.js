function topicIsChecked(filterTopicsArray, topic) {
  if (filterTopicsArray) {
    return Array.isArray(filterTopicsArray)
      ? filterTopicsArray.includes(topic)
      : topic === filterTopicsArray;
  }

  return false;
}

export default topicIsChecked;
