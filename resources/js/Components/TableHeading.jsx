import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

function TableHeading({ name = '', sortField = null, handleSortChange = () => {}, sortable = true }) {
  return (
    <th onClick={e => handleSortChange(sortField)}>
      {sortable ? (
        <div className="px-3 py-3 flex items-center gap-1 cursor-pointer">
          {name}
          <ArrowsUpDownIcon className="w-3" />
        </div>
      ) : <div className="px-3 py-3">{name}</div>}
    </th>
  );
}

export default TableHeading;