
import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    'Dashboard',
    'Cars',
    'Packages',
    'Services',
    'Payments',
    'Reports',
  ]

  const statistics = [
    { title: 'Total Cars', value: '125', icon: '🚗', color: 'bg-blue-100' },
    { title: 'Total Services', value: '86', icon: '🧼', color: 'bg-green-100' },
    { title: 'Total Payments', value: '75', icon: '💳', color: 'bg-purple-100' },
    { title: 'Total Sales', value: '850,000 RWF', icon: '💰', color: 'bg-orange-100' },
  ]

  const recentServices = [
    { plate: 'RAD123A', driver: 'John Doe', package: 'Basic Wash', price: '5,000 RWF', status: 'Paid' },
    { plate: 'RAE456B', driver: 'Mary Jane', package: 'Classic Wash', price: '10,000 RWF', status: 'Paid' },
    { plate: 'RAF789C', driver: 'Peter James', package: 'Premium Wash', price: '20,000 RWF', status: 'Pending' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">

        <h1 className="text-2xl font-bold mb-2">
          Smart Park
        </h1>

        <p className="text-gray-400 text-sm mb-10">
          Car Washing Management
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activePage === item
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">

        <header className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {activePage}
            </h2>

            <p className="text-gray-500 mt-1">
              Welcome to Smart Park Management System
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800">
              Receptionist
            </p>
            <p className="text-sm text-gray-500">
              Smart Park
            </p>
          </div>

        </header>

        {activePage === 'Dashboard' && (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

              {statistics.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-gray-500 text-sm">
                        {stat.title}
                      </p>

                      <h3 className="text-2xl font-bold mt-2 text-gray-800">
                        {stat.value}
                      </h3>
                    </div>

                    <div className={`${stat.color} p-4 rounded-full text-2xl`}>
                      {stat.icon}
                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Recent services */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h3 className="text-xl font-bold text-gray-800 mb-5">
                Recent Washing Services
              </h3>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b text-gray-500 text-sm">
                      <th className="py-3">Plate Number</th>
                      <th>Driver Name</th>
                      <th>Package</th>
                      <th>Price</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentServices.map((service, index) => (
                      <tr key={index} className="border-b text-gray-700">
                        <td className="py-4 font-medium">
                          {service.plate}
                        </td>

                        <td>{service.driver}</td>

                        <td>{service.package}</td>

                        <td>{service.price}</td>

                        <td>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            service.status === 'Paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {service.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </div>
          </>
        )}

        {activePage !== 'Dashboard' && (
          <div className="bg-white rounded-xl p-10 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {activePage} Management
            </h3>

            <p className="text-gray-500">
              We will develop this module in the next stages.
            </p>
          </div>
        )}

      </main>

    </div>
  )
}

export default App
