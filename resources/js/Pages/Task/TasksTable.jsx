import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { Link, router } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';

function TasksTable({ tasks, queryParams = null, linkTo = 'task.index', successMsg, hiddenProjectName = false }) {
  if (!tasks || tasks.data.length === 0) {
    return (
      <div className="font-bold">Don't have any task!</div>
    )
  }

  queryParams = queryParams || {};

  const handleSearchChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    linkTo === 'task.index' ? router.get(route(linkTo), queryParams) : router.get(route(linkTo, tasks[0].project.id), queryParams);
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

    linkTo === 'task.index' ? router.get(route(linkTo), queryParams) : router.get(route(linkTo, tasks.data[0].project.id), queryParams);
  }

  const handleDeleteTask = (task) => {
    if (!window.confirm('Are you sure to delete this task?')) {
      return;
    }

    router.delete(route('task.destroy', task.id));
  }

  return (
    <>
      {successMsg && <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{successMsg}</div>}

      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-nowrap border-b">
              <TableHeading name="ID" sortField={'id'} handleSortChange={handleSortChange} />
              <TableHeading name="Image" sortable={false} />
              {!hiddenProjectName && (<th>Project Name</th>)}
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
              {!hiddenProjectName && (<th className="px-3 py-3"></th>)}
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
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
            </tr>
          </thead>

          <tbody>
            {tasks.data.map(task => (
              <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} alt="Task Image" style={{ width: '60px' }} />
                </td>
                {!hiddenProjectName && (<td className="px-3 py-2 font-bold">{task.project.name}</td>)}
                <td className="px-3 py-2 hover:text-blue-500 cursor-pointer">
                  <Link href={route('task.show', task.id)}>
                    {task.name}
                  </Link>
                </td>
                <td className="px-3 py-2">
                  <span className={
                    "px-2 py-1 rounded text-white text-nowrap " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }>
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2">{task.created_at}</td>
                <td className="px-3 py-2">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2">
                  <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={e => handleDeleteTask(task)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}

export default TasksTable;