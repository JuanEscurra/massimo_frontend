import users from 'assets/img/users.jpg';
import foods from 'assets/img/foods.jpg';
import orders from 'assets/img/orders.jpg';
import reports from 'assets/img/reports.jpg';


export default interface Option {
  title: string,
  description: string,
  link: string,
  image: string
}


export const options: Array<Option> = [
  {
    title: "Gestionar usuarios",
    description: "Sección para administrar a los usuarios del sistema.",
    link: "/admin/users",
    image: users
  },
  {
    title: "Gestionar productos",
    description: "Sección para registrar y consultar los productos.",
    link: "/admin/products",
    image: foods
  },
  {
    title: "Gestionar comanda",
    description: "Sección para registrar y consultar los pedidos del cliente.",
    link: "/admin/commands",
    image: orders
  },
  {
    title: "Generar Reporte",
    description: "Sección para emitir un informe de los ingresos según las fechas solicitadas.",
    link: "/admin/reports",
    image: reports
  }
]


