import { Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { asyncErrorWrapper } from '../utils/errors'
import { rubiksSolution } from '../solvers/rubiks'

const router = Router()

const rubiksCelebrate = {
  [Segments.BODY]: Joi.object({
    ops: Joi.string().required(),
    state: Joi.object({
      u: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
      l: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
      f: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
      r: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
      b: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
      d: Joi.array().items(
        Joi.array().items(
          Joi.number())
        ).required(),
    })
  }),
}

type stateObject = {
  u: number[][],
  l: number[][],
  f: number[][],
  r: number[][],
  b: number[][],
  d: number[][]
}

type rubiksBody = {
  ops: String
  state: stateObject
}

const rubiks = async (req: Request, res: Response) => {
  const { ops, state }: rubiksBody = req.body
  console.log(state)
  const { u, l, f, r, b, d }: stateObject = state
  const output = rubiksSolution(ops, u, l, f, r, b, d)
  return res.status(200).json({ output })
}

router.post(
  '/rubiks',
  celebrate(rubiksCelebrate),
  asyncErrorWrapper(rubiks)
)

export default router