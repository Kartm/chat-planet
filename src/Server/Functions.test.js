const { createUserWithLocation, isNameInUse } = require('./Functions')

test('creates user with correct name', () => {
    let name = 'testUser'
    let socket = { request: { connection: { remoteAddress: '75.61.211.123' } } }
    return createUserWithLocation({ name, socket }).then(user => {
        expect(user.name).toBe(name)
    })
})

test('creates user with correct country code', () => {
    let name = 'testUser'
    let socket = { request: { connection: { remoteAddress: '75.61.211.123' } } }
    return createUserWithLocation({ name, socket }).then(user => {
        expect(user.countryCode).toBe('US')
    })
})

test('creates user with correct latitude', () => {
    let name = 'testUser'
    let socket = { request: { connection: { remoteAddress: '75.61.211.123' } } }
    return createUserWithLocation({ name, socket }).then(user => {
        expect(user.latitude).toBe(33.02)
    })
})

test('creates user with correct longitude', () => {
    let name = 'testUser'
    let socket = { request: { connection: { remoteAddress: '75.61.211.123' } } }
    return createUserWithLocation({ name, socket }).then(user => {
        expect(user.longitude).toBe(-96.7419)
    })
})

test('is name in use', () => {
    let name = '123'
    let users = { randomid: { name: '123' } }
    expect(isNameInUse({ name, users })).toBe(true)
})
