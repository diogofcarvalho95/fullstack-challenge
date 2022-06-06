import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { router } from './routers.js'

const app = new Koa()

const options = {
  origin: '*'
}

app.use(cors(options));
app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods());
