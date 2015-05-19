import b2ContactListener = Box2D.Dynamics.b2ContactListener
import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Body = Box2D.Dynamics.b2Body
import b2Fixture = Box2D.Dynamics.b2Fixture

class ContactListener extends b2ContactListener {
    BeginContact(contact:b2Contact):void {
        //trace("a collision started");
        var fixtureA:b2Fixture = contact.GetFixtureA();
        var fixtureB:b2Fixture = contact.GetFixtureB();
        var bodyA:b2Body = fixtureA.GetBody();
        var bodyB:b2Body = fixtureB.GetBody();
        //console.log("first body: " + bodyA.GetUserData())
        //console.log("second body: " + bodyB.GetUserData())
    }

    EndContact(contact:b2Contact):void {
        var fixtureA:b2Fixture = contact.GetFixtureA();
        var fixtureB:b2Fixture = contact.GetFixtureB();
        var bodyA:b2Body = fixtureA.GetBody();
        var bodyB:b2Body = fixtureB.GetBody();
    }
}

export = ContactListener