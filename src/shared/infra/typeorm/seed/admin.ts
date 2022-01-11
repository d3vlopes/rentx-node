import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'

import creteConnection from '../index'

async function create() {
  const connection = await creteConnection('localhost')

  const id = uuid()
  const password = await hash('admin', 8)

  await connection.query(
    ` INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')
    `,
  )

  await connection.close
}

create().then(() => console.log('User admin created!'))
