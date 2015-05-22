import UnitName = require('screen/units/types/UnitName')
import Contacts = require('screen/Contacts')

import b2ContactListener = Box2D.Dynamics.b2ContactListener
import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Body = Box2D.Dynamics.b2Body
import b2Fixture = Box2D.Dynamics.b2Fixture

var beginContactsMap = {}

interface IContactInfo {
    nameA:UnitName
    nameB:UnitName
    handler:(contact:b2Contact, fixtureA:b2Fixture, fixtureB:b2Fixture) => any//true == ignore contact handler
}

function regBeginContact(...args):void {
    if (typeof arguments[1] === 'number') {
        beginContactsMap[arguments[0] + '-' + arguments[1]] = {
            nameA: arguments[0],
            nameB: arguments[1],
            handler: arguments[2]
        }
    } else {
        beginContactsMap[arguments[0] + '-'] = {
            nameA: arguments[0],
            handler: arguments[1]
        }
    }
}

Contacts.init(regBeginContact)

/**
 * сначала обрабатываем парные контакты, а затем одиночные, но только если до этого не был найден парный контакт с искомым объектом или был найден но проигнорем (вернул true)
 */
function processBeginContact(contact:b2Contact):void {
    var ci:IContactInfo
    //можно ускорить вдвое, увеличив расход памяти на две мапы, где во второй будет содержаться
    if (ci = beginContactsMap[contact.GetFixtureA().GetBody().GetUserData().name + '-' + contact.GetFixtureB().GetBody().GetUserData().name]) {
        if (!ci.handler(contact, contact.GetFixtureA(), contact.GetFixtureB())) {
            return undefined
        }
    } else if (ci = beginContactsMap[contact.GetFixtureB().GetBody().GetUserData().name + '-' + contact.GetFixtureA().GetBody().GetUserData().name]) {
        if (!ci.handler(contact, contact.GetFixtureB(), contact.GetFixtureA())) {
            return undefined
        }
    } else if (ci = beginContactsMap[contact.GetFixtureA().GetBody().GetUserData().name + '-']) {
        if (!ci.handler(contact, contact.GetFixtureA(), contact.GetFixtureB())) {
            return undefined
        }
    } else if (ci = beginContactsMap[contact.GetFixtureB().GetBody().GetUserData().name + '-']) {
        ci.handler(contact, contact.GetFixtureB(), contact.GetFixtureA())
    }
}

export class ContactListener extends b2ContactListener {

    BeginContact(contact:b2Contact):void {
        processBeginContact(contact)
    }

    EndContact(contact:b2Contact):void {
        var fixtureA:b2Fixture = contact.GetFixtureA();
        var fixtureB:b2Fixture = contact.GetFixtureB();
        var bodyA:b2Body = fixtureA.GetBody();
        var bodyB:b2Body = fixtureB.GetBody();
    }
}

export function get():ContactListener {
    return new ContactListener()
}