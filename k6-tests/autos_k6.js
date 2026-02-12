import http from 'k6/http';
import { check } from 'k6';

export function testAutos(baseUrl, params) {
    const autosRes = http.get(`${baseUrl}/api/autos`, params);
    if (!check(autosRes, { 'status is 200': (r) => r.status === 200 })) {
        console.error(`Get Autos failed: ${autosRes.status} ${autosRes.body}`);
    }
}
