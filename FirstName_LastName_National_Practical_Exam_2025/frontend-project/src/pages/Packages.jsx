import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/packages';

function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        packageName: '',
        packageDescription: '',
        packagePrice: ''
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch all packages
    const fetchPackages = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Could not retrieve packages');
            }

            const data = await response.json();
            setPackages(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add or update package
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingId
            ? `${API_URL}/${editingId}`
            : API_URL;

        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    packagePrice: Number(formData.packagePrice)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Operation failed');
            }

            alert(result.message);

            setFormData({
                packageName: '',
                packageDescription: '',
                packagePrice: ''
            });

            setEditingId(null);
            fetchPackages();

        } catch (err) {
            alert(err.message);
        }
    };

    // Edit package
    const handleEdit = (item) => {
        setEditingId(item.packageNumber);

        setFormData({
            packageName: item.packageName,
            packageDescription: item.packageDescription,
            packagePrice: item.packagePrice
        });
    };

    // Delete package
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this package?'
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Delete failed');
            }

            alert(result.message);
            fetchPackages();

        } catch (err) {
            alert(err.message);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingId(null);

        setFormData({
            packageName: '',
            packageDescription: '',
            packagePrice: ''
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Package Management
            </h1>

            {/* Package form */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    {editingId ? 'Edit Package' : 'Add New Package'}
                </h2>

                <form onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        name="packageName"
                        placeholder="Package Name"
                        value={formData.packageName}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="text"
                        name="packageDescription"
                        placeholder="Package Description"
                        value={formData.packageDescription}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="number"
                        name="packagePrice"
                        placeholder="Package Price"
                        value={formData.packagePrice}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="border rounded-lg p-3"
                        required
                    />

                    <div className="flex gap-3 md:col-span-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {editingId ? 'Update Package' : 'Save Package'}
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

            {/* Package table */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                    Available Packages
                </h2>

                {loading && <p>Loading packages...</p>}

                {error && (
                    <p className="text-red-600 mb-4">{error}</p>
                )}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3">No.</th>
                                    <th className="p-3">Package Name</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Price (RWF)</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {packages.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center">
                                            No packages found.
                                        </td>
                                    </tr>
                                ) : (
                                    packages.map((item) => (
                                        <tr key={item.packageNumber}
                                            className="border-b">

                                            <td className="p-3">
                                                {item.packageNumber}
                                            </td>

                                            <td className="p-3">
                                                {item.packageName}
                                            </td>

                                            <td className="p-3">
                                                {item.packageDescription}
                                            </td>

                                            <td className="p-3">
                                                {Number(item.packagePrice).toLocaleString()}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="bg-yellow-500 text-white px-3 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.packageNumber)}
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

export default Packages;
