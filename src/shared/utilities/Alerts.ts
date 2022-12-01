import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  timer: 3500,
  showConfirmButton: false,
})

export const DeleteAlert = Swal.mixin({
  title: '¿Esta seguro de eliminar?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, estoy seguro'
})