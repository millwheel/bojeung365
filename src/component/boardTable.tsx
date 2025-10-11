export type Column<T> = {
    header: string;
    thClassName?: string;
    tdClassName?: string;
    key?: keyof T;
    render?: (row: T) => React.ReactNode;
};

type PostTableProps<T> = {
    rows: T[];
    columns: Column<T>[];
    rowKey: (row: T) => React.Key;
    cellClass: string;
};

export default function BoardTable<T>({
                                         rows,
                                         columns,
                                         rowKey,
                                         cellClass,
                                     }: PostTableProps<T>) {
    return (
        <div className="overflow-x-auto border border-gray-300 bg-white">
            <table className="min-w-full text-sm">
                <thead>
                <tr className="bg-gray-100 text-gray-800 text-center border-b-2 border-gray-200">
                    {columns.map((c, i) => (
                        <th key={i} className={c.thClassName ?? "px-3 py-3"}>
                            {c.header}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {rows.map((row) => (
                    <tr
                        key={rowKey(row)}
                        className="border-t border-gray-200 hover:bg-gray-200 transition-colors"
                    >
                        {columns.map((c, i) => (
                            <td
                                key={i}
                                className={[cellClass, c.tdClassName].filter(Boolean).join(" ")}
                            >
                                {c.render
                                    ? c.render(row)
                                    : c.key
                                        ? (row[c.key] as React.ReactNode)
                                        : null}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}