import ContactListener = require('screen/world/ContactListener')
import UnitName = require('screen/world/units/types/UnitName')
import World = require('screen/world/World')
import Tank = require('screen/world/units/Tank')
import Bullet = require('screen/world/units/Bullet')
import Ball = require('screen/world/units/Ball')
import Bonus = require('screen/world/units/Bonus')
import BonusProcessor = require('screen/utils/BonusProcessor')

import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Fixture = Box2D.Dynamics.b2Fixture
import b2Body = Box2D.Dynamics.b2Body
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse
import b2Manifold = Box2D.Collision.b2Manifold

export function init(regBeginContact, regPreSolve, regPostSolve) {

    //BEGIN CONTACT

    regBeginContact(UnitName.TANK, UnitName.BONUS, (contact:b2Contact, tankFixture:b2Fixture, bonusFixture:b2Fixture) => {
        var tank:Tank = tankFixture.GetBody().GetUserData()
        var bonus:Bonus = bonusFixture.GetBody().GetUserData()
        BonusProcessor.applyBonusToTank(tank, bonus)
    })

    regBeginContact(UnitName.BULLET, UnitName.TANK, (contact:b2Contact, bulletFixture:b2Fixture, tankFixture:b2Fixture) => {
        console.log('UnitName.BULLET, UnitName.TANK')
        var bullet:Bullet = bulletFixture.GetBody().GetUserData()
        var tank:Tank = tankFixture.GetBody().GetUserData()
        if (bullet.parentTank != tank) {//todo не нужно
            tank.addDamage(bullet.damage, tankFixture)
            bulletFixture.GetBody().GetUserData().removed = true
        }
    })

    //ignore this contact
    regBeginContact(UnitName.BULLET, UnitName.BONUS, (contact:b2Contact, bulletFixture:b2Fixture, anyFixture:b2Fixture) => {
    })

    regBeginContact(UnitName.BULLET, (contact:b2Contact, bulletFixture:b2Fixture, anyFixture:b2Fixture) => {
        console.log('UnitName.BULLET')
        bulletFixture.GetBody().GetUserData().removed = true
        //if is contact of two bullets
        if (anyFixture.GetBody().GetUserData().name == UnitName.BULLET) {
            anyFixture.GetBody().GetUserData().removed = true
        }
    })

    //PRE SOLVE
    //todo не нужно
    regPreSolve(UnitName.BULLET, UnitName.TANK, (contact:b2Contact, oldManifold:b2Manifold, bulletFixture:b2Fixture, tankFixture:b2Fixture) => {
        var bullet:Bullet = bulletFixture.GetBody().GetUserData()
        var tank:Tank = tankFixture.GetBody().GetUserData()
        if (bullet.parentTank == tank) {
            contact.SetEnabled(false)
        }
    })

    //POST SOLVE
}

