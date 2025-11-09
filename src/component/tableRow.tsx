export default function ContentTableRow({
                label,
                value,
            }: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <tr className="border-b last:border-b-0">
            <th className="w-36 sm:w-40 bg-gray-50 text-gray-700 px-3 py-2 text-left align-top">
                {label}
            </th>
            <td className="px-3 py-2 align-top">{value}</td>
        </tr>
    );
}