import http from 'k6/http';
import { check } from 'k6';

export function testConcesionarias(baseUrl, params) {
    const concesionariasRes = http.get(`${baseUrl}/api/concesionarias`, params);
    if (!check(concesionariasRes, { 'status is 200': (r) => r.status === 200 })) {
        console.error(`Get Concesionarias failed: ${concesionariasRes.status} ${concesionariasRes.body}`);
    }
}
