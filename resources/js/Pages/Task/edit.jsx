import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function edit({ auth, task, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    name: task.name || '',
    description: task.description || '',
    img: '',
    status: task.status || '',
    due_date: task.due_date || '',
    priority: task.priority || '',
    assigned_user_id: task.assignedUser.id || '',
    project_id: task.project.id || '',
    _method: 'put'
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('task.update', task.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task "{task.name}"</h2>
      }
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              {task.image_path && (
                <div className="w-64 mb-4">
                  <img src={task.image_path} alt="Task Image" />
                </div>
              )}
              <div>
                <InputLabel htmlFor="task_img_path" value="Task Image" className="font-bold text-lg" />
                <TextInput
                  id="task_img_path"
                  name="img"
                  type="file"
                  onChange={e => setData('img', e.target.files[0])}
                  className="mt-2 block w-full"
                />
                <InputError message={errors.img} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" className="font-bold text-lg" />
                <TextInput
                  id="task_name"
                  name="name"
                  value={data.name}
                  type="text"
                  isFocused={true}
                  onChange={e => setData('name', e.target.value)}
                  className="mt-2 block w-full"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_description" value="Task Description" className="font-bold text-lg" />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  type="text"
                  onChange={e => setData('description', e.target.value)}
                  className="mt-2 block w-full"
                ></TextAreaInput>
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" className="font-bold text-lg" />
                <TextInput
                  id="task_due_date"
                  name="due_date"
                  value={data.due_date}
                  type="date"
                  onChange={e => setData('due_date', e.target.value)}
                  className="mt-2 block w-full"
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" className="font-bold text-lg" />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  type="date"
                  onChange={e => setData('status', e.target.value)}
                  className="mt-2 block w-full"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" className="font-bold text-lg" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  type="date"
                  onChange={e => setData('priority', e.target.value)}
                  className="mt-2 block w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_project_id" value="Belong To Project" className="font-bold text-lg" />
                <SelectInput
                  id="task_project_id"
                  name="project_id"
                  value={data.project_id}
                  onChange={e => setData('project_id', e.target.value)}
                  className="mt-2 block w-full"
                >
                  <option value="">Select Project</option>
                  {projects.data.map(project => (
                    <option value={project.id} key={project.id}>{project.name}</option>
                  ))}
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user_id" value="Assigned User" className="font-bold text-lg" />
                <SelectInput
                  id="task_assigned_user_id"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  onChange={e => setData('assigned_user_id', e.target.value)}
                  className="mt-2 block w-full"
                >
                  <option value="">Select User</option>
                  {users.data.map(user => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route('task.index')}
                  className="py-1 px-3 bg-gray-100 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>

                <button
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default edit;
