export async function post(url, info) {

    try {

        await fetch(url, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        });

    } catch (error) {
        console.error("Error");
    }

}

export async function get(url) {

    try {
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error");

    }
}

export async function deleteHttp(url) {

    try {
        const response = await fetch(url, {
            method: "DELETE",
        })

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error");

    }
}

export async function update(url, info) {

    try {

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error");

    }

}