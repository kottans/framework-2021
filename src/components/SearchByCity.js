function SearchByCity() {
  return `
    <input
        type="text"
        value="${window.dataStore.currentCity}"
        onchange="window.performSearch(this.value)"
    />
`;
}

export default SearchByCity;
