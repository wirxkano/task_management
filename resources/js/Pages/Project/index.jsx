import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';

function index({ auth, projects, queryParams = null, successMsg }) {
  queryParams = queryParams || {};

  const handleSearchChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('project.index'), queryParams);
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

    router.get(route('project.index'), queryParams);
  }

  const handleDeleteProject = (project) => {
    if (!window.confirm('Are you sure to delete this project?')) {
      return;
    }

    router.delete(route('project.destroy', project.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
          <Link href={route('project.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New</Link>
        </div>
      }
    >
      <Head title="Projects" />

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
                      <TableHeading name="Image" sortable={false} />
                      <TableHeading name="Name" sortField={'name'} handleSortChange={handleSortChange} />
                      <TableHeading name="Status" sortField={'status'} handleSortChange={handleSortChange} />
                      <TableHeading name="Created Date" sortField={'created_at'} handleSortChange={handleSortChange} />
                      <TableHeading name="Due Date" sortField={'due_date'} handleSortChange={handleSortChange} />
                      <TableHeading name="Created By" sortable={false} />
                      <TableHeading name="Actions" sortable={false} />
                    </tr>

                    <tr>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={e => handleSearchChange('name', e.target.value)}
                          onKeyPress={e => handleKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={e => handleSearchChange('status', e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.data.map(project => (
                      <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} alt="Task Image" style={{ width: '60px' }} />
                        </td>
                        <td className="px-3 py-2 hover:text-blue-500 cursor-pointer">
                          <Link href={route('project.show', project.id)}>
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span className={
                            "px-2 py-1 rounded text-white text-nowrap " +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                          }>
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{project.created_at}</td>
                        <td className="px-3 py-2">{project.due_date}</td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                            Edit
                          </Link>
                          <button
                            onClick={e => handleDeleteProject(project)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default index;
