module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3003
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'masterUbuntu@345',
        database: process.env.MYSQL_DB || 'nodedb',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3002,
        host: process.env.MYSQL_SRV_HOST || 'localhost',
    },
    cacheService: {
        port: process.env.MYSQL_SRV_PORT || 3004,
        host: process.env.MYSQL_SRV_HOST || 'localhost',
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-16285.c246.us-east-1-4.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 16285,
        password: process.env.REDIS_PASS || 'ndJsRds'
    }
}