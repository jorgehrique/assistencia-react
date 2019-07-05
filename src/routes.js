// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import OS from "views/OS/OS.jsx";
import TableList from "views/TableList/TableList.jsx";
//import TableList from "views/TableList/TableList.jsx";
//import TableList from "views/TableList/TableList.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/servicos",
    name: "Ordem de Serviços",
    icon: "content_paste",
    component: OS,
    layout: "/admin"
  },
  {
    path: "/caixa",
    name: "Caixa",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },

  {
    path: "/estoque",
    name: "Estoque",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/empresa",
    name: "Dados da Empresa",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
