export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Nghiệp vụ'
  },
  {
    name: "Cấp cứu",
    url: "/reception/reception-list",
    icon: "icon-puzzle" 
  },
  {
    title: true,
    name: 'Quản lí'
  },
  {
    name: 'Danh mục',
    icon: 'icon-notebook',
    url: 'icd-category/views',
    children: [
      {
        name: 'ICD',
        url: '/icd-category/views',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tiền căn',
        url: '/tien-can-category/views',
        icon: 'icon-puzzle'
      },
      {
        name: 'Xử trí',
        url: '/xu-tri-category/views',
        icon: 'icon-puzzle'
      },
      {
        name: "Lí do khám bệnh",
        url: "/reason-category/views",
        icon: "icon-puzzle" 
      },
      {
        name: "Các bộ phận",
        url: "/cac-bo-phan-category/views",
        icon: "icon-puzzle" 
      },
      {
        name: "Tổng quát",
        url: "/can-lam-sang-category/views",
        icon: "icon-puzzle" 
      }
    ]
  },
  {
    title: true,
    name: 'Hệ thống'
  },
  {
    name: 'Cài đặt',
    url: '/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  }
];
