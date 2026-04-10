import Link from "next/link";

interface WPTypeColumn {
  slug: string;
  label: string;
}

interface ComparisonRow {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  types: WPTypeColumn[];
  rows: ComparisonRow[];
}

export function ComparisonTable({ types, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 px-4 text-left font-semibold text-foreground" />
            {types.map((type) => (
              <th
                key={type.slug}
                className="py-3 px-4 text-left font-semibold text-foreground"
              >
                <Link href={`/waermepumpen/${type.slug}`} className="hover:text-primary transition-colors">
                  {type.label}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr
              key={row.label}
              className="transition-colors hover:bg-primary-50/50"
            >
              <td className="py-3 px-4 font-medium text-foreground">{row.label}</td>
              {row.values.map((val, j) => (
                <td key={j} className="py-3 px-4 text-muted-foreground">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
