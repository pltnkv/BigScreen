import ContactListener = require('screen/ContactListener')
import UnitName = require('screen/units/types/UnitName')
import World = require('screen/World')
import Tank = require('screen/units/Tank')
import Bullet = require('screen/units/Bullet')
import Ball = require('screen/units/Ball')

import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Fixture = Box2D.Dynamics.b2Fixture
import b2Body = Box2D.Dynamics.b2Body
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse
import b2Manifold = Box2D.Collision.b2Manifold

export function init(regBeginContact, regPreSolve, regPostSolve) {

    //BEGIN CONTACT

    regBeginContact(UnitName.BULLET, UnitName.TANK, (contact:b2Contact, bulletFixture:b2Fixture, tankFixture:b2Fixture) => {
        console.log('UnitName.BULLET, UnitName.TANK')
        var bullet:Bullet = bulletFixture.GetBody().GetUserData()
        var tank:Tank = tankFixture.GetBody().GetUserData()
        if (bullet.parentTank != tank) {//todo не нужно
            console.log('bullet.parentTank != tank')
            bulletFixture.GetBody().GetUserData().removed = true
            //todo нанести повреждение танку
        }
        //return bullet.parentTank != tank
    })

    regBeginContact(UnitName.BULLET, (contact:b2Contact, bulletFixture:b2Fixture, anyFixture:b2Fixture) => {
        console.log('UnitName.BULLET')
        bulletFixture.GetBody().GetUserData().removed = true
    })

    //PRE SOLVE
    //todo не нужно
    regPostSolve(UnitName.BULLET, UnitName.TANK, (contact:b2Contact, oldManifold:b2Manifold, bulletFixture:b2Fixture, tankFixture:b2Fixture) => {
        var bullet:Bullet = bulletFixture.GetBody().GetUserData()
        var tank:Tank = tankFixture.GetBody().GetUserData()
        console.log('1')
        if (bullet.parentTank == tank) {
            console.log('2')
            contact.SetEnabled(false)
        }
    })

    //POST SOLVE
}

