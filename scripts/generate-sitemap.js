import fs from 'fs';
import { create } from 'xmlbuilder';
import { blogPosts } from '../src/data/blogPosts.js';

const BASE_URL = 'https://boltstudio.ai';

const routes = [
    '/',
    '/work',
    '/work/menu-photography',
    '/work/fashion-campaigns',
    '/work/ecommerce-products',
    '/blog',
    '/privacy',
    '/terms'
];

const generateSitemap = () => {
    const urlset = create('urlset', { version: '1.0', encoding: 'UTF-8' })
        .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    // Add static routes
    routes.forEach(route => {
        urlset.ele('url')
            .ele('loc', `${BASE_URL}${route}`).up()
            .ele('changefreq', 'weekly').up()
            .ele('priority', route === '/' ? '1.0' : '0.8').up();
    });

    // Add blog posts
    blogPosts.forEach(post => {
        urlset.ele('url')
            .ele('loc', `${BASE_URL}/blog/${post.id}`).up()
            .ele('lastmod', post.date).up()
            .ele('changefreq', 'monthly').up()
            .ele('priority', '0.7').up();
    });

    const xml = urlset.end({ pretty: true });

    fs.writeFileSync('./public/sitemap.xml', xml);
    console.log('Sitemap generated successfully at ./public/sitemap.xml');
};

generateSitemap();
