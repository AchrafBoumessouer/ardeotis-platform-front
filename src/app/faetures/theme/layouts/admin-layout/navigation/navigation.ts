export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Statistiques',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/stats',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Consultants',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Missions',
    type: 'group',
    icon: 'icon-navigation',
    children: [
        {
        id: 'default',
        title: 'Missions',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/missions',
        icon: 'dashboard',
        breadcrumbs: false
      }
    
    ]
  },
  {
    id: 'authentication',
    title: 'Positionnement',
    type: 'group',
    icon: 'icon-navigation',
    children: [
        {
        id: 'default',
        title: 'Positionnement',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/positionnement',
        icon: 'dashboard',
        breadcrumbs: false
      }
    
    ]
  },
  

 
];
