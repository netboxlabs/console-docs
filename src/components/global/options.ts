export const options = {
  header: {
    nav: {
      items: [
        {
          link: {
            title: 'Platform',
            url: '/#',
            target: '',
          },
          has_submenu: true,
          submenu: {
            submenu_layout: 'threeCol',
            three_column_submenu: {
              left_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'Products',
                      links: [
                        {
                          link: {
                            title: 'NetBox',
                            url: '/netbox/',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/triangle-icon-2.svg',
                            alt: 'Triangle Icon 2',
                            width: 23,
                            height: 23,
                          },
                          description: 'Make sense of your network.',
                        },
                        {
                          link: {
                            title: 'Discovery',
                            url: '/netbox-discovery/',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/triangle-icon-2.svg',
                            alt: 'Triangle Icon 2',
                            width: 23,
                            height: 23,
                          },
                          description: 'Accelerate documentation.',
                        },
                        {
                          link: {
                            title: 'Assurance',
                            url: '/#',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/triangle-icon-2.svg',
                            alt: 'Triangle Icon 2',
                            width: 23,
                            height: 23,
                          },
                          description: 'Eliminate operational drift.',
                        },
                      ],
                    },
                  },
                ],
              },
              middle_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'Deployment Options',
                      links: [
                        {
                          link: {
                            title: 'Cloud',
                            url: '/netbox-cloud',
                            target: '',
                          },
                          icon: false,
                          description: 'A fully-hosted SaaS edition of NetBox.',
                        },
                        {
                          link: {
                            title: 'Enterprise',
                            url: '/netbox-enterprise/',
                            target: '',
                          },
                          icon: false,
                          description: 'The power of NetBox in your own infra.',
                        },
                        {
                          link: {
                            title: 'Community',
                            url: '/netbox-community/',
                            target: '',
                          },
                          icon: false,
                          description: 'The open source version of NetBox.',
                        },
                      ],
                    },
                  },
                ],
              },
              right_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'card_cta',
                    card_cta: {
                      link: {
                        title: 'Nitro AI',
                        url: '/nitro-ai/',
                        target: '',
                      },
                      asset: {
                        type: 'image',
                        image: {
                          url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/nav-nitro-ai.png',
                          alt: 'Nav Nitro Ai',
                          width: 900,
                          height: 657,
                        },
                        animation: {
                          rive_file: false,
                          aspect_ratio: '',
                        },
                      },
                    },
                  },
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: '',
                      links: [
                        {
                          link: {
                            title: 'Integrations',
                            url: '/integrations/',
                            target: '',
                          },
                          icon: false,
                          description: '',
                        },
                        {
                          link: {
                            title: 'Plugins',
                            url: '/plugins/',
                            target: '',
                          },
                          icon: false,
                          description: '',
                        },
                        {
                          link: {
                            title: 'Security',
                            url: '/security',
                            target: '',
                          },
                          icon: false,
                          description: '',
                        },
                        {
                          link: {
                            title: 'Docs',
                            url: '/#',
                            target: '_blank',
                          },
                          icon: false,
                          description: '',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
        {
          link: {
            title: 'Solutions',
            url: '/#',
            target: '',
          },
          has_submenu: true,
          submenu: {
            submenu_layout: 'threeCol',
            three_column_submenu: {
              left_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'We help with',
                      links: [
                        {
                          link: {
                            title: 'Operations',
                            url: '/operations/',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/triangle-icon-2.svg',
                            alt: 'Triangle Icon 2',
                            width: 23,
                            height: 23,
                          },
                          description: 'Organize and model your network.',
                        },
                        {
                          link: {
                            title: 'Automation',
                            url: 'https://netboxlabs.bytogether.agency/automation/',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/traingle-icon-purple.svg',
                            alt: 'Traingle Icon Purple',
                            width: 23,
                            height: 23,
                          },
                          description: 'Automate IPAM and DCIM with a NSoT.',
                        },
                        {
                          link: {
                            title: 'Observability',
                            url: '/#',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/traingle-icon-blue.svg',
                            alt: 'Traingle Icon Blue',
                            width: 23,
                            height: 23,
                          },
                          description: 'Keep track of network performance.',
                        },
                        {
                          link: {
                            title: 'Security',
                            url: '/security',
                            target: '',
                          },
                          icon: {
                            url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/traingle-icon-orange.svg',
                            alt: 'Traingle Icon Orange',
                            width: 23,
                            height: 23,
                          },
                          description: 'Identify and address vulnerabilities.',
                        },
                      ],
                    },
                  },
                ],
              },
              middle_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'What’s your infrastructure?',
                      links: [
                        {
                          link: {
                            title: 'Data Center Infrastructure',
                            url: '/data-centre/',
                            target: '',
                          },
                          icon: false,
                          description: 'Manage and automate data center networks.',
                        },
                        {
                          link: {
                            title: 'Campus Networks',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Get visibility into campus environments.',
                        },
                        {
                          link: {
                            title: 'Branch Networks',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Simplify branch network operations.',
                        },
                        {
                          link: {
                            title: 'ISP & Telco Networks',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Optimize service provider networks.',
                        },
                        {
                          link: {
                            title: 'Hybrid Cloud Infrastructure',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Unify hybrid cloud environments.',
                        },
                        {
                          link: {
                            title: 'OT Infrastructure',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Monitor and secure operational technology.',
                        },
                      ],
                    },
                  },
                ],
              },
              right_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'featured_resource',
                    featured_resource: {
                      subheading: 'Featured',
                      resource: {
                        ID: 177,
                        post_title: 'Event-Driven Network Automation with NetBox and Ansible Automation Platform',
                        post_type: 'post',
                        permalink: '/blog/event-driven-network-automation-with-netbox-and-ansible-automation-platform-2/',
                        featured_image: {
                          src: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2024/05/Resource-Thumbnail.png',
                          width: 760,
                          height: 460,
                        },
                        post_date_gmt: '4th Mar 2025',
                        read_time: 1,
                        author: {
                          name: 'Together Developers',
                          acf: {
                            name: 'Together',
                            job_role: 'Web Developer',
                            avatar: {
                              url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/03/together-avatar.png',
                              alt: 'Together Avatar',
                              width: 84,
                              height: 84,
                            },
                          },
                        },
                        categories: [
                          {
                            id: 1,
                            name: 'Uncategorized',
                            slug: 'uncategorized',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        {
          link: {
            title: 'Resources',
            url: '/#',
            target: '',
          },
          has_submenu: true,
          submenu: {
            submenu_layout: 'threeCol',
            three_column_submenu: {
              left_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'Resources',
                      links: [
                        {
                          link: {
                            title: 'Blog',
                            url: '/blog/',
                            target: '',
                          },
                          icon: false,
                          description: 'Description here',
                        },
                        {
                          link: {
                            title: 'eBooks',
                            url: '/ebooks/',
                            target: '',
                          },
                          icon: false,
                          description: 'Description here',
                        },
                        {
                          link: {
                            title: 'Events & Webinars',
                            url: '/events/',
                            target: '',
                          },
                          icon: false,
                          description: 'Description here',
                        },
                        {
                          link: {
                            title: 'Podcasts',
                            url: '/podcasts/',
                            target: '',
                          },
                          icon: false,
                          description: 'Description here',
                        },
                        {
                          link: {
                            title: 'News',
                            url: '/news/',
                            target: '',
                          },
                          icon: false,
                          description: 'Description here',
                        },
                        {
                          link: {
                            title: 'Customer Stories',
                            url: '/customer-stories/',
                            target: '',
                          },
                          icon: false,
                          description: 'How customers succeed with NetBox.',
                        },
                      ],
                    },
                  },
                ],
              },
              middle_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: 'Learn',
                      links: [
                        {
                          link: {
                            title: 'Training',
                            url: '/netbox-training/',
                            target: '',
                          },
                          icon: false,
                          description: 'Learn and grow your NetBox skills.',
                        },
                        {
                          link: {
                            title: 'Tools to Champion NetBox',
                            url: '/#',
                            target: '',
                          },
                          icon: false,
                          description: 'Equip yourself to advocate for NetBox.',
                        },
                        {
                          link: {
                            title: 'Docs',
                            url: '/docs/netbox/'
                          },
                          icon: false,
                          description: 'Build and extend with developer resources.',
                        },
                      ],
                    },
                  },
                ],
              },
              right_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'featured_resource',
                    featured_resource: {
                      subheading: 'Featured',
                      resource: {
                        ID: 177,
                        post_title: 'Event-Driven Network Automation with NetBox and Ansible Automation Platform',
                        post_type: 'post',
                        permalink: '/blog/event-driven-network-automation-with-netbox-and-ansible-automation-platform-2/',
                        featured_image: {
                          src: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2024/05/Resource-Thumbnail.png',
                          width: 760,
                          height: 460,
                        },
                        post_date_gmt: '4th Mar 2025',
                        read_time: 1,
                        author: {
                          name: 'Together Developers',
                          acf: {
                            name: 'Together',
                            job_role: 'Web Developer',
                            avatar: {
                              url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/03/together-avatar.png',
                              alt: 'Together Avatar',
                              width: 84,
                              height: 84,
                            },
                          },
                        },
                        categories: [
                          {
                            id: 1,
                            name: 'Uncategorized',
                            slug: 'uncategorized',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        {
          link: {
            title: 'Community',
            url: '/netbox-community/',
            target: '',
          },
          has_submenu: true,
          submenu: {
            submenu_layout: 'threeCol',
            three_column_submenu: {
              left_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'tile_cta',
                    tile_cta: {
                      link: {
                        title: 'The NetBox Community',
                        url: '/netbox-community/',
                        target: '',
                      },
                      asset: {
                        type: 'image',
                        image: {
                          url: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/netbox-community-nav.svg',
                          alt: 'Netbox Community Nav',
                          width: 348,
                          height: 219,
                        },
                        animation: {
                          rive_file: false,
                          aspect_ratio: '',
                        },
                      },
                      description: 'Connect and collaborate with NetBox users.',
                    },
                  },
                ],
              },
              middle_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'link_list',
                    link_list: {
                      subheading: '',
                      links: [
                        {
                          link: {
                            title: 'Community Slack',
                            url: 'https://netdev.chat/',
                            target: '_blank',
                          },
                          icon: false,
                          description: '',
                        },
                        {
                          link: {
                            title: 'NetBox on GitHub',
                            url: 'https://github.com/netboxlabs',
                            target: '_blank',
                          },
                          icon: false,
                          description: '',
                        },
                      ],
                    },
                  },
                ],
              },
              right_column: {
                submenu_modules: [
                  {
                    acf_fc_layout: 'featured_resource',
                    featured_resource: {
                      subheading: 'Featured',
                      resource: {
                        ID: 341,
                        post_title: 'FOSDEM 2025',
                        post_type: 'event',
                        permalink: '/events/fosdem-2025/',
                        featured_image: {
                          src: 'https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/03/event-thumbnail.jpg',
                          width: 760,
                          height: 460,
                        },
                        acf: {
                          event_details: {
                            type: 'Webinar',
                            location: 'London',
                            dates: [
                              {
                                date: '05/01/2025',
                                time: '5 PM',
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        {
          link: {
            title: 'Pricing',
            url: '/pricing/',
            target: '',
          },
          has_submenu: false,
          submenu: {
            submenu_layout: false,
            three_column_submenu: {
              left_column: {
                submenu_modules: false,
              },
              middle_column: {
                submenu_modules: false,
              },
              right_column: {
                submenu_modules: false,
              },
            },
          },
        },
        {
          link: {
            title: 'Docs',
            url: '/#',
            target: '',
          },
          has_submenu: false,
          submenu: {
            submenu_layout: false,
            three_column_submenu: {
              left_column: {
                submenu_modules: false,
              },
              middle_column: {
                submenu_modules: false,
              },
              right_column: {
                submenu_modules: false,
              },
            },
          },
        },
      ],
    },
    ctas: {
        "primary_cta": {
          "title": "Start for free",
          "url": "/#",
          "target": ""
        },
        "secondary_cta": {
          "title": "Get a demo",
          "url": "/get-a-demo/",
          "target": ""
        }
      }
  },
  announcement_banner: {
    "icon": {
      "url": "https://netboxlabs.wpenginepowered.com/wp-content/uploads/2025/04/announcement-cube-icon.svg",
      "alt": "Announcement Cube Icon",
      "width": 24,
      "height": 24
    },
    "link": {
      "title": "Blog or learning piece, maybe some news |here|",
      "url": "/#",
      "target": ""
    },
    "homepage_only": true
  }
};
