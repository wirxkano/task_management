import TasksTable from './TasksTable';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function index({ auth, tasks, queryParams = null, successMsg }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>
          <Link
            href={route('task.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                successMsg={successMsg}
              />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default index;
