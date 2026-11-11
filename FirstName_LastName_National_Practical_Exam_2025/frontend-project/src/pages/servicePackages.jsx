
import { useEffect, useState } from 'react';

const SERVICE_API = 'http://localhost:5000/api/services';
const CAR_API = 'http://localhost:5000/api/cars';
const PACKAGE_API = 'http://localhost:5000/api/packages';

function ServicePackages() {
    const [services, setServices] = useState([]);
    const [cars, setCars] = useState([]);
    const [packages, setPackages] = useState([]);

    const [formData, setFormData] = useState({
        serviceDate: '',
        plateNumber: '',
        packageNumber: ''
    });

    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);

            const [serviceRes, carRes, packageRes] =
                await Promise.all([
                    fetch(SERVICE_API),
                    fetch(CAR_API),
                    fetch(PACKAGE_API)
                ]);

            if (!serviceRes.ok || !carRes.ok || !packageRes.ok) {
                throw new Error('Failed to load service information');
            }

            const serviceData = await serviceRes.json();
            const carData = await carRes.json();
            const packageData = await packageRes.json();

            setServices(serviceData);
            setCars(carData);
            setPackages(packageData);

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SERVICE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert(result.message);

            setFormData({
                serviceDate: '',
                plateNumber: '',
                packageNumber: ''
            });

            loadData();

        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this service record?')) {
            return;
        }

        try {
            const response = await fetch(`${SERVICE_API}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert(result.message);
            loadData();

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-6">
                Service Package Management
            </h2>

            {/* Service form */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">

                <h3 className="text-lg font-semibold mb-5">
                    Record New Service
                </h3>

                <form onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block mb-2 font-medium">
                            Service Date
                        </label>

                        <input
                            type="date"
                            name="serviceDate"
                            value={formData.serviceDate}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Select Car
                        </label>

                        <select
                            name="plateNumber"
                            value={formData.plateNumber}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        >
                            <option value="">Choose a car</option>

                            {cars.map((car) => (
                                <option
                                    key={car.plateNumber}
                                    value={car.plateNumber}
                                >
                                    {car.plateNumber} - {car.driverName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Select Package
                        </label>

                        <select
                            name="packageNumber"
                            value={formData.packageNumber}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        >
                            <option value="">Choose a package</option>

                            {packages.map((pkg) => (
                                <option
                                    key={pkg.packageNumber}
                                    value={pkg.packageNumber}
                                >
                                    {pkg.packageName} - {pkg.packagePrice} RWF
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            disabled={cars.length === 0 || packages.length === 0}
                        >
                            Record Service
                        </button>
                    </div>

                </form>

                {cars.length === 0 && (
                    <p className="text-orange-600 mt-3">
                        Register a car before recording a service.
                    </p>
                )}

                {packages.length === 0 && (
                    <p className="text-orange-600 mt-2">
                        Add a package before recording a service.
                    </p>
                )}

            </div>

            {/* Service records table */}
            <div className="bg-white p-6 rounded-xl shadow">

                <h3 className="text-lg font-semibold mb-5">
                    Recorded Services
                </h3>

                {loading ? (
                    <p>Loading service records...</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Record No.</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Plate Number</th>
                                    <th className="p-3">Driver</th>
                                    <th className="p-3">Package</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {services.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-4 text-center">
                                            No services recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.recordNumber}
                                            className="border-b">

                                            <td className="p-3">
                                                {service.recordNumber}
                                            </td>

                                            <td className="p-3">
                                                {String(service.serviceDate).slice(0, 10)}
                                            </td>

                                            <td className="p-3">
                                                {service.plateNumber}
                                            </td>

                                            <td className="p-3">
                                                {service.driverName}
                                            </td>

                                            <td className="p-3">
                                                {service.packageName}
                                            </td>

                                            <td className="p-3">
                                                {service.packagePrice} RWF
                                            </td>

                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleDelete(service.recordNumber)}
                                                    className="bg-red-600 text-white px-3 py-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
}

export default ServicePackages;
