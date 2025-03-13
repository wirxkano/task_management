import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('user.store'));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New User</h2>
      }
    >
      <Head title="Create User" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <form onSubmit={handleSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="mt-4">
                  <InputLabel htmlFor="user_name" value="User Name" className="font-bold text-lg" />
                  <TextInput
                    id="user_name" 
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
                  <InputLabel htmlFor="user_email" value="Email" className="font-bold text-lg" />
                  <TextInput
                    id="user_email" 
                    name="email" 
                    value={data.email} 
                    type="email"
                    onChange={e => setData('email', e.target.value)}
                    className="mt-2 block w-full"
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_password" value="Password" className="font-bold text-lg" />
                  <TextInput
                    id="user_password" 
                    name="password" 
                    value={data.password} 
                    type="password"
                    onChange={e => setData('password', e.target.value)}
                    className="mt-2 block w-full"
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" className="font-bold text-lg" />
                  <TextInput
                    id="user_password_confirmation" 
                    name="password_confirmation" 
                    value={data.password_confirmation} 
                    type="password"
                    onChange={e => setData('password_confirmation', e.target.value)}
                    className="mt-2 block w-full"
                  />
                  <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 text-right">
                  <Link 
                    href={route('user.index')}
                    className="py-1 px-3 bg-gray-100 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                  >
                    Cancel
                  </Link>

                  <button
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                      Add New
                    </button>
                </div>
              </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default create;