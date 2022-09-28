import { Types } from 'mongoose'
import Person from '../models/Person'
import Service from '../models/Service'
import ServiceRole from '../models/ServiceRole'
import ServiceType from '../models/ServiceType'
import ServiceEventType from '../models/ServiceEventType'
import Song from '../models/Song'

// Called everytime a new user is created to populate the database with demo information
async function createData(userId: Types.ObjectId) {
  // Create people
  console.log('Creating persons...')
  const person1 = new Person({
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    userId
  })
  const person2 = new Person({
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'janedoe@example.com',
    userId
  })
  const person3 = new Person({
    first_name: 'Jeff',
    last_name: 'Doe',
    email: 'jeffdoe@example.com',
    userId
  })
  const person4 = new Person({
    first_name: 'Jasmine',
    last_name: 'Doe',
    email: 'jasminedoe@example.com',
    userId
  })
  const person5 = new Person({
    first_name: 'Jeremy',
    last_name: 'Doe',
    email: 'jeremydoe@example.com',
    userId
  })
  const person6 = new Person({
    first_name: 'Jerome',
    last_name: 'Doe',
    email: 'jeromedoe@example.com',
    userId
  })
  await person1.save()
  await person2.save()
  await person3.save()
  await person4.save()
  await person5.save()
  await person6.save()

  // Create songs
  console.log('creating songs...')
  const song1 = new Song({
    name: '10,000 Reasons',
    userId
  })
  const song2 = new Song({
    name: 'Amazing Grace (My Chains Are Gone)',
    page: 34,
    last_used: Date.now(),
    userId
  })
  const song3 = new Song({
    name: 'Oceans',
    userId
  })
  const song4 = new Song({
    name: 'Glorious Day (Living He Loved Me)',
    page: 432,
    userId
  })
  await song1.save()
  await song2.save()
  await song3.save()
  await song4.save()

  // Create service roles
  const role1 = new ServiceRole({
    role: 'Worship Leader',
  })
  const role2 = new ServiceRole({
    role: 'Guitarist',
  })
  const role3 = new ServiceRole({
    role: 'Pianist',
  })
  const role4 = new ServiceRole({
    role: 'Singer',
  })
  await role1.save()
  await role2.save()
  await role3.save()
  await role4.save()

  // Create service types
  const type1 = new ServiceType({
    type: 'Morning Service',
  })
  const type2 = new ServiceType({
    type: 'Evening Service',
  })
  const type3 = new ServiceType({
    type: 'Special Service',
  })
  await type1.save()
  await type2.save()
  await type3.save()

  // Create Service Event Types
  const eventType1 = new ServiceEventType({
    type: 'Welcome',
  })
  const eventType2 = new ServiceEventType({
    type: 'Song',
  })
  const eventType3 = new ServiceEventType({
    type: 'Closing',
  })
  await eventType1.save()
  await eventType2.save()
  await eventType3.save()

  // Create services
  console.log('creating services...')
  const service1 = new Service({
    date: Date.now(),
    theme: 'Service 1',
    type: type1._id,
    people: [
      {
        person: person6._id,
        role: role1._id
      }, {
        person: person2._id,
        role: role2._id
      }, {
        person: person3._id,
        role: role3._id
      }, {
        person: person4._id,
        role: role4._id
      }, {
        person: person5._id,
        role: role4._id
      },
    ],
    events: [
      {
        type: eventType1._id,
        order: 1
      },
      {
        type: eventType2._id,
        order: 2,
        song: song1._id
      },
      {
        type: eventType3._id,
        order: 3
      },
    ],
    userId
  })
  const service2 = new Service({
    date: Date.now(),
    theme: 'Service 2',
    type: type2._id,
    people: [
      {
        person: person6._id,
        role: role2._id
      }, {
        person: person2._id,
        role: role3._id
      }, {
        person: person3._id,
        role: role1._id
      }, {
        person: person4._id,
        role: role4._id
      }, {
        person: person5._id,
        role: role4._id
      },
    ],
    events: [
      {
        type: eventType1._id,
        order: 1
      },
      {
        type: eventType2._id,
        order: 2,
        song: song3._id
      },
      {
        type: eventType3._id,
        order: 3
      },
    ],
    userId
  })
  const service3 = new Service({
    date: Date.now(),
    theme: 'Service 3',
    type: type3._id,
    people: [
      {
        person: person6._id,
        role: role1._id
      }, {
        person: person2._id,
        role: role2._id
      }, {
        person: person3._id,
        role: role4._id
      }, {
        person: person4._id,
        role: role3._id
      }, {
        person: person5._id,
        role: role4._id
      },
    ],
    events: [
      {
        type: eventType2._id,
        order: 2,
        song: song1._id
      },
      {
        type: eventType3._id,
        order: 3
      },
      {
        type: eventType1._id,
        order: 1,
        song: song1._id
      },
    ],
    userId
  })
  await service1.save()
  await service2.save()
  await service3.save()

  // Finished
  console.log('Finished creating data.')
}

export default createData