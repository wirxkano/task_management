import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constants';

function show({ auth, task }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Task "${task.name}"`}</h2>
          <Link
            href={route('task.edit', task.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title="Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img src={task.image_path} alt="Task Image" className="w-full h-64 object-cover" />
            </div>
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Task ID</label>
                    <p className="mt-1">{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Name</label>
                    <p className="mt-1">{task.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Status</label>
                    <p className={
                      "px-2 py-1 rounded text-white text-nowrap w-24 " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }>
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Assigned User</label>
                    <p className="mt-1">{task.assignedUser.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Created By</label>
                    <p className="mt-1">{task.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Priority</label>
                    <p className={
                      "px-2 py-1 rounded text-white text-nowrap w-24 " +
                      TASK_PRIORITY_CLASS_MAP[task.priority]
                    }>
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Belong To Project</label>
                    <p className="mt-1 hover:text-blue-500">
                      <Link href={route('project.show', task.project.id)}>{task.project.name}</Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{task.updatedBy.name}</p>
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Task Description</label>
                <p className="mt-1">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default show;