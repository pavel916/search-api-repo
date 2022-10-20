const getRepo = async (repo) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
    // const response = await request
    if (response.ok) {
        const data = await response.json()
        const items = await data.items
        clearDropdown()
        items.forEach(view)
    } else {
        errorResponse()
    }
}