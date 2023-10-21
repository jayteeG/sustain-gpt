const returnSelection = () => {
    return new Promise((resolve, reject) => {
        if (window.getSelection) {
            resolve(window.getSelection().toString())
        } else if (document.getSelection) {
            resolve(document.getSelection().toString())
        } else if (document.selection) {
            resolve(document.selection.createRange().text.toString())
        } else reject();
    })
}

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    const { type } = request
    if (type === "LOAD") {
        try {
            const selection = await returnSelection()
            console.log(selection)
            console.log("Hello world" + selection)
            const updated_select = "This is a prompt for you " + selection
            response(updated_select)
        } catch (e) {
            response()
        }
    }
})