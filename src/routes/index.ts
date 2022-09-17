import { Router } from 'express'
import echoRouter from './echo.route'
import sumRouter from './sum.route'
import tickerStreamRouter from './tickerStream.route'
import cryptocollapzRouter from './cryptocollapz.route'
import calendarDaysRouter from './calendarDays.route'
import rubiksRouter from './rubiks.route'
import travellingSuisseRobot from './travellingSuisseRobot.route'
import magicCauldron from './magicCauldrons.route'
import quordleKeyboard from './quordleKeyboard.route'

const router = Router()
router.use('/', echoRouter)
router.use('/', sumRouter)
router.use(tickerStreamRouter)
router.use(cryptocollapzRouter)
router.use(calendarDaysRouter)
router.use(rubiksRouter)
router.use(travellingSuisseRobot)
router.use(magicCauldron)
router.use(quordleKeyboard)

export default router
