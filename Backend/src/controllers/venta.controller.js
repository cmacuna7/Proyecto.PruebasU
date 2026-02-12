const Venta = require('../models/venta.model');

async function procesarVentas(req, res) {
    try {
        const { ventas } = req.body;

        if (!ventas || !Array.isArray(ventas)) {
            return res.status(400).json({ message: 'Se requiere un arreglo de ventas' });
        }

        let A = 0, B = 0, C = 0;
        let T1 = 0, T2 = 0, T3 = 0;
        const ventasGuardadas = [];

        for (const venta of ventas) {
            if (typeof venta.monto !== 'number' || venta.monto < 0) {
                return res.status(400).json({ message: 'Monto de venta inválido' });
            }

            const monto = venta.monto;
            let categoria;

            if (monto > 1000) {
                A++;
                T1 += monto;
                categoria = 'A';
            } else if (monto > 500 && monto <= 1000) {
                B++;
                T2 += monto;
                categoria = 'B';
            } else {
                C++;
                T3 += monto;
                categoria = 'C';
            }

            // Guardar la venta en la base de datos (opcional según requerimientos, pero útil)
            const nuevaVenta = new Venta({ monto, categoria });
            ventasGuardadas.push(nuevaVenta.save());
        }

        await Promise.all(ventasGuardadas);

        const totalVentas = A + B + C;
        const totalRecaudado = T1 + T2 + T3;

        res.json({
            ventasProcesadas: totalVentas,
            A,
            B,
            C,
            T1,
            T2,
            T3,
            TT: totalRecaudado
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { procesarVentas };
