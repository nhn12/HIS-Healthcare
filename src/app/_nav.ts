export const navigation = [
  {
    name: 'Home',
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
  // {
  //   name: 'Components',
  //   url: '/components',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/components/buttons',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Social Buttons',
  //       url: '/components/social-buttons',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/components/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/components/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/components/modals',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/components/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/components/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/components/tabs',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  //  },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  {
    name: 'Tiếp nhận',
    url: '/reception',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Báo cáo',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Danh mục',
    url: '/category',
    icon: 'icon-layers',
    children: [
      {
        name: 'Bác sĩ',
        url: '/category/phong-kham-list',
        icon: 'icon-user'
      },
      {
        name: 'Phòng khám',
        url: '/category/phong-kham-list',
        icon: 'icon-book-open'
      },
      {
        name: 'Chuyên khoa',
        url: '/category/chuyen-khoa-list',
        icon: 'icon-grid'
      }
    ]
  },
  {
    name: 'Tổ chức',
    url: '/category',
    icon: 'icon-flag',
    children: [
      // {
      //   name: 'Quy hoạch giờ',
      //   url: '/schedule/blueprint-schedule-create',
      //   icon: 'icon-calendar'
      // },
      {
        name: 'Quy hoạch PK',
        url: '/schedule/blueprint-schedule-list',
        icon: 'icon-notebook'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Hệ thống',
  },
  {
    name: 'Cài đặt',
    url: '/pages',
    icon: 'icon-settings',
    // children: [
    //   {
    //     name: 'Login',
    //     url: '/pages/login',
    //     icon: 'icon-star'
    //   },
    //   {
    //     name: 'Register',
    //     url: '/pages/register',
    //     icon: 'icon-star'
    //   },
    //   {
    //     name: 'Error 404',
    //     url: '/pages/404',
    //     icon: 'icon-star'
    //   },
    //   {
    //     name: 'Error 500',
    //     url: '/pages/500',
    //     icon: 'icon-star'
    //   }
    // ]
  },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger'
  // }
];
