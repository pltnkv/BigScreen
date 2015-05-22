import ContactListener = require('screen/ContactListener')
import UnitName = require('screen/units/types/UnitName')
import World = require('screen/World')
import Tank = require('screen/units/Tank')
import Bullet = require('screen/units/Bullet')
import Ball = require('screen/units/Ball')

import b2Contact = Box2D.Dynamics.Contacts.b2Contact
import b2Fixture = Box2D.Dynamics.b2Fixture
import b2Body = Box2D.Dynamics.b2Body

export function init(regBeginContact) {
    regBeginContact(UnitName.BULLET, UnitName.TANK, (contact:b2Contact, bulletFixture:b2Fixture, tankFixture:b2Fixture) => {
        var bullet:Bullet = bulletFixture.GetBody().GetUserData()
        var tank:Tank = tankFixture.GetBody().GetUserData()
        if (bullet.parentTank != tank) {
            bulletFixture.GetBody().GetUserData().removed = true
            //todo нанести повреждение танку
        }
        return bullet.parentTank == tank
    })

    regBeginContact(UnitName.BULLET, UnitName.BALL, (contact:b2Contact, bulletFixture:b2Fixture, ballFixture:b2Fixture) => {
        console.log(bulletFixture.GetBody().GetUserData())
        bulletFixture.GetBody().GetUserData().removed = true
    })

    regBeginContact(UnitName.BULLET, (contact:b2Contact, bulletFixture:b2Fixture, anyFixture:b2Fixture) => {
        bulletFixture.GetBody().GetUserData().removed = true
    })
}

