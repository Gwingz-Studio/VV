import { defineEventHandler } from 'h3'
import { SUMMIT_PROCEEDINGS } from '../../../data/motions'

export default defineEventHandler(() => {
  return SUMMIT_PROCEEDINGS
})
