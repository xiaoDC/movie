express = require 'express'
port = process.env.PORT || 3000
app = express()

app.set 'views', './views/pages/'
app.set 'view engine', 'jade'
app.listen port

console.log "imooc started on port #{port}"

### index page ###
app.get "/", (req, res)->
    res.render "index", {
        title: '电影首页'
        movies: [{
            title: '机械战警'
            _id: 1
            poster: 'www.baidu.com'
        },{
            title: '机械战警2'
            _id: 2
            poster: 'www.baidu.com'

        }]
    }
    return

### index page ###
app.get "/", (req, res)->
    res.render "index", {
        title: '电影首页'
    }
    return

### list page ###
app.get "/list", (req, res)->
    res.render "list", {
        title: '电影首页'
    }
    return

### detail page ###
app.get "/detail", (req, res)->
    res.render "detail", {
        title: '电影首页'
    }
    return
