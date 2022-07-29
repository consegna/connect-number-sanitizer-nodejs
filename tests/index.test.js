const index = require('../src/index');
const fs = require('fs')

test('Run Main Handler Good Input No Country', async () => {
    let eventFile = fs.readFileSync('./events/good_no_country_event.json')
    let event = JSON.parse(eventFile)
    let response = await index.handler(event, null)
    expect(response.message).toEqual("SUCCESS")
    expect(response.sanitized_number).toEqual("0800467046")
    expect(response.phone_number).toEqual("+64800467046")
})

test('Run Main Handler Good Input NZ', async () => {
    let eventFile = fs.readFileSync('./events/good_nz_event.json')
    let event = JSON.parse(eventFile)
    let response = await index.handler(event, null)
    expect(response.message).toEqual("SUCCESS")
    expect(response.sanitized_number).toEqual("0800467046")
    expect(response.phone_number).toEqual("+64800467046")
})

test('Run Main Handler Good Input Australia', async () => {
    let eventFile = fs.readFileSync('./events/good_australia_event.json')
    let event = JSON.parse(eventFile)
    let response = await index.handler(event, null)
    expect(response.message).toEqual("SUCCESS")
    expect(response.sanitized_number).toEqual("0386912908")
    expect(response.phone_number).toEqual("+61386912908")
})

test('Run Main Handler No Params', async () => {
    let eventFile = fs.readFileSync('./events/bad_no_params.json')
    let event = JSON.parse(eventFile)
    let response = await index.handler(event, null)
    expect(response.message).toEqual("INVALID")
})

test('Run Main Handler Invalid Number', async () => {
    let eventFile = fs.readFileSync('./events/bad_invalid_num_event.json')
    let event = JSON.parse(eventFile)
    let response = await index.handler(event, null)
    expect(response.message).toEqual("INVALID")
})