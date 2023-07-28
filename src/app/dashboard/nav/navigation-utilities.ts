
interface navOptionsInterface {
  text: string;
  href: string;
  icon: string;
}

export const navigationOptions: navOptionsInterface[] = [
  {
    text: "Epargne",
    href: "/dashboard/saving",
    icon: "payments",
  },
  // {
  //   text: "Historique des transactions",
  //   href: "/dashboard/transactions",
  //   icon: "history",
  // },
  {
    text: "Progression collective",
    href: "/dashboard/colective-progression",
    icon: "bar_chart_4_bars",
  },
  {
    text: "Apprendre",
    href: "/dashboard/learn",
    icon: "local_library",
  },
  {
    text: "Progression ",
    href: "/dashboard/colective-progression",
    icon: "bar_chart_4_bars",
  },
  {
    text: "Preferences",
    href: "/dashboard/settings",
    icon: "settings",
  },
];
