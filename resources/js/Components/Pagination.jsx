import { Link } from '@inertiajs/react';

function Pagination({links}) {
  return (
    <nav className="mt-4 text-center">
      {links.map(link => (
        <Link 
        preserveScroll
        href={link.url || ""}
        key={link.label}
        className={
          "inline-block py-2 px-3 rounded-lg text-gray-500 text-xs " +
          (link.active ? "bg-blue-500 " : "") +
          (!link.url ? "!text-gray-200 cursor-not-allowed " : "hover:bg-blue-300")
        }
        dangerouslySetInnerHTML={{ __html: link.label }}></Link>
      ))}
    </nav>
  );
}

export default Pagination;
