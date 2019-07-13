var http = require('http')
var fs = require('fs')
var template= require('art-template')
var url = require('url')

var comments = [
  {
    name:'zhang1',
    message:'very good',
    dateTime:'2019-7-13'
  },
  {
    name:'zhang2',
    message:'very good',
    dateTime:'2019-7-13'
  },
  {
    name:'zhang3',
    message:'very good',
    dateTime:'2019-7-13'
  },
  {
    name:'zhang4',
    message:'very good',
    dateTime:'2019-7-13'
  },
  {
    name:'zhang5',
    message:'very good',
    dateTime:'2019-7-13'
  }
]


http
  .createServer(function(req,res){
    // var url = req.url
    // 为了可以获取到 pathname 中？后面的字段
    // 使用 url 模块的 url.parse 方法将路径解析成一个方便操作的对象
    // 第二个参数是为了将 parseObj 里面的 query （查询字符串） 转为一个对象
    var parseObj = url.parse(req.url,true)
    var pathname = parseObj.pathname
    if(pathname === '/'){
      fs.readFile('./view/index.html',function(err,data){
        if(err){
          return res.end('404 Not Found.')
        }
        // res.end(data)
        // 处理comments部分
        var htmlSrc = template.render(data.toString(),{
          comments:comments
        })
        res.end(htmlSrc)
      })
    }else if(pathname === '/post'){
      fs.readFile('./view/post.html',function(err,data){
        if(err){
          return res.end('404 Not Found')
        }
        res.end(data)
      })
    }else if(pathname.indexOf('/public/') === 0){
      fs.readFile('.'+pathname,function(err,data){
        if(err){
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }else if(pathname === '/pinglun'){
      var comment = parseObj.query
      var date = new Date()
      comment.dateTime = date
      comments.unshift(comment)
      // 此时服务端已经将数据存储好了
      // 现在就是这么让页面重新刷新，请求 / 页面
      // 1.设置 statusCode 为302，使之重定向
      // 2.在响应头中通过设置 Location 告诉客户端往哪重定向
      // 如果客户端发现收到的服务端响应状态码是 302
      // 就会自动去响应头中去找 Location，然后对该地址发起新的请求
      // 这样客户端就会自动跳转
      res.statusCode = 302
      res.setHeader('Location','/')
      res.end()
    }
  })
  .listen(3001,function(){
    console.log('Server is running...')
  })