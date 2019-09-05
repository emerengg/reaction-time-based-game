const ENDPOINT = 'http://127.0.0.1:8000/api/ladder/'

const getLadder = async () => {
    const response  = await fetch(ENDPOINT)
    const json = await response.json();
    return json;
}

const postScore = async (name, score) => {
    const data = {
        name,
        score
    }

    const lookupOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };

    const response  = await fetch(ENDPOINT, lookupOptions)
    const json = await response.json();
    return json;
}

export {getLadder, postScore};