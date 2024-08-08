interface Props {
  title?: string
  description?: string
  author?: string
  image?: string
  keyword?: string
  asPath?: string
}

const Meta = ({
  title = 'Hive',
  description = `Build your product fast`,
  image = '',
  author = 'Hive',
  keyword = '',
}: Props) => {

  return {
    // viewport: {
    //   width: 'device-width',
    //   initialScale: 1,
    //   maximumScale: 1,
    // },
    title: title ? title : title,
    description: description ? description : description,
    image: '',

    metadataBase: new URL('https://hive.paralect.com'),
    alternates: {
      // canonical: url,
      languages: {
        'en-US': '/en-US',
      },
    },
    openGraph: {
      type: 'website',
      images: '',
      title: title ? title : title,
      description: description ? description : description,
    },
    keywords: [
      `Sales, Outreach, Phones`,
    ],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    twitter: {
      card: 'summary_large_image',
      title: title ? title : title,
      description: description ? description : description,
      // siteId: '1467726470533754880',
      // creatorId: '1467726470533754880',
      creator: `@${author ? author : author}`,
      images: {
        url: image,
        alt: title ? title : title,
      },
      app: {
        name: 'twitter_app',
        id: {
          iphone: 'twitter_app://iphone',
          ipad: 'twitter_app://ipad',
          googleplay: 'twitter_app://googleplay',
        },
        url: {
          iphone: image,
          ipad: image,
        },
      },
    },
    appleWebApp: {
      title: title ? title : title,
      statusBarStyle: 'black-translucent',
      startupImage: [
        '/logo.png',
        {
          url: '/logo.png',
          media: '(device-width: 768px) and (device-height: 1024px)',
        },
      ],
    },
  }
}
export default Meta
