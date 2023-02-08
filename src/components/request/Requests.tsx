const baseUrl = 'https://api.multiq.com/api'

interface LoginData {
    username: string,
    password: string
}
export async function makeLogin(data: LoginData) {
    try {
        const response = await fetch(baseUrl + '/CMSUsers/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}