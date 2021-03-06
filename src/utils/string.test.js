import { findUserHandle, replaceAt } from './string'

describe('String Utilities', () => {
  
  describe('findUserHandle()',() => {

    describe('fails correctly', () => {
      it('with less than 3 chars', () => {
        expect(findUserHandle('@')).toBeFalsy()
        expect(findUserHandle('@r')).toBeFalsy()
      })
      it('with more than 16 chars', () => {
        expect(findUserHandle('@sixteencharstrng')).toBeFalsy()
      })
      it('without initial @ symbol', () => {
        expect(findUserHandle('a@dude')).toBeFalsy()
      })
    })

    describe('succeeds correctly', () => {
      it('with more than 3 chars', () => {
        expect(findUserHandle('@dude')).toEqual('@dude')
      })
      it('with less than 16 chars', () => {
        expect(findUserHandle('@fifteencharstrg')).toEqual('@fifteencharstrg')
      })
      it('with initial @ symbol', () => {
        expect(findUserHandle('@dude')).toEqual('@dude')
      })
    })
  })

  describe('replaceAt()', () => {
    const tstStr = 'abc defg hijklmnop q rs tuvw xyz'
    const tstRep = 'foo'
    it('replaces the correct chunk of string', () => {
      expect(replaceAt(tstStr, tstRep, 0, 3 )).toEqual(`${tstRep} defg hijklmnop q rs tuvw xyz`)
      expect(replaceAt(tstStr, tstRep, 9, 18 )).toEqual(`abc defg ${tstRep} q rs tuvw xyz`)
      expect(replaceAt(tstStr, tstRep, 29, 32 )).toEqual(`abc defg hijklmnop q rs tuvw ${tstRep}`)
      expect(replaceAt(tstStr, tstRep, 18, 21 )).toEqual(`abc defg hijklmnop${tstRep}rs tuvw xyz`)
    })
  })
})
