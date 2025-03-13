import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants';
import TasksTable from '../Task/TasksTable';

function show({ auth, user, tasks, queryParams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`User "${user.name}"`}</h2>}
    >
      <Head title="User" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img src={user.image_path} alt="User Image" className="w-full h-64 object-cover" />
            </div>
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">User ID</label>
                    <p className="mt-1">{user.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Name</label>
                    <p className="mt-1">{user.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Status</label>
                    <p className={
                      "px-2 py-1 rounded text-white text-nowrap w-24 " +
                      USER_STATUS_CLASS_MAP[user.status]
                    }>
                      {USER_STATUS_TEXT_MAP[user.status]}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Created By</label>
                    <p className="mt-1">{user.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{user.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{user.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{user.updatedBy.name}</p>
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">User Description</label>
                <p className="mt-1">{user.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                linkTo={'user.show'}
                hiddenUserName={true}
              />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default show;