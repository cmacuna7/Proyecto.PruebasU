import { sleep, group } from 'k6';
import { testVendorLifecycle } from './vendor_k6_test.js';
import { testClienteLifecycle } from './cliente_k6_test.js';
import { login } from './auth_k6.js';
import { testAutos } from './autos_k6.js';
import { testConcesionarias } from './concesionarias_k6.js';

const BASE_URL = __ENV.BASE_URL || 'https://proyecto-pruebasu-production.up.railway.app';

export const options = {
    stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const token = login(BASE_URL, 'admin@consecionaria.com', 'consesionariachida');

    if (!token) {
        return;
    }

    const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    group('API Endpoints', function () {
        // 2. Obtener Autos
        testAutos(BASE_URL, { headers: authHeaders });
        sleep(1);

        // 3. Ciclo de vida Vendedores (CRUD)
        group('Vendedores Lifecycle', function () {
            testVendorLifecycle(BASE_URL, { headers: authHeaders });
        });
        sleep(1);

        // 4. Ciclo de vida Clientes (CRUD)
        group('Clientes Lifecycle', function () {
            testClienteLifecycle(BASE_URL, { headers: authHeaders });
        });
        sleep(1);

        // 5. Obtener Concesionarias
        testConcesionarias(BASE_URL, { headers: authHeaders });
        sleep(1);
    });
}
