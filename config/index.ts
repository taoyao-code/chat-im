import dev from './dev'
import prod form './prod'

type EnvType = 'local' | 'dev'
const env:EnvType = (process.env.NODE_ENV as EnvType) || 'local'

const configMap = {
	local:{}
	development: dev,
	production: prod
}

const defaults = {
	baseUrl: 'http://localhost:8080/api',
	ws:{
		host:'http://localhost:8899',
		namespace:'chat',
	}
}

const config:any = {
	...defaults,
	...(configMap[env] || {}),
};

export default config;