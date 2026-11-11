
const db = require('../config/db');

// Get all service records
exports.getServices = (req, res) => {
    const sql = `
        SELECT
            sp.recordNumber,
            sp.serviceDate,
            sp.plateNumber,
            c.driverName,
            sp.packageNumber,
            p.packageName,
            p.packagePrice
        FROM ServicePackage sp
        JOIN Car c ON sp.plateNumber = c.plateNumber
        JOIN Package p ON sp.packageNumber = p.packageNumber
        ORDER BY sp.recordNumber DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to retrieve service records'
            });
        }

        res.json(results);
    });
};

// Add a service record
exports.addService = (req, res) => {
    const { serviceDate, plateNumber, packageNumber } = req.body;

    if (!serviceDate || !plateNumber || !packageNumber) {
        return res.status(400).json({
            message: 'Please provide all service details'
        });
    }

    const sql = `
        INSERT INTO ServicePackage
        (serviceDate, plateNumber, packageNumber)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [serviceDate, plateNumber, packageNumber],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to record service'
                });
            }

            res.status(201).json({
                message: 'Service recorded successfully',
                recordNumber: result.insertId
            });
        }
    );
};

// Delete a service record
exports.deleteService = (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM ServicePackage WHERE recordNumber = ?',
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Could not delete service. Check whether payments exist for this record.'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Service record not found'
                });
            }

            res.json({
                message: 'Service deleted successfully'
            });
        }
    );
};
