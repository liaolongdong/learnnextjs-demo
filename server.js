const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        // 服务端路由覆盖特殊处理
        server.get('/p/:id', (req, res) => {
            console.log('params', req.params);
            // 实际跳转页面
            const actualPage = '/post'
            // 路由参数
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })

        // 所有请求都交由next处理
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        // 监听端口号
        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })