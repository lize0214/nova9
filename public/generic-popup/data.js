/**
 * 彈窗內容配置數據 (與主站同步版本)
 */
const promoData = [
    {
        id: 'tab-worldcup',
        title: 'WORLD CUP 2026',
        icon: 'fa-solid fa-futbol',
        subtitle: 'VIP Exclusive — predict the champion get mystery credit!',
        type: 'worldcup',
        content: {
            kickoff: 'JUNE 12, 2026',
            countdownDate: '2026-06-12T00:00:00',
            teams: [
                { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', odds: '🏆 5 titles' },
                { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', odds: '🏆 4 titles' },
                { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png', odds: '🏆 4 titles' },
                { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', odds: '🏆 3 titles' },
                { name: 'France', flag: 'https://flagcdn.com/w40/fr.png', odds: '🏆 2 titles' },
                { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png', odds: '🏆 2 titles' },
                { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png', odds: '🏆 1 title' },
                { name: 'England', flag: 'https://flagcdn.com/w40/gb-eng.png', odds: '🏆 1 title' },
                { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png', odds: '🔥 Hot pick' },
                { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png', odds: '🔥 Hot pick' },
                { name: 'USA', flag: 'https://flagcdn.com/w40/us.png', odds: '🏠 Host nation' },
                { name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png', odds: '⚡ Dark horse' }
            ],
            howToEnter: [
                'Make sure you are a VIP member',
                'Click the Live Chat button below',
                'Tell our agent your chosen team — one pick per member, changeable before June 12'
            ]
        },
        action: {
            text: 'CONTACT LIVE CHAT TO PICK',
            icon: 'fa-solid fa-headset',
            onclick: 'openLiveChat'
        }
    },
    {
        id: 'tab-news',
        title: 'TELEGRAM GROUP',
        icon: 'fa-regular fa-newspaper',
        subtitle: '📢 Stay updated with latest SS9SG promotions and instant news.',
        type: 'slideshow',
        content: {
            images: [
                'https://xt30sf.b-cdn.net/media/722173af711a61ee19099.png',
                'https://xt30sf.b-cdn.net/media/7dea122f811a696d6debc.jpg',
                'https://xt30sf.b-cdn.net/media/f216d3ccea0a60e579c79.jpg'
            ]
        },
        action: {
            text: 'JOIN GROUP',
            icon: 'fa-regular fa-comment-dots',
            link: 'https://t.me/SS9SG_Official',
            target: '_blank'
        }
    },
    {
        id: 'tab-battle',
        title: 'HIGH ROLLER BATTLE',
        icon: 'fa-solid fa-trophy',
        subtitle: '🔥 Win huge bonuses and compete for the top ranking.',
        type: 'single-image',
        content: {
            image: 'https://cdn.nova9sg.net/promotion-1.jpg'
        },
        action: {
            text: 'VIEW BATTLE PAGE',
            icon: 'fa-solid fa-calendar-check',
            link: 'https://main.ss9vip.net/leaderboard'
        }
    },
    {
        id: 'tab-rebate',
        title: 'EXCLUSIVE REBATE',
        icon: 'fa-solid fa-chart-line',
        subtitle: '💰 Earn rewards whether you win or lose.',
        type: 'single-image',
        content: {
            image: 'https://xt30sf.b-cdn.net/media/1421cfceea0a6cdfaf81c.jpg'
        },
        action: {
            text: 'VIEW MORE BONUS',
            icon: 'fa-solid fa-calendar-check',
            link: '/promotion'
        }
    },
    {
        id: 'tab-Royal',
        title: 'VIP PROGRAM',
        icon: 'fa-solid fa-crown',
        subtitle: '👑 Unlock exclusive VIP rewards and premium benefits.',
        type: 'single-image',
        content: {
            image: 'https://xt30sf.b-cdn.net/media/92763dfeea0a6b6bf6b97.jpg'
        },
        action: {
            text: 'VIEW VIP REWARDS',
            icon: 'fa-solid fa-arrow-right',
            onclick: 'programPage',
            args: [3]
        }
    },
    {
        id: 'tab-egg',
        title: 'FREE SPIN BONUS',
        icon: 'fa-solid fa-bullseye',
        subtitle: '🎯 Deposit SGD 20 and get 1 ticket with guaranteed rewards.',
        type: 'single-image',
        content: {
            image: 'https://xt30sf.b-cdn.net/media/1d51103fea0a626ca44b9.jpg'
        },
        action: {
            text: 'PLAY NOW',
            icon: 'fa-solid fa-arrow-right',
            onclick: 'programPage',
            args: [7]
        }
    },
    {
        id: 'tab-linkbackup',
        title: 'OFFICIAL BACKUP LINK',
        icon: 'fa-solid fa-link',
        subtitle: '📌 Bookmark these SS9SG official domains for uninterrupted access.',
        type: 'links',
        content: {
            image: 'https://xt30sf.b-cdn.net/media/098c965fea0a6b83f0339.jpg',
            links: [
                { text: 'ss9sg.com', url: 'https://ss9sg.com/' },
                { text: 'ss9sg.net', url: 'https://ss9sg.net/' },
                { text: 'ss9sg.club', url: 'https://ss9sg.club/' },
                { text: 'ss9sg.vip', url: 'https://ss9sg.vip/' }
            ]
        },
        action: {
            text: 'ADD TO BOOKMARKS',
            icon: 'fa-solid fa-bookmark',
            onclick: 'bkLnk'
        }
    },
    {
        id: 'tab-app',
        title: 'DOWNLOAD APP',
        icon: 'fa-solid fa-download',
        subtitle: '📱 Download SS9SG app for faster access and exclusive rewards.',
        type: 'single-image',
        content: {
            image: 'https://xt30sf.b-cdn.net/media/43b96bafea0a67e2d97a8.jpg'
        },
        action: {
            text: 'DOWNLOAD NOW',
            icons: ['fa-brands fa-android', 'fa-brands fa-apple'],
            link: 'https://dn.nova9sg.me',
            target: '_blank'
        }
    }
];
