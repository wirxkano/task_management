import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function edit({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    name: project.name || '',
    description: project.description || '',
    img: '',
    status: project.status || '',
    due_date: project.due_date || '',
    _method: 'put'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('project.update', project.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Project "{project.name}"</h2>
      }
    >
      <Head title="Create Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <form onSubmit={handleSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                {project.image_path && (
                  <div className="w-64 mb-4">
                    <img src={project.image_path} alt="Project Image" />
                  </div>
                )}
                <div>
                  <InputLabel htmlFor="project_img_path" value="Project Image" className="font-bold text-lg" />
                  <TextInput
                    id="project_img_path" 
                    name="img" 
                    type="file"
                    onChange={e => setData('img', e.target.files[0])}
                    className="mt-2 block w-full"
                  />
                  <InputError message={errors.img} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="project_name" value="Project Name" className="font-bold text-lg" />
                  <TextInput
                    id="project_name" 
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
                  <InputLabel htmlFor="project_description" value="Project Description" className="font-bold text-lg" />
                  <TextAreaInput
                    id="project_description" 
                    name="description" 
                    value={data.description} 
                    type="text"
                    onChange={e => setData('description', e.target.value)}
                    className="mt-2 block w-full"
                  ></TextAreaInput>
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="project_due_date" value="Project Deadline" className="font-bold text-lg" />
                  <TextInput
                    id="project_due_date" 
                    name="due_date" 
                    value={data.due_date} 
                    type="date"
                    onChange={e => setData('due_date', e.target.value)}
                    className="mt-2 block w-full"
                  />
                  <InputError message={errors.due_date} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="project_status" value="Project Status" className="font-bold text-lg" />
                  <SelectInput
                    id="project_status" 
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

                <div className="mt-4 text-right">
                  <Link 
                    href={route('project.index')}
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
