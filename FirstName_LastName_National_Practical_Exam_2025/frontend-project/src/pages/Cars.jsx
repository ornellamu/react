
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/cars';

function Cars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        plateNumber: '',
        carType: '',
        carSize: '',
        driverName: '',
        phoneNumber: ''
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch registered cars
    const fetchCars = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Failed to retrieve cars');
            }

            const data = await response.json();
            setCars(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Register or update car
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingId
            ? `${API_URL}/${encodeURIComponent(editingId)}`
            : API_URL;

        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
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

            handleCancel();
            fetchCars();

        } catch (error) {
            alert(error.message);
        }
    };

    // Select car for editing
    const handleEdit = (car) => {
        setEditingId(car.plateNumber);

        setFormData({
            plateNumber: car.plateNumber,
            carType: car.carType,
            carSize: car.carSize,
            driverName: car.driverName,
            phoneNumber: car.phoneNumber
        });
    };

    // Delete car
    const handleDelete = async (plateNumber) => {
        if (!window.confirm('Are you sure you want to delete this car?')) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/${encodeURIComponent(plateNumber)}`,
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert(result.message);
            fetchCars();

        } catch (error) {
            alert(error.message);
        }
    };

    // Clear form
    const handleCancel = () => {
        setEditingId(null);

        setFormData({
            plateNumber: '',
            carType: '',
            carSize: '',
            driverName: '',
            phoneNumber: ''
        });
    };

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Car Management
            </h2>

            {/* Car registration form */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">

                <h3 className="text-lg font-semibold mb-5">
                    {editingId ? 'Update Car' : 'Register New Car'}
                </h3>

                <form onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="plateNumber"
                        placeholder="Plate Number"
                        value={formData.plateNumber}
                        onChange={handleChange}
                        disabled={!!editingId}
                        className="border p-3 rounded-lg disabled:bg-gray-100"
                        required
                    />

                    <input
                        type="text"
                        name="carType"
                        placeholder="Car Type"
                        value={formData.carType}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                        required
                    />

                    <select
                        name="carSize"
                        value={formData.carSize}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                        required
                    >
                        <option value="">Select Car Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>

                    <input
                        type="text"
                        name="driverName"
                        placeholder="Driver Name"
                        value={formData.driverName}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                        required
                    />

                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                        required
                    />

                    <div className="flex gap-3 md:col-span-2">

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {editingId ? 'Update Car' : 'Register Car'}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>
            </div>

            {/* Registered cars table */}
            <div className="bg-white p-6 rounded-xl shadow">

                <h3 className="text-lg font-semibold mb-5">
                    Registered Cars
                </h3>

                {loading ? (
                    <p>Loading cars...</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Plate Number</th>
                                    <th className="p-3">Car Type</th>
                                    <th className="p-3">Car Size</th>
                                    <th className="p-3">Driver Name</th>
                                    <th className="p-3">Phone Number</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cars.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center">
                                            No cars registered yet.
                                        </td>
                                    </tr>
                                ) : (
                                    cars.map((car) => (
                                        <tr key={car.plateNumber}
                                            className="border-b">

                                            <td className="p-3">
                                                {car.plateNumber}
                                            </td>

                                            <td className="p-3">
                                                {car.carType}
                                            </td>

                                            <td className="p-3">
                                                {car.carSize}
                                            </td>

                                            <td className="p-3">
                                                {car.driverName}
                                            </td>

                                            <td className="p-3">
                                                {car.phoneNumber}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(car)}
                                                        className="bg-yellow-500 text-white px-3 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(car.plateNumber)}
                                                        className="bg-red-600 text-white px-3 py-2 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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

export default Cars;
