type Props = {
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
} & React.PropsWithChildren;

export function Pagination({ itemsPerPage, totalItems, totalPages }: Props) {
  return <div>Pagination</div>;
}
