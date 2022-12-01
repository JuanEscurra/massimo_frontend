export default interface Page<T = any> {
  content:          Array<T>;
  pageable:         Pageable;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  sort:             Sort;
  first:            boolean;
  number:           number;
  numberOfElements: number;
  size:             number;
  empty:            boolean;
}

export interface Pageable {
  sort:       Sort;
  pageNumber: number;
  pageSize:   number;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}