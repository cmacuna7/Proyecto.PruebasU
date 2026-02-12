import http from 'k6/http';
import { check } from 'k6';

export function login(baseUrl, email, password) {
    const loginPayload = JSON.stringify({
        email: email,
        password: password,
    });

    const headers = { 'Content-Type': 'application/json' };
    const loginRes = http.post(`${baseUrl}/api/auth/login`, loginPayload, { headers: headers });

    // Verificar login
    const isLoginSuccessful = check(loginRes, {
        'status is 200': (r) => r.status === 200,
        'token present': (r) => r.json('token') !== undefined,
    });

    if (!isLoginSuccessful) {
        console.error(`Login failed: ${loginRes.status} ${loginRes.body}`);
        return null;
    }

    return loginRes.json('token');
}
