const baseUrl = 'https://api.multiq.com/api'

interface LoginData {
    username: string,
    password: string,
    token?: string
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
export async function makeLogin2fa(data: LoginData) {
    try {
        const response = await fetch(baseUrl + '/CMSUsers/login?twoFactorAuth=true', {
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

export async function searchCocktailByName(search: string) {
    try {
        const response = await fetch('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + search);
        if (!response.ok) {
            throw new Error('Could not fetch data')
        }
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function searchCocktailByIngredient(search: string) {
    try {
        const response = await fetch('https://thecocktaildb.com/api/json/v1/1/search.php?i=' + search);
        if (!response.ok) {
            throw new Error('Could not fetch data')
        }
        return await response.json();
    } catch (error) {
        return error;
    }
}