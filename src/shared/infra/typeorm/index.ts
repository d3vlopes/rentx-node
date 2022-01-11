import { createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
  host: string
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions

  newOptions.host = 'localhost'

  createConnection({
    ...options,
  })
})

export default async (host = 'localhost') => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    }),
  )
}
