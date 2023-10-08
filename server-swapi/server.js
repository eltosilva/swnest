const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'swapi.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/people/:id', (req, res) => {
  router.db.find('1')

  res.jsonp({ test: 'ok' })
})


router.render = async (req, res) => {

  console.log('router')
  const { search } = req.query
  if (search) {
    const personagens = await res.locals.data.results.filter(personagem => personagem.name.toLowerCase().includes(search.toLowerCase()))
    const resposta = {
      "count": personagens.length,
      "next": "",
      "previous": null,
      "results": personagens
    }

    res.jsonp(resposta)
  } else
    res.jsonp(res.locals.data)

}

server.use(router)
server.listen(3003, () => {
  console.log('JSON Server is running')
})