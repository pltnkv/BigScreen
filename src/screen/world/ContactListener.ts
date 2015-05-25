import UnitName = require('screen/world/units/types/UnitName')
import Contacts = require('screen/world/Contacts')

import b2ContactListener = Box2D.Dynamics.b2ContactListener
import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Body = Box2D.Dynamics.b2Body
import b2Fixture = Box2D.Dynamics.b2Fixture
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse
import b2Manifold = Box2D.Collision.b2Manifold

var beginContactsMap = {}
var postSolveMap = {}
var preSolveMap = {}

interface IContactInfo {
    nameA:UnitName
    nameB:UnitName
    handler:(contact:b2Contact, fixtureA:b2Fixture, fixtureB:b2Fixture) => any//true == continuePropagation (ignore contact handler)
}

function regBeginContact(...args):void {
    addToMap(beginContactsMap, args)
}

function regPreSolve(...args):void {
    addToMap(preSolveMap, args)
}

function regPostSolve(...args):void {
    addToMap(postSolveMap, args)
}

function addToMap(map, args) {
    if (typeof args[1] === 'number') {
        map[args[0] + '-' + args[1]] = {
            nameA: args[0],
            nameB: args[1],
            handler: args[2]
        }
    } else {
        map[args[0] + '-'] = {
            nameA: args[0],
            handler: args[1]
        }
    }
}

Contacts.init(regBeginContact, regPreSolve, regPostSolve)


interface IRes {
    fixtureA:b2Fixture
    fixtureB:b2Fixture
    handler:(...args) => void
}

/**
 * сначала обрабатываем парные контакты, а затем одиночные, но только если до этого не был найден парный контакт с искомым объектом
 * или был найден, но проигнорем (вернул true для continuePropagation)
 * по дефолту continuePropagation = false
 */
function processCollision(map, contact:b2Contact, callback:(IRes) => boolean):void {
    var res = find2(map, contact)
    if (res) {
        var continuePropagation = callback(res)
        if (continuePropagation) {
            res = find1(map, contact)
            if (res) {
                callback(res)
            }
        }
    } else {
        res = find1(map, contact)
        if (res) {
            callback(res)
        }
    }
}

function find2(map, contact:b2Contact):IRes {
    var ci:IContactInfo
    //можно ускорить вдвое, увеличив расход памяти на две мапы, где во второй будет содержаться
    if (ci = map[contact.GetFixtureA().GetBody().GetUserData().name + '-' + contact.GetFixtureB().GetBody().GetUserData().name]) {
        return {handler: ci.handler, fixtureA: contact.GetFixtureA(), fixtureB: contact.GetFixtureB()}
    } else if (ci = map[contact.GetFixtureB().GetBody().GetUserData().name + '-' + contact.GetFixtureA().GetBody().GetUserData().name]) {
        return {handler: ci.handler, fixtureA: contact.GetFixtureB(), fixtureB: contact.GetFixtureA()}
    }
    return null
}

function find1(map, contact:b2Contact):IRes {
    var ci:IContactInfo
    if (ci = map[contact.GetFixtureA().GetBody().GetUserData().name + '-']) {
        return {handler: ci.handler, fixtureA: contact.GetFixtureA(), fixtureB: contact.GetFixtureB()}
    } else if (ci = map[contact.GetFixtureB().GetBody().GetUserData().name + '-']) {
        return {handler: ci.handler, fixtureA: contact.GetFixtureB(), fixtureB: contact.GetFixtureA()}
    }
    return null
}

export class ContactListener extends b2ContactListener {

    BeginContact(contact:b2Contact):void {
        processCollision(beginContactsMap, contact, (res) => {
            return res.handler(contact, res.fixtureA, res.fixtureB)
        })
    }

    PostSolve(contact:b2Contact, impulse:b2ContactImpulse):void {
        processCollision(postSolveMap, contact, (res) => {
            return res.handler(contact, impulse, res.fixtureA, res.fixtureB)
        })
    }

    PreSolve(contact:b2Contact, oldManifold:b2Manifold):void {
        processCollision(preSolveMap, contact, (res) => {
            return res.handler(contact, oldManifold, res.fixtureA, res.fixtureB)
        })
    }
}

export function get():ContactListener {
    return new ContactListener()
}