export { default} from 'next-auth/middleware';

export const config = {
    matcher: ['/laptops/add', '/profile', '/laptops/saved', '/messages']
}