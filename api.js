const getRepo = async (repo) => {
    
    const response = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
    if (response.ok) {
        const data = await response.json()
        const items = await data.items
        clearDropdown()
        enumerationElem(items)
    } else {
        errorResponse(response)
    }
}