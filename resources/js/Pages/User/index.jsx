import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function index({ auth, users, queryParams = null, successMsg }) {
  queryParams = queryParams || {};

  const handleSearchChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('user.index'), queryParams);
  }

  const handleKeyPress = (name, event) => {
    if (event.key !== 'Enter') return;

    handleSearchChange(name, event.target.value);
  }

  const handleSortChange = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }

    router.get(route('user.index'), queryParams);
  }

  const handleDeleteUser = (user) => {
    if (!window.confirm('Are you sure to delete this user?')) {
      return;
    }

    router.delete(route('user.destroy', user.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
          <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New</Link>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          {successMsg && <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{successMsg}</div>}

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">

              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap border-b">
                      <TableHeading name="ID" sortField={'id'} handleSortChange={handleSortChange} />
                      <TableHeading name="Name" sortField={'name'} handleSortChange={handleSortChange} />
                      <TableHeading name="Email" sortField={'email'} handleSortChange={handleSortChange} />
                      <TableHeading name="Created Date" sortField={'created_at'} handleSortChange={handleSortChange} />
                      <TableHeading name="Actions" sortable={false} />
                    </tr>

                    <tr>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="User Name"
                          onBlur={e => handleSearchChange('name', e.target.value)}
                          onKeyPress={e => handleKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.email}
                          placeholder="Email"
                          onBlur={e => handleSearchChange('email', e.target.value)}
                          onKeyPress={e => handleKeyPress('email', e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.data.map(user => (
                      <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-3 py-2">{user.id}</td>
                        <td className="px-3 py-2">
                          {user.name}
                        </td>
                        <td className="px-3 py-2">{user.email}</td>
                        <td className="px-3 py-2">{user.created_at}</td>
                        <td className="px-3 py-2">
                          <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                            Edit
                          </Link>
                          <button
                            onClick={e => handleDeleteUser(user)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default index;
