
const db = require('../config/db');

// GET: Display all cars
exports.getCars = (req, res) => {
    const sql = 'SELECT * FROM Car ORDER BY plateNumber DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to retrieve cars'
            });
        }

        res.status(200).json(results);
    });
};

// POST: Register a car
exports.addCar = (req, res) => {
    const {
        plateNumber,
        carType,
        carSize,
        driverName,
        phoneNumber
    } = req.body;

    if (!plateNumber || !carType || !carSize || !driverName || !phoneNumber) {
        return res.status(400).json({
            message: 'All car fields are required'
        });
    }

    const sql = `
        INSERT INTO Car
        (plateNumber, carType, carSize, driverName, phoneNumber)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [plateNumber, carType, carSize, driverName, phoneNumber],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: 'This plate number is already registered'
                    });
                }

                return res.status(500).json({
                    message: 'Failed to register car'
                });
            }

            res.status(201).json({
                message: 'Car registered successfully'
            });
        }
    );
};

// PUT: Update car details
exports.updateCar = (req, res) => {
    const { id } = req.params;

    const {
        carType,
        carSize,
        driverName,
        phoneNumber
    } = req.body;

    if (!carType || !carSize || !driverName || !phoneNumber) {
        return res.status(400).json({
            message: 'All car fields are required'
        });
    }

    const sql = `
        UPDATE Car
        SET carType = ?, carSize = ?,
            driverName = ?, phoneNumber = ?
        WHERE plateNumber = ?
    `;

    db.query(
        sql,
        [carType, carSize, driverName, phoneNumber, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to update car'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Car not found'
                });
            }

            res.status(200).json({
                message: 'Car updated successfully'
            });
        }
    );
};

// DELETE: Remove a car
exports.deleteCar = (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM Car WHERE plateNumber = ?',
        [id],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(409).json({
                        message: 'Cannot delete a car that has service records'
                    });
                }

                return res.status(500).json({
                    message: 'Failed to delete car'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Car not found'
                });
            }

            res.status(200).json({
                message: 'Car deleted successfully'
            });
        }
    );
};
