const db = require('../config/db');

// GET: Display all packages
exports.getPackages = (req, res) => {
    const sql = 'SELECT * FROM Package ORDER BY packageNumber DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to retrieve packages'
            });
        }

        res.status(200).json(results);
    });
};

// POST: Add a package
exports.addPackage = (req, res) => {
    const { packageName, packageDescription, packagePrice } = req.body;

    if (
        !packageName ||
        !packageDescription ||
        packagePrice === undefined ||
        !Number.isFinite(Number(packagePrice)) ||
        Number(packagePrice) < 0
    ) {
        return res.status(400).json({
            message: 'Please provide valid package details'
        });
    }

    const sql = `
        INSERT INTO Package
        (packageName, packageDescription, packagePrice)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [packageName, packageDescription, packagePrice],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to add package'
                });
            }

            res.status(201).json({
                message: 'Package added successfully',
                packageNumber: result.insertId
            });
        }
    );
};

// PUT: Update a package
exports.updatePackage = (req, res) => {
    const { id } = req.params;
    const { packageName, packageDescription, packagePrice } = req.body;

    if (
        !packageName ||
        !packageDescription ||
        packagePrice === undefined ||
        !Number.isFinite(Number(packagePrice)) ||
        Number(packagePrice) < 0
    ) {
        return res.status(400).json({
            message: 'Please provide valid package details'
        });
    }

    const sql = `
        UPDATE Package
        SET packageName = ?,
            packageDescription = ?,
            packagePrice = ?
        WHERE packageNumber = ?
    `;

    db.query(
        sql,
        [packageName, packageDescription, packagePrice, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to update package'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Package not found'
                });
            }

            res.status(200).json({
                message: 'Package updated successfully'
            });
        }
    );
};

// DELETE: Delete a package
exports.deletePackage = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Package WHERE packageNumber = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    message: 'Cannot delete a package already used in a service'
                });
            }

            return res.status(500).json({
                message: 'Failed to delete package'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Package not found'
            });
        }

        res.status(200).json({
            message: 'Package deleted successfully'
        });
    });
};